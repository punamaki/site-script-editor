import * as React from 'react';
import { INodeProps } from '../../../types';
import NodeFieldWrapper from '../../../components/nodes/node-field-wrapper';

export function NodeFieldDateTime(props: INodeProps) {
    const wrapperProps = { ...props, smallTitle: "Date time field" };
    return <NodeFieldWrapper {...wrapperProps} />;
}