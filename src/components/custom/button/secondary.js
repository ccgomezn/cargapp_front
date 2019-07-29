import Button from "../../uielements/button";
import React, { Component } from "react";
import IntlMessages from "../../utility/intlMessages";
import SecondaryButtonWrapper from './secondary.style'

export default class SecondaryButton extends Component {
  render() {
    return (
      <SecondaryButtonWrapper>
        <Button className="secondary">
          <IntlMessages id={this.props.message_id} />

        </Button>
      </SecondaryButtonWrapper>
    )

  }

}