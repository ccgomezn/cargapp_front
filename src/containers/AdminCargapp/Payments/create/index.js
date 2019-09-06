import React, {Component} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import {Row, Col, Form, Input, Card, Select, Checkbox} from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import PrimaryButton from "../../../../components/custom/button/primary"
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import {postPayment} from '../../../../helpers/api/adminCalls.js';
import {
    getActiveCoupons,
    getActivePaymentMethods,
    getActiveStatus,
    getActiveServices,
    getActiveUsers, getActiveUserPaymentMethods
} from "../../../../helpers/api/adminCalls";


const {Option} = Select;

export default class PaymentCreate extends Component {


    constructor() {
        super();
        this.state = {
            redirect: false
        }
    }


    componentWillMount() {
        axios.all([getActiveCoupons(), getActivePaymentMethods(), getActiveStatus(), getActiveServices(), getActiveUsers(), getActiveUserPaymentMethods()])
            .then((responses) => {
                this.setState({
                    coupons: responses[0].data,
                    payment_methods: responses[1].data,
                    status: responses[2].data,
                    services: responses[3].data,
                    users: responses[4].data,
                    user_payment_methods: responses[5].data
                });

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


        postPayment(
            {
                payment: {
                    uuid: this.state.uuid,
                    total: this.state.total,
                    sub_total: this.state.sub_total,
                    taxes: this.state.taxes,
                    transaction_code: this.state.transaction_code,
                    observation: this.state.observation,
                    coupon_id: this.state.coupon_id,
                    coupon_code: this.state.coupon_code,
                    coupon_amount: this.state.coupon_amount,
                    user_payment_method_id: this.state.user_payment_method_id,
                    payment_method_id: this.state.payment_method_id,
                    is_service: this.state.is_service,
                    user_id: this.state.user_id,
                    statu_id: this.state.statu_id,
                    service_id: this.state.service_id,
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
            return <Redirect to='/admin/payments'/>
        }
        return (

            <LayoutWrapper>


                <Row style={rowStyle} gutter={18} justify="start" block>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                <PageHeader>

                                    <h1>
                                        <IntlMessages id="payments.title"/>

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
                                            <Form.Item label="Total">
                                                <Input type={"number"} value={this.state.total}
                                                       placeholder="total"
                                                       onChange={(e) => this.handleChange(e.target.value, 'total')}
                                                       required/>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Subtotal">
                                                <Input value={this.state.sub_total}
                                                       placeholder="subtotal"
                                                       onChange={(e) => this.handleChange(e.target.value, 'sub_total')}
                                                       required/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Impuestos">
                                                <Input value={this.state.taxes}
                                                       placeholder="impuestos"
                                                       onChange={(e) => this.handleChange(e.target.value, 'taxes')}
                                                       required/>
                                            </Form.Item>
                                        </Col>
                                    </Row>


                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Código de transacción">
                                                <Input value={this.state.transaction_code}
                                                       placeholder="código de transacción"
                                                       onChange={(e) => this.handleChange(e.target.value, 'transaction_code')}
                                                       required/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Observaciones">
                                                <Input value={this.state.observation}
                                                       placeholder="observaciones"
                                                       onChange={(e) => this.handleChange(e.target.value, 'observation')}
                                                       required/>
                                            </Form.Item>
                                        </Col>
                                    </Row>


                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Cupon">
                                                <Select value={this.state.coupon_id}
                                                        placeholder="cupon"
                                                        style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'coupon_id')
                                                }}>
                                                    {this.state && this.state.coupons &&

                                                    this.state.coupons.map((item) => {
                                                        return <Option value={item.id}>{item.name}</Option>
                                                    })
                                                    }
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Código de cupon">
                                                <Input value={this.state.coupon_code}
                                                       placeholder="código de cupon"
                                                       onChange={(e) => this.handleChange(e.target.value, 'coupon_code')}
                                                       required/>
                                            </Form.Item>
                                        </Col>

                                    </Row>

                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Valor de cupon">
                                                <Input value={this.state.coupon_amount}
                                                       placeholder="valor de cupon"
                                                       onChange={(e) => this.handleChange(e.target.value, 'coupon_amount')}
                                                       required/>
                                            </Form.Item>
                                        </Col>

                                        <Col span={12}>
                                            <Form.Item label="Método de pago de usuario">
                                                <Select value={this.state.user_payment_method_id} placeholder="método de pago de usuario"
                                                        style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'user_payment_method_id')
                                                }}>
                                                    {this.state && this.state.user_payment_methods &&

                                                    this.state.user_payment_methods.map((item) => {
                                                        return <Option value={item.id}>{item.email} {item.uuid}</Option>
                                                    })
                                                    }
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Método de pago">
                                                <Select value={this.state.payment_method_id} placeholder="método de pago"
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
                                            <Form.Item>
                                                <Checkbox
                                                    checked={this.state.is_service}
                                                    onChange={(e) => this.handleChange(e.target.checked, 'is_service')}
                                                >
                                                    ¿Es servicio?
                                                </Checkbox>
                                            </Form.Item>
                                        </Col>

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
                                    </Row>
                                    <Row>
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
