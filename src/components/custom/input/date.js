import React, { Component } from "react";
import IntlMessages from "../../utility/intlMessages";
import TextWrapper from './text.style'
import {DatePicker} from "antd";

export default class DatePickerCustom extends Component {
  render() {
    const {format, defaultValue, onChange, required} = this.props;
    return (
      <TextWrapper>
          <DatePicker defaultValue={defaultValue}
                      format={format}
                      required={required}
                      onChange={onChange}/>
      </TextWrapper>
    )
  }
}
