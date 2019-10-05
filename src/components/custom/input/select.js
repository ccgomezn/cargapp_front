import {Select} from "antd";
import React, {Component} from "react";
import IntlMessages from "../../utility/intlMessages";
import SelectWrapper from './select.style'

export default class SelectInputCustom extends Component {
    render() {
        return (
            <SelectWrapper>
                <label>
                    <IntlMessages id={this.props.label_id}/>
                </label>
                <Select
                    defaultValue={this.props.defaultValue}
                    labelInValue
                    showSearch
                    placeholder={this.props.placeholder}
                    optionFilterProp="children"
                    value={this.props.value !== undefined && this.props.value.key !== undefined ? this.props.value : {key: this.props.value}}
                    onChange={this.props.onChange}
                    style={{width: '100%'}}
                    block
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.props.options}
                </Select>

            </SelectWrapper>
        )
    }
}
