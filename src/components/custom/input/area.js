import {Input} from "antd";
import React, { Component } from "react";
import IntlMessages from "../../utility/intlMessages";
import TextWrapper from './area.style'
const { TextArea } = Input;

export default class AreaInputCustom extends Component {
  render() {
    const {value, type, placeholder, onChange, required} = this.props;
    return (
      <TextWrapper>
        <label for="input"><IntlMessages id={this.props.label_id} /></label>
        <TextArea type={type} value={value} rows={2} size="large" placeholder={placeholder} id="input" onChange={onChange} autoComplete="new-password" required={required} />
      </TextWrapper>
    )
  }
}
