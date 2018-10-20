import * as React from 'react';

import { INodeProps } from '../../../types';
import NodeFieldWrapper from '../../../components/nodes/node-field-wrapper';


export  function NodeFieldBoolean(props : INodeProps) {
    var wrapperProps = {...props, smallTitle:"Boolean field"}
    return <NodeFieldWrapper {...wrapperProps}>

    </NodeFieldWrapper>;
}