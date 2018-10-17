import * as React from 'react';

import { INodeProps } from '../../../types';
import NodeFieldWrapper from '../../../components/nodes/node-field-wrapper';


export default function NodeFieldDateTime(props : INodeProps) {
    var wrapperProps = {...props, smallTitle:"Date time field"}
    return <NodeFieldWrapper {...wrapperProps}>

    </NodeFieldWrapper>;
}