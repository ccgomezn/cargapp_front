import Button from "../../uielements/button";
import React, { Component } from "react";
import IntlMessages from "../../utility/intlMessages";
import PrimaryButtonWrapper from './primary.style'

export default class PrimaryButton extends Component {
  render() {
    return (
      <PrimaryButtonWrapper>
        <Button disabled={this.props.disabled} className="primary" style={this.props.style} onClick={this.props.onClick} htmlType={this.props.htmlType}>
          <IntlMessages id={this.props.message_id} />

        </Button>
      </PrimaryButtonWrapper>
    )

  }

}
