import * as React from 'react';
import { addColumnFormatter } from '../../../helpers';
import { INodeProps } from '../../../types';
import "./node-column-formatters.css";
import NodeContainer from '../../../components/nodes/node-container';

export function NodeColumnFormatters(props: INodeProps) {
    const { path, treeData, setTreeAndScriptData } = props;
    const actionProps = {
        iconProps: {
            iconName: 'Add'
        },
        menuProps: {
            shouldFocusOnMount: true,
            items: [
                {
                    key: 'newColumnFormatter',
                    name: 'Add a column formatter',
                    onClick: () => addColumnFormatter(path, treeData, setTreeAndScriptData),
                }
            ]
        },
        title: "Add a new field"
    };

    const containerProps = { ...props, actionProps, title: "Column formatters" };
    return <NodeContainer {...containerProps} />;
}