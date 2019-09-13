import {Select} from "antd";
import React, {Component} from "react";
import IntlMessages from "../../utility/intlMessages";
import SelectWrapper from './select.style'

const {Option} = Select;
export default class SelectInputCustom extends Component {
    render() {
        return (
            <SelectWrapper>
                <label>
                    <IntlMessages id={this.props.label_id}/>
                </label>
                <Select
                    labelInValue
                    placeholder={this.props.placeholder}

                    value={this.props.value !== undefined && this.props.value.key !== undefined ? this.props.value : {key: this.props.value}}
                    onChange={this.props.onChange}
                    style={{width: '100%'}}
                    block
                >
                    {this.props.options}
                </Select>

            </SelectWrapper>
        )
    }
}