import * as React from 'react';
import { INodeProps } from '../../../types';
import NodeFieldWrapper from '../../../components/nodes/node-field-wrapper';

export default function NodeFieldNote(props : INodeProps) {
    var wrapperProps = {...props, smallTitle:"Note field"}
    return <NodeFieldWrapper {...wrapperProps}>
    </NodeFieldWrapper>;
}