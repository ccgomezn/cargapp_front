import Input from "../../uielements/input";
import React, { Component } from "react";
import IntlMessages from "../../utility/intlMessages";
import TextWrapper from './text.style'

export default class TextInputCustom extends Component {
  render() {
    const {value, type, placeholder, onChange, required, disabled} = this.props;
    return (
      <TextWrapper>
        <Input disabled={disabled} 
               type={type} 
               value={value} 
               size="large" 
               placeholder={placeholder} 
               id="input" 
               onChange={onChange} 
               autoComplete="new-password" 
               required={required} />
      </TextWrapper>
    )
  }
}
