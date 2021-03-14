import * as React from "react";
import "./node-wrapper.css";
import { IconButton } from "office-ui-fabric-react/lib/Button";
import { TooltipHost } from "office-ui-fabric-react/lib/Tooltip";
import { Icon } from "office-ui-fabric-react/lib/Icon";

import { TeachingBubbleContent } from "office-ui-fabric-react/lib/TeachingBubble";
import { Coachmark } from "office-ui-fabric-react/lib/Coachmark";
import { DirectionalHint } from "office-ui-fabric-react/lib/common/DirectionalHint";
import { IDictionary } from "types";
import * as actions from "../../../actions";
import { connect } from "react-redux";

export interface INodeWrapperProps {
  children?: React.ReactNode;
  actionProps?: object | null;
  smallTitle?: string;
  menuClass?: string;
  infoText?: string;
  showCoachMark?: boolean;
  bubleTitle?: string;
  bubleContent?: JSX.Element;
  nodeName?: string;
}
export interface IConnectedState {
  coachmarkStates: IDictionary<boolean>;
}
export interface IConnectedDispatch {
  setCoachMarkState: (id: string, isVisible: boolean) => void;
}
export function mapStateToProps({ coachmarkStates }: IConnectedState) {
  return { coachmarkStates };
}
export function mapDispatchToProps(dispatch: any): IConnectedDispatch {
  return {
    setCoachMarkState: (id: string, isVisible: boolean) => {
      dispatch(actions.setCoachMarkState(id, isVisible));
    }
  };
}
class NodeWrapper extends React.Component<INodeWrapperProps & IConnectedState & IConnectedDispatch> {
  private menuButtonRef: any;
  private info = this.props.infoText ? (
    <TooltipHost content={this.props.infoText} calloutProps={{ gapSpace: 0 }}>
      <Icon iconName="Info" className="sd_site_hierarchy_node_info_icon" />
    </TooltipHost>
  ) : (
    ""
  );

  private wrapperRef: any;
  private setWrapperRef = (node: any) => {
    this.wrapperRef = node;
  }

  private handleClickOutside = (event: any) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      if (this.props.nodeName) {
        this.props.setCoachMarkState(this.props.nodeName, false);
      }
    }
  }

  componentDidMount() {
    this.wrapperRef = React.createRef<HTMLDivElement>();
    this.menuButtonRef= React.createRef<HTMLDivElement>();
    if (this.props.showCoachMark) {
      document.addEventListener("mousedown", this.handleClickOutside);
      if (this.props.showCoachMark && this.props.nodeName && !this.props.coachmarkStates.hasOwnProperty(this.props.nodeName)) {
        this.props.setCoachMarkState(this.props.nodeName, true);
      }
    }
  }

  componentWillUnmount() {
    if (this.props.showCoachMark) {
      document.removeEventListener("mousedown", this.handleClickOutside);
    }
  }

  private showCoachMark = () => {
    const showCoachMark = this.props.showCoachMark ? true : false;
    return showCoachMark && this.props.nodeName && this.props.coachmarkStates[this.props.nodeName] && this.props.coachmarkStates[this.props.nodeName];
  }

  render() {
    return (
      <div className="sd_site_hierarchy_node">
        <div className="sd_site_hierarchy_node_container">
          {this.props.smallTitle ? (
            <div className="sd_site_hierarchy_node_header">
              {this.props.smallTitle}
              {this.info}
            </div>
          ) : (
            <div />
          )}
          <div className="sd_site_hierarchy_node_content">
            {this.props.children}
          </div>
        </div>
        {this.props.actionProps ? (
          <div
            className={
              "sd_site_hierarchy_node_menu_launcher " + this.props.menuClass
            }
            ref={this.menuButtonRef}
          >
            <IconButton {...this.props.actionProps} />
          </div>
        ) : (
          <div />
        )}
        {this.showCoachMark() && (
          <div ref={this.setWrapperRef}>
            <Coachmark
              target={this.menuButtonRef.current}
              positioningContainerProps={{
                directionalHint: DirectionalHint.rightCenter
              }}
              preventDismissOnLostFocus={true}
              delayBeforeMouseOpen={500}
            >
              {" "}
              <TeachingBubbleContent
                headline={this.props.bubleTitle}
                hasCloseIcon={true}>
                {this.props.bubleContent}
              </TeachingBubbleContent>
            </Coachmark>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NodeWrapper);