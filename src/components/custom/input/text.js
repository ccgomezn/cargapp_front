import Input from "../../uielements/input";
import React, { Component } from "react";
import IntlMessages from "../../utility/intlMessages";
import TextWrapper from './text.style'

export default class TextInputCustom extends Component {
  render() {
    return (
      <TextWrapper>
        <label for="input"><IntlMessages id={this.props.label_id} /></label>
        <Input type={this.props.type} size="large" placeholder={this.props.placeholder} id="input" autoComplete="new-password" />
      </TextWrapper>
    )
  }
}