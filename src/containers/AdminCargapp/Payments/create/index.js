import React, {Component} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import {Row, Col, Form, Card, Select, Checkbox} from 'antd';
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
import TextInputCustom from "../../../../components/custom/input/text";
import SelectInputCustom from "../../../../components/custom/input/select";
import {transformInputData} from "../../../../helpers/utility";


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
        const coupon_id = transformInputData(this.state.coupon_id);
        const user_id = transformInputData(this.state.user_id);
        const statu_id = transformInputData(this.state.statu_id);
        const service_id = transformInputData(this.state.service_id);
        const payment_method_id = transformInputData(this.state.payment_method_id);
        const user_payment_method_id = transformInputData(this.state.user_payment_method_id);

        postPayment(
            {
                payment: {
                    uuid: this.state.uuid,
                    total: this.state.total,
                    sub_total: this.state.sub_total,
                    taxes: this.state.taxes,
                    transaction_code: this.state.transaction_code,
                    observation: this.state.observation,
                    coupon_id: coupon_id,
                    coupon_code: this.state.coupon_code,
                    coupon_amount: this.state.coupon_amount,
                    user_payment_method_id: user_payment_method_id,
                    payment_method_id: payment_method_id,
                    is_service: this.state.is_service,
                    user_id: user_id,
                    statu_id: statu_id,
                    service_id: service_id,
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
                                                <TextInputCustom value={this.state.uuid}
                                                                 placeholder="uuid"
                                                                 label_id={'admin.title.uuid'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'uuid')}
                                                                 required/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Total">
                                                <TextInputCustom type={"number"} value={this.state.total}
                                                                 label_id={'admin.title.total'}
                                                                 placeholder="total"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'total')}
                                                                 required/>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Subtotal">
                                                <TextInputCustom value={this.state.sub_total}
                                                                 label_id={'admin.title.subTotal'}

                                                                 placeholder="subtotal"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'sub_total')}
                                                                 required/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Impuestos">
                                                <TextInputCustom value={this.state.taxes}
                                                                 label_id={'admin.title.taxes'}

                                                                 placeholder="impuestos"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'taxes')}
                                                                 required/>
                                            </Form.Item>
                                        </Col>
                                    </Row>


                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Código de transacción">
                                                <TextInputCustom value={this.state.transaction_code}
                                                                 label_id={'admin.title.transaction'}
                                                                 placeholder="código de transacción"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'transaction_code')}
                                                                 required/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Observaciones">
                                                <TextInputCustom value={this.state.observation}
                                                                 label_id={'admin.title.observation'}

                                                                 placeholder="observaciones"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'observation')}
                                                                 required/>
                                            </Form.Item>
                                        </Col>
                                    </Row>


                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Cupon">
                                                <SelectInputCustom value={this.state.coupon_id}
                                                                   label_id={'admin.title.coupon'}
                                                                   options={this.state && this.state.coupons &&

                                                                   this.state.coupons.map((item) => {
                                                                       return <Option
                                                                           value={item.id}>{item.name}</Option>
                                                                   })
                                                                   }
                                                                   placeholder="cupon"
                                                                   style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'coupon_id')
                                                }}>

                                                </SelectInputCustom>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Código de cupon">
                                                <TextInputCustom value={this.state.coupon_code}
                                                                 label_id={'admin.title.code'}
                                                                 placeholder="código de cupon"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'coupon_code')}
                                                                 required/>
                                            </Form.Item>
                                        </Col>

                                    </Row>

                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Valor de cupon">
                                                <TextInputCustom value={this.state.coupon_amount}
                                                                 label_id={'admin.title.amount'}

                                                                 placeholder="valor de cupon"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'coupon_amount')}
                                                                 required/>
                                            </Form.Item>
                                        </Col>

                                        <Col span={12}>
                                            <Form.Item label="Método de pago de usuario">
                                                <SelectInputCustom value={this.state.user_payment_method_id}
                                                                   placeholder="método de pago de usuario"
                                                                   style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'user_payment_method_id')
                                                }}
                                                                   label_id={'admin.title.method'}
                                                                   options={this.state && this.state.user_payment_methods &&

                                                                   this.state.user_payment_methods.map((item) => {
                                                                       return <Option
                                                                           value={item.id}>{item.email} {item.uuid}</Option>
                                                                   })
                                                                   }
                                                >

                                                </SelectInputCustom>
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
                                                                   })
                                                                   }
                                                                   label_id={'admin.title.method'}>

                                                </SelectInputCustom>
                                            </Form.Item>
                                        </Col>

                                        <Col span={12}>
                                            <Form.Item label="Status">
                                                <SelectInputCustom value={this.state.statu_id} placeholder="status"
                                                                   style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'statu_id')
                                                }}
                                                                   options={this.state && this.state.status &&

                                                                   this.state.status.map((item) => {
                                                                       return <Option
                                                                           value={item.id}>{item.name}</Option>
                                                                   })
                                                                   }
                                                                   label_id={'admin.title.status'}>

                                                </SelectInputCustom>
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
                                    </Row>
                                    <Row>
                                        <Col span={12}>
                                            <Form.Item label="Usuario">
                                                <SelectInputCustom value={this.state.user_id} placeholder="usuario"
                                                                   style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'user_id')
                                                }}
                                                                   options={this.state && this.state.users &&

                                                                   this.state.users.map((item) => {
                                                                       return <Option
                                                                           value={item.id}>{item.email}</Option>
                                                                   })
                                                                   }
                                                                   label_id={'admin.title.user'}>

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
