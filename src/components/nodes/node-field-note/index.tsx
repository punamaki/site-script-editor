import * as React from 'react';
import { INodeProps } from '../../../types';
import NodeFieldWrapper from '../../../components/nodes/node-field-wrapper';

export function NodeFieldNote(props: INodeProps) {
    const wrapperProps = { ...props, smallTitle: "Note field" };
    return <NodeFieldWrapper {...wrapperProps} />;
}