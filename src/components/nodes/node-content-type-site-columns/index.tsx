import * as React from 'react';
import { addSiteColumnToContentType } from '../../../helpers';
import { INodeProps } from '../../../types';
import "./index.css";
import NodeContainer from '../node-container';

export function NodeContentTypeSiteColumns(props: INodeProps) {
    const { path, treeData, setTreeAndScriptData } = props;
    const actionProps = {
        iconProps: {
            iconName: 'Add'
        },
        onClick: () => addSiteColumnToContentType(path, treeData, setTreeAndScriptData),
        title: "Add a new site column reference"
    };

    const containerProps = { ...props, actionProps, title: "Site columns" };
    return <NodeContainer {...containerProps} />;
}
