import * as React from 'react';
import { INodeProps } from '../../../types';
import NodeFieldWrapper from '../../../components/nodes/node-field-wrapper';


export  function NodeFieldNumber(props : INodeProps) {
    var wrapperProps = {...props, smallTitle:"Number field"}
    return <NodeFieldWrapper {...wrapperProps}>
    </NodeFieldWrapper>;
}