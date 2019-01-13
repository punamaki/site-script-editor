import * as path from 'path';
import * as vscode from 'vscode';
import * as glob from 'glob';
import Queue from 'queue';

export class SiteScriptEditorPanel {
    public static currentPanel: SiteScriptEditorPanel | undefined;

    private static readonly viewType: string = 'site-script-editor';
    private readonly updateCommand: string = 'site_scripts_update';
    private readonly syncCommand: string = 'site_scripts_sync';
    private readonly uiLoadedCommand: string = 'site_scripts_ui_loaded';

    private editorUpdateQueue: Queue;
    private readonly webViewPanel: vscode.WebviewPanel;
    private readonly extensionPath: string;
    private disposables: vscode.Disposable[] = [];
    private currentEditor: vscode.TextEditor | undefined;
    private previousEditor: vscode.TextEditor | undefined;

    public static CreateOrShow(extensionPath: string): void {
        // do not open preview when no document is currently open
        if (!vscode.window.activeTextEditor) {
            return;
        }

        // do not open preview when no document is not json document
        const filePath = vscode.window.activeTextEditor.document.fileName;
        if (path.extname(filePath) !== '.json') {
            return;
        }

        const column = vscode.ViewColumn.Three;
        if (SiteScriptEditorPanel.currentPanel) {
            SiteScriptEditorPanel.currentPanel.webViewPanel.reveal(column);
        } else {
            SiteScriptEditorPanel.currentPanel = new SiteScriptEditorPanel(extensionPath, column);
        }
    }

    private constructor(extensionPath: string, column: vscode.ViewColumn) {
        this.extensionPath = extensionPath;
        this.currentEditor = this.previousEditor = vscode.window.activeTextEditor;
        this.editorUpdateQueue = new Queue({
            autostart: true,
            concurrency: 1,
            timeout: 5000
        });

        this.editorUpdateQueue.start((err: any) => {
            if (err) {
                console.error(err);
                throw err;
            }
        });

        this.webViewPanel = vscode.window.createWebviewPanel(SiteScriptEditorPanel.viewType, 'Site Scripts Editor', column, {
            enableScripts: true,
            localResourceRoots: [
                vscode.Uri.file(path.join(this.extensionPath, 'web-view'))
            ]
        });
        this.webViewPanel.webview.html = this.getHtmlForWebview(this.extensionPath);

        this.webViewPanel.onDidDispose(() => this.dispose(), null, this.disposables);
        this.webViewPanel.onDidChangeViewState((e) => {

        });
        this.webViewPanel.webview.onDidReceiveMessage((message: any) => {
            if (!this.currentEditor) {
                return;
            }

            let update = async (cb: () => void, siteScript: any, currentEditor: vscode.TextEditor) => {

                let result = await currentEditor.edit(editBuilder => {
                    const range: vscode.Range = new vscode.Range(
                        currentEditor.document.positionAt(0),
                        currentEditor.document.positionAt(currentEditor.document.getText().length)
                    );

                    editBuilder.replace(range, siteScript);
                });

                // edit is not available, try in a few ms later
                if (!result) {
                    setTimeout(() => {
                        update(cb, siteScript, currentEditor);
                    }, 50);
                } else {
                    cb();
                }
            };

            switch (message.command) {
                case this.syncCommand:
                    this.editorUpdateQueue.push(((siteScript, currentEditor) => {
                        return (cb: () => void) => {
                            update(cb, siteScript, currentEditor);
                        };
                    })(message.siteScript, this.currentEditor));
                    break;
                case this.uiLoadedCommand:
                    this.updatePreview();
                    break;
            }
        });

        this.disposables.push(vscode.window.onDidChangeActiveTextEditor(() => this.onActiveEditorChanged()));
        this.disposables.push(vscode.workspace.onDidSaveTextDocument(() => this.onDocumentSaved()));
    }

    public dispose(): void {
        SiteScriptEditorPanel.currentPanel = undefined;

        this.webViewPanel.dispose();

        while (this.disposables.length) {
            const x = this.disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }

    private onActiveEditorChanged(): void {
        let isTabSwitchedFromPreview = vscode.window.activeTextEditor && !this.previousEditor;

        if (vscode.window.activeTextEditor && SiteScriptEditorPanel.currentPanel && !isTabSwitchedFromPreview) {
            this.currentEditor = vscode.window.activeTextEditor;
            this.updatePreview();
        }

        this.previousEditor = vscode.window.activeTextEditor;
    }

    private onDocumentSaved(): void {
        if (SiteScriptEditorPanel.currentPanel && vscode.window.activeTextEditor) {
            this.updatePreview();
        }
    }

    private updatePreview(): void {
        const json: string = this.getJson();

        if (!json) {
            return;
        }

        this.webViewPanel.webview.postMessage({ json: json, command: this.updateCommand });
    }

    private getJson(): string {
        let json: string = '';
        if (this.currentEditor) {
            json = this.currentEditor.document.getText();
        }
        return json;
    }

    private getHtmlForWebview(extensionPath: string): string {
        const mainJsFile = glob.sync(path.join(extensionPath, 'web-view', 'main.*.js'))[0];
        const mainScriptPathOnDisk = vscode.Uri.file(mainJsFile);
        const mainScriptUri = mainScriptPathOnDisk.with({ scheme: 'vscode-resource' });

        const mainCssFile = glob.sync(path.join(extensionPath, 'web-view', 'main.*.css'))[0];
        const cssPathOnDisk = vscode.Uri.file(mainCssFile);
        const cssUri = cssPathOnDisk.with({ scheme: 'vscode-resource' });

        return `
        <!DOCTYPE HTML>
        <html>
        <head>
            <!-- when using the mode "code", it's important to specify charset utf-8 -->
            <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
            <link href="${cssUri}" rel="stylesheet" type="text/css">
        </head>
            <body>
                <div id="root"></div>
                <script src="${mainScriptUri}"></script>
            </body>
        </html>
        `;
    }
}