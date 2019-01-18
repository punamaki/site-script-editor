import * as React from 'react';
import { INodeProps } from '../../../types';
import NodeFieldWrapper from '../../../components/nodes/node-field-wrapper';

export function NodeFieldBoolean(props: INodeProps) {
    const wrapperProps = { ...props, smallTitle: "Boolean field" };
    return <NodeFieldWrapper {...wrapperProps} />;
}