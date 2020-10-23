import React, { Component } from "react";
import TextWrapper from './text.style'
import {TimePicker} from "antd";

export default class TimePickerCustom extends Component {
  render() {
    const {format, defaultValue, onChange, required} = this.props;
    return (
      <TextWrapper>
          <TimePicker defaultValue={defaultValue}
                      format={format}
                      required={required}
                      onChange={onChange}/>
      </TextWrapper>
    )
  }
}
