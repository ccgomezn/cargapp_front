import Input from "../../uielements/input";
import React, { Component } from "react";
import IntlMessages from "../../utility/intlMessages";
import TextWrapper from './text.style'

export default class TextInputCustom extends Component {
  render() {
    const {value, type, placeholder, onChange, required} = this.props;
    return (
      <TextWrapper>
        <label for="input"><IntlMessages id={this.props.label_id} /></label>
        <Input type={type} value={value} size="large" placeholder={placeholder} id="input" onChange={onChange} autoComplete="new-password" required={required} />
      </TextWrapper>
    )
  }
}