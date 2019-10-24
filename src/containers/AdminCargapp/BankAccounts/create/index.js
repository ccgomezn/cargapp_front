import React, {Component} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import {Row, Col, Form, Card, Select} from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import PrimaryButton from "../../../../components/custom/button/primary"
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import {postBankAccount} from '../../../../helpers/api/adminCalls.js';
import {getStatusOfModel, getActiveUsers, getActiveModels} from "../../../../helpers/api/adminCalls";
import TextInputCustom from "../../../../components/custom/input/text";
import SelectInputCustom from "../../../../components/custom/input/select";

const {Option} = Select;

export default class BankAccountCreate extends Component {


    constructor() {
        super();
        this.state = {
            redirect: false,
            statu_id: '',
            user_id: ''
        }
    }


    componentWillMount() {
        getActiveModels().then(response => {
            let model_id = '';

            response.data.forEach(model => {
                if (model.code === 'BANK_ACCOUNTS') {
                    model_id = model.id
                }
            });

            axios.all([getStatusOfModel(model_id), getActiveUsers()])
                .then((responses) => {
                    this.setState({
                        status: responses[0].data,
                        users: responses[1].data
                    });

                })
        })


    }

    handleChange(value, type) {

        this.setState(
            {
                [type]: value
            }
        )
    }

    handlePost() {
        const user_id = this.state.user_id && this.state.user_id.key ? this.state.user_id.key : this.state.user_id;
        const statu_id = this.state.statu_id && this.state.statu_id.key ? this.state.statu_id.key : this.state.statu_id;

        postBankAccount(
            {
                "bank_account": {
                    "account_number": this.state.account_number,
                    "account_type": this.state.account_type,
                    "bank": this.state.bank,
                    "statu_id": statu_id,
                    "user_id": user_id,
                    "active": true
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
                                                                 label_id="admin.title.bankAccount"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'account_number')}
                                                                 required/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Tipo de cuenta">
                                                <TextInputCustom value={this.state.account_type}
                                                                 placeholder="tipo de cuenta"
                                                                 label_id="admin.title.type"

                                                                 onChange={(e) => this.handleChange(e.target.value, 'account_type')}
                                                                 required/>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Banco">
                                                <TextInputCustom value={this.state.bank} placeholder="banco"
                                                                 label_id="admin.title.bank"

                                                                 onChange={(e) => this.handleChange(e.target.value, 'bank')}
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
                                                                   options={

                                                                       this.state && this.state.users &&

                                                                       this.state.users.map((item) => {
                                                                           return <Option
                                                                               key={item.id}
                                                                               value={item.id}>{item.email}</Option>
                                                                       })

                                                                   }
                                                                   label_id={'admin.title.user'}
                                                >

                                                </SelectInputCustom>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Status">
                                                <SelectInputCustom value={this.state.statu_id} placeholder="status"
                                                                   style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'statu_id')
                                                }}
                                                                   label_id={"admin.title.status"}
                                                                   options={this.state && this.state.status &&

                                                                   this.state.status.map((item) => {
                                                                       return <Option
                                                                           key={item.id}
                                                                           value={item.id}>{item.name}</Option>
                                                                   })}>

                                                </SelectInputCustom>
                                            </Form.Item>
                                        </Col>

                                    </Row>


                                    <Row>
                                        <Col span={24}>
                                            <Form.Item wrapperCol={{span: 24}}>
                                                <PrimaryButton htmlType={"submit"} message_id={"general.add"}
                                                               style={{width: '200px'}}
                                                               onClick={() => this.handlePost()}/>
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
