import * as React from 'react';

import { INodeProps } from '../../../types';
import NodeFieldWrapper from '../../../components/nodes/node-field-wrapper';


export  function NodeFieldText(props : INodeProps) {
    var wrapperProps = {...props, smallTitle:"Text field"}
    return <NodeFieldWrapper {...wrapperProps}>

    </NodeFieldWrapper>;
}