import Select from "../../uielements/select";
import React, { Component } from "react";
import IntlMessages from "../../utility/intlMessages";
import SelectWrapper from './select.style'

export default class SelectInputCustom extends Component {
  render() {
    return (
      <SelectWrapper>
        <label>
          <IntlMessages id={this.props.label_id} />
        </label>
        <Select
          labelInValue
          placeholder={this.props.placeholder}
          block
        >
          {this.props.options}
        </Select>

      </SelectWrapper>
    )
  }
}