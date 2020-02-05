import {Checkbox} from "antd";
import React, {Component} from "react";
import IntlMessages from "../../utility/intlMessages";
import CheckboxWrapper from './checkBox.style'

export default class CheckBoxCustom extends Component {
    render() {
        return (
            <CheckboxWrapper>
                <text id='title_label'>
                    <IntlMessages id={this.props.label_id}/>
                </text>
                <Checkbox
                    checked={this.props.checked}
                    disabled={this.props.disabled}
                    onChange={this.props.onChange}
                >
                    {this.props.label}
                </Checkbox>
            </CheckboxWrapper>
        )
    }
}
