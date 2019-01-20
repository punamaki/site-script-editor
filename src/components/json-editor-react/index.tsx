import * as React from 'react';
import JSONEditor from "jsoneditor";
import styled from "styled-components";
import "jsoneditor/dist/jsoneditor.css";

export interface JsonEditorProps {
    onChange: (json: any) => void;
    onDirty: () => void;
    value: object;
    options: any;
    width: string;
    height: string;
    className?: string;
    config?: object;
}

class JsonEditorReact extends React.PureComponent<JsonEditorProps, any> {
    private timeout: any = undefined;
    private editor: JSONEditor;
    private div: any;
    public static defaultProps: Partial<JsonEditorProps> = {
        config: {},
        onDirty: () => { }
    };
    constructor(props: JsonEditorProps) {
        super(props);
        this.state = {
            currentValue: props.value,
            dirty: false
        };

    }

    handleChange = () => {
        this.setState({
            currentValue: this
                .editor
                .get(),
            dirty: true
        });
    }

    handleFocus = () => {
        this.setState({ controllingFocus: true });
    }

    handleBlur = () => {
        this.setState({ controllingFocus: false });
    }

    componentDidMount() {
        const { value, options } = this.props;

        const mergedOptions = {
            ...options,
            onChange: this.handleChange
        };

        this.editor = new JSONEditor(this.div, mergedOptions);
        this
            .editor
            .set(value);
    }

    componentDidUpdate(prevProps: JsonEditorProps, prevState: JsonEditorProps) {
        const { onChange, onDirty } = this.props;

        if (this.state.dirty === true && this.state.controllingFocus) {
            onDirty();
        }

        // if (this.state.dirty === true && !this.state.controllingFocus) {
        if (this.state.dirty === true) {
            this.timeout = setTimeout(() => {
                onChange(this.state.currentValue);
                this.setState({ dirty: false });
            }, 200);
        }

        // if (this.state.controllingFocus) {
        //    clearTimeout(this.timeout);
        // }

        if (prevProps.value !== this.props.value && !this.state.controllingFocus) {

            this
                .editor
                .set(this.props.value);
            this.setState({ currentValue: this.props.value, dirty: false });
        }
    }

    componentWillUnmount() {
        this
            .editor
            .destroy();
        delete this.editor;
        clearTimeout(this.timeout);
    }

    render() {
        const { className } = this.props;

        return (<div
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            className={className}
            ref={div => {
                this.div = div;
            }} />);
    }
}

export default styled(JsonEditorReact).attrs({
    width: (props: any) => props.width || "300px",
    height: (props: any) => props.height || "300px"
})`
  width: ${props => props.width};
  height: ${props => props.height};
`;
