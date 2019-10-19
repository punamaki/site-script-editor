import * as React from 'react';
import { INodeProps } from '../../../types';
import NodeFieldWrapper from '../../../components/nodes/node-field-wrapper';

export function NodeFieldNumber(props: INodeProps) {
    const wrapperProps = { ...props, smallTitle: "Number field" };
    return <NodeFieldWrapper {...wrapperProps} />;
}