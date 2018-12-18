'use strict';
import * as vscode from 'vscode';
import { SiteScriptEditorPanel } from './SiteScriptEditorPanel';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerCommand('site-script-editor.start', () => {
        SiteScriptEditorPanel.CreateOrShow(context.extensionPath);
    }));
}
