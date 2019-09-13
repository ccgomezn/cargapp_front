import React, {Component} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import {Row, Col} from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import {Form} from "antd";
import PrimaryButton from "../../../../components/custom/button/primary"
import {Card} from 'antd';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import {Select} from 'antd';
import {putBankAccount, getUsers, getStatus} from '../../../../helpers/api/adminCalls.js';
import {getBankAccount} from "../../../../helpers/api/adminCalls";
import TextInputCustom from "../../../../components/custom/input/text";
import SelectInputCustom from "../../../../components/custom/input/select";
import importantVariables from "../../../../helpers/hashVariables";

const {Option} = Select;


export default class BankAccountEdit extends Component {


    constructor(props) {
        super();
        this.state = {
            redirect: false,
            statu_id: '',
            user_id: ''
        }
    }


    componentWillMount() {
        axios.all([getBankAccount(this.props.match.params.id), getUsers(), getStatus()])
            .then((responses) => {
                this.setState({
                    users: responses[1].data,
                    status: responses[2].data,
                    account_number: responses[0].data.account_number,
                    account_type: responses[0].data.account_type,
                    bank: responses[0].data.bank,
                    user_id: responses[0].data.user_id,
                    statu_id: responses[0].data.statu_id,
                    active: responses[0].data.active
                });

            }).catch((error) => {
            console.error(error);
        });
    }

    handleChange(value, type) {

        this.setState(
            {
                [type]: value
            }
        );

    }

    handlePut() {

        const user_id = this.state.user_id && this.state.user_id.key ? this.state.user_id.key : this.state.user_id;
        const statu_id = this.state.statu_id && this.state.statu_id.key ? this.state.statu_id.key : this.state.statu_id;
        const active = this.state.active !== undefined && this.state.active.key !== undefined ? this.state.active.key : this.state.active;
        putBankAccount(this.props.match.params.id,
            {
                "bank_account": {
                    "account_number": this.state.account_number,
                    "account_type": this.state.account_type,
                    "bank": this.state.bank,
                    "user_id": user_id,
                    "statu_id": statu_id,
                    "active": active
                }
            }).then(() => {
            this.setState({redirect: true})
        })
    }

    render() {
        const {rowStyle, colStyle} = basicStyle;
        const {redirect} = this.state;


        if (redirect) {
            return <Redirect to='/admin/bank_accounts'/>
        }
        return (

            <LayoutWrapper>


                <Row style={rowStyle} gutter={18} justify="start" block>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                <PageHeader>

                                    <h1>
                                        <IntlMessages id="bankAccounts.title"/>

                                    </h1>
                                </PageHeader>
                            </Col>
                        </Row>
                        <Row>
                            <Card className="cardContent" style={{marginTop: '50px'}}>
                                <Form>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Número de cuenta">
                                                <TextInputCustom type={"number"} value={this.state.account_number}
                                                                 placeholder="número de cuenta"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'account_number')}
                                                                 label_id={"admin.title.bankAccount"}

                                                                 required/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Tipo de cuenta">
                                                <TextInputCustom value={this.state.account_type}
                                                                 placeholder="tipo de cuenta"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'account_type')}
                                                                 label_id={"admin.title.type"}
                                                                 required/>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Banco">
                                                <TextInputCustom value={this.state.bank} placeholder="banco"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'bank')}
                                                                 label_id={"admin.title.bank"}

                                                                 required/>
                                            </Form.Item>
                                        </Col>

                                    </Row>


                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Usuario">
                                                <SelectInputCustom value={this.state.user_id} placeholder="usuario"
                                                                   style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'user_id')
                                                }}
                                                                   options={this.state && this.state.users &&

                                                                   this.state.users.map((item) => {
                                                                       return <Option
                                                                           key={item.id}
                                                                           value={item.id}>{item.email}</Option>
                                                                   })}
                                                                   label_id={"admin.title.user"}>
                                                </SelectInputCustom>

                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Status">
                                                <SelectInputCustom defaultValue={this.state.statu_id}
                                                                   value={this.state.statu_id} placeholder="status"
                                                                   style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'statu_id')
                                                }}
                                                                   options={this.state && this.state.status &&

                                                                   this.state.status.map((item) => {
                                                                       return <Option
                                                                           key={item.id}
                                                                           value={item.id}>{item.name}</Option>
                                                                   })}
                                                                   label_id={'admin.title.status'}>


                                                </SelectInputCustom>
                                            </Form.Item>
                                        </Col>

                                    </Row>

                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Estado">
                                                <SelectInputCustom required value={this.state.active}
                                                                   placeholder="estado"
                                                                   label_id={'admin.title.status'}
                                                                   style={{width: 120}} onChange={(e) => {
                                                    this.handleChange(e, 'active')
                                                }}
                                                                   options={
                                                                       importantVariables.activeOptions.map((item) => {
                                                                           return <Option
                                                                               key={item.key}
                                                                               value={item.key}>{item.label}</Option>
                                                                       })
                                                                   }>


                                                </SelectInputCustom>
                                            </Form.Item>
                                        </Col>

                                    </Row>

                                    <Row>
                                        <Col span={24}>
                                            <Form.Item wrapperCol={{span: 24}}>
                                                <PrimaryButton htmlType={"submit"} message_id={"general.edit"}
                                                               style={{width: '200px'}}
                                                               onClick={() => this.handlePut()}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card>


                        </Row>

                    </Col>
                </Row>


            </LayoutWrapper>
        );
    }
}
