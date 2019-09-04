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
import {Select, Input} from 'antd';
import {
    putCargappPayment, getUsers,
    getCompanies,
    getPaymentMethods,
    getStatus, getServices, getBankAccounts
} from '../../../../helpers/api/adminCalls.js';
import {getCargappPayment} from "../../../../helpers/api/adminCalls";


const {Option} = Select;


export default class CargappPaymentEdit extends Component {


    constructor(props) {
        super();
        this.state = {
            redirect: false
        }
    }


    componentWillMount() {
        axios.all([getCargappPayment(this.props.match.params.id), getPaymentMethods(), getUsers(), getStatus(), getBankAccounts(), getServices(), getCompanies()])
            .then((responses) => {
                this.setState({
                    payment_methods: responses[1].data,
                    users: responses[2].data,
                    status: responses[3].data,
                    bank_accounts: responses[4].data,
                    services: responses[5].data,
                    companies: responses[6].data,
                    uuid: responses[0].data.uuid,
                    amount: responses[0].data.amount,
                    transaction_code: responses[0].data.transaction_code,
                    observation: responses[0].data.observation,
                    payment_method_id: responses[0].data.payment_method_id,
                    statu_id: responses[0].data.statu_id,
                    generator_id: responses[0].data.generator_id,
                    receiver_id: responses[0].data.receiver_id,
                    user_id: responses[0].data.user_id,
                    bank_account_id: responses[0].data.bank_account_id,
                    service_id: responses[0].data.service_id,
                    company_id: responses[0].data.company_id,
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
        )
    }

    handlePut() {


        putCargappPayment(this.props.match.params.id,
            {
                cargapp_payment: {
                    uuid: this.state.uuid,
                    amount: this.state.amount,
                    transaction_code: this.state.transaction_code,
                    observation: this.state.observation,
                    payment_method_id: this.state.payment_method_id,
                    statu_id: this.state.statu_id,
                    generator_id: this.state.generator_id,
                    receiver_id: this.state.receiver_id,
                    user_id: this.state.user_id,
                    bank_account_id: this.state.bank_account_id,
                    service_id: this.state.service_id,
                    company_id: this.state.company_id,
                    active: this.state.active
                }
            }).then(() => {
            this.setState({redirect: true})
        })
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
                                                <Input value={this.state.uuid}
                                                       placeholder="uuid"
                                                       onChange={(e) => this.handleChange(e.target.value, 'uuid')}
                                                       required/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Cantidad">
                                                <Input type={"number"} value={this.state.amount}
                                                       placeholder="cantidad"
                                                       onChange={(e) => this.handleChange(e.target.value, 'amount')}
                                                       required/>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Codigo de transacción">
                                                <Input value={this.state.transaction_code}
                                                       placeholder="codigo de transacción"
                                                       onChange={(e) => this.handleChange(e.target.value, 'transaction_code')}
                                                       required/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Observación">
                                                <Input value={this.state.observation}
                                                       placeholder="observación"
                                                       onChange={(e) => this.handleChange(e.target.value, 'observation')}
                                                       required/>
                                            </Form.Item>
                                        </Col>
                                    </Row>


                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Método de pago">
                                                <Select value={this.state.payment_method_id}
                                                        placeholder="método de pago"
                                                        style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'payment_method_id')
                                                }}>
                                                    {this.state && this.state.payment_methods &&

                                                    this.state.payment_methods.map((item) => {
                                                        return <Option value={item.id}>{item.name}</Option>
                                                    })
                                                    }
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Status">
                                                <Select value={this.state.statu_id} placeholder="status"
                                                        style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'statu_id')
                                                }}>
                                                    {this.state && this.state.status &&

                                                    this.state.status.map((item) => {
                                                        return <Option value={item.id}>{item.name}</Option>
                                                    })
                                                    }
                                                </Select>
                                            </Form.Item>
                                        </Col>

                                    </Row>

                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Generador">
                                                <Select value={this.state.generator_id} placeholder="conductor"
                                                        style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'generator_id')
                                                }}>
                                                    {this.state && this.state.users &&

                                                    this.state.users.map((item) => {
                                                        return <Option value={item.id}>{item.email}</Option>
                                                    })
                                                    }
                                                </Select>
                                            </Form.Item>
                                        </Col>

                                        <Col span={12}>
                                            <Form.Item label="Receptor">
                                                <Select value={this.state.receiver_id} placeholder="receptor"
                                                        style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'receiver_id')
                                                }}>
                                                    {this.state && this.state.users &&

                                                    this.state.users.map((item) => {
                                                        return <Option value={item.id}>{item.email}</Option>
                                                    })
                                                    }
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Usuario">
                                                <Select value={this.state.user_id} placeholder="usuario"
                                                        style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'user_id')
                                                }}>
                                                    {this.state && this.state.users &&

                                                    this.state.users.map((item) => {
                                                        return <Option value={item.id}>{item.email}</Option>
                                                    })
                                                    }
                                                </Select>
                                            </Form.Item>
                                        </Col>

                                        <Col span={12}>
                                            <Form.Item label="Cuenta bancaria">
                                                <Select value={this.state.bank_account_id} placeholder="cuenta bancaria"
                                                        style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'bank_account_id')
                                                }}>
                                                    {this.state && this.state.bank_accounts &&

                                                    this.state.bank_accounts.map((item) => {
                                                        return <Option value={item.id}>{item.account_number}</Option>
                                                    })
                                                    }
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Servicio">
                                                <Select value={this.state.service_id} placeholder="servicio"
                                                        style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'service_id')
                                                }}>
                                                    {this.state && this.state.services &&

                                                    this.state.services.map((item) => {
                                                        return <Option value={item.id}>{item.name}</Option>
                                                    })
                                                    }
                                                </Select>
                                            </Form.Item>
                                        </Col>

                                        <Col span={12}>
                                            <Form.Item label="Compañia">
                                                <Select value={this.state.company_id} placeholder="compañia"
                                                        style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'company_id')
                                                }}>
                                                    {this.state && this.state.companies &&

                                                    this.state.companies.map((item) => {
                                                        return <Option value={item.id}>{item.name}</Option>
                                                    })
                                                    }
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={10}>
                                        <Col span={24}>
                                            <Form.Item label="Estado">
                                                <Select required value={this.state.active} placeholder="estado"
                                                        style={{width: 120}} onChange={(e) => {
                                                    this.handleChange(e, 'active')
                                                }}>
                                                    <Option value={true}>Activo</Option>
                                                    <Option value={false}>Desactivado</Option>

                                                </Select>
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
