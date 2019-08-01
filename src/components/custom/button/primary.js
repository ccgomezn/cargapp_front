import Button from "../../uielements/button";
import React, { Component } from "react";
import IntlMessages from "../../utility/intlMessages";
import PrimaryButtonWrapper from './primary.style'

export default class PrimaryButton extends Component {
  render() {
    return (
      <PrimaryButtonWrapper>
        <Button className="primary" style={this.props.style} onClick={this.props.onClick}>
          <IntlMessages id={this.props.message_id} />

        </Button>
      </PrimaryButtonWrapper>    
    )

  }

}