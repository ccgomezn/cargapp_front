import {Select} from "antd";
import React, {Component} from "react";
import IntlMessages from "../../utility/intlMessages";
import SelectWrapper from './selectMultiple.style'

export default class SelectMultipleInputCustom extends Component {
    render() {
        return (
            <SelectWrapper>
                <label>
                    <IntlMessages id={this.props.label_id}/>
                </label>
                <Select
                    mode={'multiple'}
                    placeholder={this.props.placeholder}
                    value={this.props.value}
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
