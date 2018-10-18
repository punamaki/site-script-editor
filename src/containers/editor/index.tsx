import * as React from 'react';
import JsonEditorWrapper from '../../components/json-editor-wrapper';
import './editor.css';
import {SiteHierarchy} from '../../components/site-hierarchy';
import {IMessage, ISiteScriptContainer, ISiteScript, INodeTypeProps, IDictionary} from '../../types';
import * as actions from '../../actions';
import {connect} from 'react-redux';
import {convertJsonToSiteHierarchy, convertSiteHierarchyToJson} from '../../converters';
import {TreeItem} from 'react-sortable-tree';
import samples from '../../samples';
import { autobind } from '@uifabric/utilities';
import { collapseTree } from '../../helpers';


export interface IDispatchProps {
    removemessage : (id : string) => void;
    addmessage : (message : IMessage) => void;
    setSiteScriptContainer : (siteScriptContainer : ISiteScriptContainer) => void;
    setTreeData : (treeData : TreeItem[]) => void;
    setNodeTypeProps : (nodeType:string, nodeTypeProps:INodeTypeProps)=>void;
}

export interface IStateProps {
    messageList : IMessage[];
    currentSiteScriptContainer : ISiteScriptContainer;
    treeData : TreeItem[];
    nodeTypesProps: IDictionary<INodeTypeProps>;
}
export interface IEditorState {
    siteHierarchyKey:string;
}
export function mapStateToProps({messageList, currentSiteScriptContainer, treeData,nodeTypesProps} : IStateProps) {
    return {messageList, currentSiteScriptContainer, treeData,nodeTypesProps};
}
export function mapDispatchToProps(dispatch : any) : IDispatchProps {
    return {
        removemessage: (id : string) => {
            dispatch(actions.removemessage(id));
        },
        addmessage: (message : IMessage) => {
            dispatch(actions.addmessage(message));
        },
        setSiteScriptContainer: (siteScriptContainer : ISiteScriptContainer) => {
            dispatch(actions.setSiteScript(siteScriptContainer));
        },
        setTreeData: (treeData : TreeItem[]) => {
            dispatch(actions.setTreeData(treeData));
        },
        setNodeTypeProps: (nodeType:string, nodeTypeProps:INodeTypeProps)=>{
            dispatch(actions.setNodeTypeProps(nodeType, nodeTypeProps));
        }
    };
}

class Editor extends React.Component < IStateProps & IDispatchProps,
IEditorState > {
    constructor(props : IStateProps & IDispatchProps) {
        super(props);
        this.setSample("site-create-lists-add-to-site-nav");
        this.state = {siteHierarchyKey:"1000"};
    }
    private setSiteScript(siteScript : ISiteScript) {
        var currentContainer = this.props.currentSiteScriptContainer;
        currentContainer.siteScript = siteScript;
        this
            .props
            .setSiteScriptContainer(currentContainer);
            this
            .props
            .setTreeData(convertJsonToSiteHierarchy(currentContainer));
    }
    @autobind
    private setSample(key : string) {
        var sampleContainer = samples.find(sample => sample.id === key);
        if (sampleContainer) {
            this
                .props
                .setSiteScriptContainer(sampleContainer);
            this
                .props
                .setTreeData(collapseTree(convertJsonToSiteHierarchy(sampleContainer)));
        }
    }
 
    @autobind
    private setTreeAndScriptData(treeData:TreeItem[]) {
        this.props.setTreeData(treeData);
        this.props.setSiteScriptContainer(convertSiteHierarchyToJson(treeData));
          }
    @autobind
    private reloadTree() {
        this.setState({siteHierarchyKey:Math.floor((Math.random() * 1000000) + 1).toString()}) //This will refresh the site hierarchy by renewing the key. Otherwise some props are not recalculated
    }
    render() {
        return <div className="sd_editor">

                <div id="sd_hierarchy" key={this.state.siteHierarchyKey}><SiteHierarchy
                    setSiteScriptContainer={this.props.setSiteScriptContainer}
                    setTreeAndScriptData={this.setTreeAndScriptData}
                    treeData={this.props.treeData}
                    setSample={this.setSample}
                    setNodeTypeProps={this.props.setNodeTypeProps}
                    nodeTypesProps={this.props.nodeTypesProps}
                    reloadTree={this.reloadTree}
                    />
                </div>
                <div id="sd_content"><JsonEditorWrapper
                    currentSiteScript={this.props.currentSiteScriptContainer
            ? this.props.currentSiteScriptContainer.siteScript
            : null}
                    setSiteScript={this
            .setSiteScript
            .bind(this)}/>
                </div>

        </div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);