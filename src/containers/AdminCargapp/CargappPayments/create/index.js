import React, {Component} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import {Row, Col, Form, Card, Select} from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import PrimaryButton from "../../../../components/custom/button/primary"
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import {postCargappPayment} from '../../../../helpers/api/adminCalls.js';
import {
    getActivePaymentMethods,
    getActiveUsers,
    getStatusOfModel,
    getActiveBankAccounts, getActiveServices, getActiveCompanies, getActiveModels
} from "../../../../helpers/api/adminCalls";
import TextInputCustom from "../../../../components/custom/input/text";
import SelectInputCustom from "../../../../components/custom/input/select";


const {Option} = Select;

export default class CargappPaymentCreate extends Component {


    constructor() {
        super();
        this.state = {
            redirect: false
        }
    }


    componentWillMount() {
        getActiveModels().then(response => {
            let model_id = '';

            response.data.forEach(model => {
                if(model.code === 'CARGAPP_PAYMENTS'){
                    model_id = model.id
                }
            });
            axios.all([getActivePaymentMethods(), getActiveUsers(), getStatusOfModel(model_id), getActiveBankAccounts(), getActiveServices(), getActiveCompanies()])
                .then((responses) => {
                    this.setState({
                        payment_methods: responses[0].data,
                        users: responses[1].data,
                        status: responses[2].data,
                        bank_accounts: responses[3].data,
                        services: responses[4].data,
                        companies: responses[5].data
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

        const payment_method_id = this.state.payment_method_id !== undefined && this.state.payment_method_id.key !== undefined ? this.state.payment_method_id.key : this.state.payment_method_id;
        const statu_id = this.state.statu_id !== undefined && this.state.statu_id.key !== undefined ? this.state.statu_id.key : this.state.statu_id;
        const generator_id = this.state.generator_id !== undefined && this.state.generator_id.key !== undefined ? this.state.generator_id.key : this.state.generator_id;
        const receiver_id = this.state.receiver_id !== undefined && this.state.receiver_id.key !== undefined ? this.state.receiver_id.key : this.state.receiver_id;
        const user_id = this.state.user_id !== undefined && this.state.user_id.key !== undefined ? this.state.user_id.key : this.state.user_id;
        const bank_account_id = this.state.bank_account_id !== undefined && this.state.bank_account_id.key !== undefined ? this.state.bank_account_id.key : this.state.bank_account_id;
        const service_id = this.state.service_id !== undefined && this.state.service_id.key !== undefined ? this.state.service_id.key : this.state.service_id;
        const company_id = this.state.company_id !== undefined && this.state.company_id.key !== undefined ? this.state.company_id.key : this.state.company_id;
        postCargappPayment(
            {
                cargapp_payment: {
                    uuid: this.state.uuid,
                    amount: this.state.amount,
                    transaction_code: this.state.transaction_code,
                    observation: this.state.observation,
                    payment_method_id: payment_method_id,
                    statu_id: statu_id,
                    generator_id: generator_id,
                    receiver_id: receiver_id,
                    user_id: user_id,
                    bank_account_id: bank_account_id,
                    service_id: service_id,
                    company_id: company_id,
                    active: true
                }
            }
        ).then(
            () => {
                this
                    .setState({redirect: true})
            }
        )
    }

    render() {
        const {rowStyle, colStyle} = basicStyle;
        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to='/admin/cargapp_payments'/>
        }
        return (

            <LayoutWrapper>


                <Row style={rowStyle} gutter={18} justify="start" block>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                <PageHeader>

                                    <h1>
                                        <IntlMessages id="cargappPayments.title"/>

                                    </h1>
                                </PageHeader>
                            </Col>
                        </Row>
                        <Row>
                            <Card className="cardContent" style={{marginTop: '50px'}}>
                                <Form>

                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Uuid">
                                                <TextInputCustom value={this.state.uuid}
                                                                 placeholder="uuid"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'uuid')}
                                                                 label_id={'admin.title.uuid'}
                                                                 required/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Cantidad">
                                                <TextInputCustom type={"number"} value={this.state.amount}
                                                                 placeholder="cantidad"
                                                                 label_id={'admin.title.quantity'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'amount')}
                                                                 required/>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Codigo de transacción">
                                                <TextInputCustom value={this.state.transaction_code}
                                                                 placeholder="codigo de transacción"
                                                                 label_id={'admin.title.transactionCode'}

                                                                 onChange={(e) => this.handleChange(e.target.value, 'transaction_code')}
                                                                 required/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Observación">
                                                <TextInputCustom value={this.state.observation}
                                                                 label_id={'admin.title.observation'}
                                                                 placeholder="observación"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'observation')}
                                                                 required/>
                                            </Form.Item>
                                        </Col>
                                    </Row>


                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Método de pago">
                                                <SelectInputCustom value={this.state.payment_method_id}
                                                                   placeholder="método de pago"
                                                                   style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'payment_method_id')
                                                }}
                                                                   options={this.state && this.state.payment_methods &&

                                                                   this.state.payment_methods.map((item) => {
                                                                       return <Option
                                                                           value={item.id}>{item.name}</Option>
                                                                   })}
                                                                   label_id={'admin.title.paymentMethod'}>
                                                </SelectInputCustom>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Status">
                                                <SelectInputCustom value={this.state.statu_id} placeholder="status"
                                                                   style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'statu_id')
                                                }}
                                                                   label_id={'admin.title.status'}
                                                                   options={this.state && this.state.status &&

                                                                   this.state.status.map((item) => {
                                                                       return <Option
                                                                           value={item.id}>{item.name}</Option>
                                                                   })
                                                                   }>

                                                </SelectInputCustom>
                                            </Form.Item>
                                        </Col>

                                    </Row>

                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Generador">
                                                <SelectInputCustom value={this.state.generator_id}
                                                                   placeholder="conductor"
                                                                   style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'generator_id')
                                                }}
                                                                   options={this.state && this.state.users &&

                                                                   this.state.users.map((item) => {
                                                                       return <Option
                                                                           value={item.id}>{item.email}</Option>
                                                                   })
                                                                   }
                                                                   label_id={'admin.title.generator'}>

                                                </SelectInputCustom>
                                            </Form.Item>
                                        </Col>

                                        <Col span={12}>
                                            <Form.Item label="Receptor">
                                                <SelectInputCustom value={this.state.receiver_id} placeholder="receptor"
                                                                   style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'receiver_id')
                                                }}
                                                                   options={this.state && this.state.users &&

                                                                   this.state.users.map((item) => {
                                                                       return <Option
                                                                           value={item.id}>{item.email}</Option>
                                                                   })
                                                                   }
                                                                   label_id={'admin.title.receiver'}
                                                >

                                                </SelectInputCustom>
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
                                                                   label_id={'admin.title.user'}
                                                                   options={this.state && this.state.users &&

                                                                   this.state.users.map((item) => {
                                                                       return <Option
                                                                           value={item.id}>{item.email}</Option>
                                                                   })
                                                                   }>

                                                </SelectInputCustom>
                                            </Form.Item>
                                        </Col>

                                        <Col span={12}>
                                            <Form.Item label="Cuenta bancaria">
                                                <SelectInputCustom value={this.state.bank_account_id}
                                                                   placeholder="cuenta bancaria"
                                                                   style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'bank_account_id')
                                                }}
                                                                   label_id={'admin.title.bankAccount'}
                                                                   options={this.state && this.state.bank_accounts &&

                                                                   this.state.bank_accounts.map((item) => {
                                                                       return <Option
                                                                           value={item.id}>{item.account_number}</Option>
                                                                   })
                                                                   }>

                                                </SelectInputCustom>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Servicio">
                                                <SelectInputCustom value={this.state.service_id} placeholder="servicio"
                                                                   style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'service_id')
                                                }}
                                                                   options={this.state && this.state.services &&

                                                                   this.state.services.map((item) => {
                                                                       return <Option
                                                                           value={item.id}>{item.name}</Option>
                                                                   })
                                                                   }
                                                                   label_id={'admin.title.service'}>

                                                </SelectInputCustom>
                                            </Form.Item>
                                        </Col>

                                        <Col span={12}>
                                            <Form.Item label="Compañia">
                                                <SelectInputCustom value={this.state.company_id} placeholder="compañia"
                                                        style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'company_id')
                                                }}
                                                        options={this.state && this.state.companies &&

                                                        this.state.companies.map((item) => {
                                                            return <Option value={item.id}>{item.name}</Option>
                                                        })
                                                        }
                                                        label_id={'admin.title.company'}>

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
