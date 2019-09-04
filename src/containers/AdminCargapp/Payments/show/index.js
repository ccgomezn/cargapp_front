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
import {getUsers} from '../../../../helpers/api/adminCalls.js';
import {

    getPayment,
    getPaymentMethods,
    getServices,
    getStatus, getCoupons, getUserPaymentMethods
} from "../../../../helpers/api/adminCalls";

export default class PaymentShow extends Component {


    constructor(props) {
        super();
        this.state = {
            redirect: false
        }
    }

    transformDataToMap(data, key) {
        var dataTransformed = {};
        data.map((item) => {
            dataTransformed[item.id] = item[key];
            return item;
        });

        return dataTransformed
    }

    componentWillMount() {
        axios.all([getPayment(this.props.match.params.id), getCoupons(), getPaymentMethods(), getStatus(), getServices(), getUsers(), getUserPaymentMethods()])
            .then((responses) => {

                if (responses[0].data.active) {
                    responses[0].data.active = 'Activo';
                } else {
                    responses[0].data.active = 'Desactivado';
                }

                if (responses[0].data.is_service) {
                    responses[0].data.is_service = 'Es servicio';
                } else {
                    responses[0].data.is_service = 'No es servicio';
                }


                let data_coupons = this.transformDataToMap(responses[1].data, 'name');
                let data_payment_methods = this.transformDataToMap(responses[2].data, 'name');
                let data_status = this.transformDataToMap(responses[3].data, 'name');
                let data_services = this.transformDataToMap(responses[4].data, 'name');
                let data_users = this.transformDataToMap(responses[5].data, 'email');
                let data_user_payment_methods = this.transformDataToMap(responses[6].data, 'uuid');
                this.setState({
                    uuid: responses[0].data.uuid,
                    total: responses[0].data.total,
                    sub_total: responses[0].data.sub_total,
                    taxes: responses[0].data.taxes,
                    transaction_code: responses[0].data.transaction_code,
                    observation: responses[0].data.observation,
                    coupon: data_coupons[responses[0].data.coupon_id],
                    coupon_code: responses[0].data.coupon_code,
                    coupon_amount: responses[0].data.coupon_amount,
                    user_payment_method: data_user_payment_methods[responses[0].data.user_payment_method_id],
                    payment_method: data_payment_methods[responses[0].data.payment_method_id],
                    is_service: responses[0].data.is_service,
                    user: data_users[responses[0].data.user_id],
                    statu: data_status[responses[0].data.statu_id],
                    service: data_services[responses[0].data.service_id],
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

    goBack() {
        this.props.history.push('/admin/payments')
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
                                <Row gutter={10}>
                                    <Col span={12}>
                                        <Form.Item label="Uuid">
                                            <p>{this.state.uuid}</p>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Total">
                                            <p>{this.state.total}</p>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={10}>
                                    <Col span={12}>
                                        <Form.Item label="Subtotal">
                                            <p>{this.state.sub_total}</p>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Impuesto">
                                            <p>{this.state.taxes}</p>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row span={12}>
                                    <Col span={12}>
                                        <Form.Item label="Codigo de transacción">
                                            <p>{this.state.transaction_code}</p>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Observacion">
                                            <p>{this.state.observation}</p>
                                        </Form.Item>
                                    </Col>
                                </Row>


                                <Row>

                                    <Col span={12}>
                                        <Form.Item label="Cupon">
                                            <p>{this.state.coupon}</p>
                                        </Form.Item>
                                    </Col>

                                    <Col span={12}>
                                        <Form.Item label="Código de cupon">
                                            <p>{this.state.coupon_code}</p>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>

                                    <Col span={12}>
                                        <Form.Item label="Cantidad de cupon">
                                            <p>{this.state.coupon_amount}</p>
                                        </Form.Item>
                                    </Col>

                                    <Col span={12}>
                                        <Form.Item label="Metodo de pago de usuario">
                                            <p>{this.state.user_payment_method}</p>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>

                                    <Col span={12}>
                                        <Form.Item label="Metodo de pago">
                                            <p>{this.state.payment_method}</p>
                                        </Form.Item>
                                    </Col>

                                    <Col span={12}>
                                        <Form.Item label="Status">
                                            <p>{this.state.statu}</p>
                                        </Form.Item>
                                    </Col>
                                </Row>


                                <Row>

                                    <Col span={12}>
                                        <Form.Item label="Usuario">
                                            <p>{this.state.user}</p>
                                        </Form.Item>
                                    </Col>

                                    <Col span={12}>
                                        <Form.Item label="Es servicio?">
                                            <p>{this.state.is_service}</p>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>

                                    <Col span={12}>
                                        <Form.Item label="Servicio">
                                            <p>{this.state.service}</p>
                                        </Form.Item>
                                    </Col>


                                </Row>

                                <Row>

                                    <Col span={12}>
                                        <Form.Item label="Estado de activación">
                                            <p>{this.state.active}</p>
                                        </Form.Item>
                                    </Col>


                                </Row>

                                <Row>
                                    <Col span={24}>
                                        <Form.Item wrapperCol={{span: 24}}>
                                            <PrimaryButton message_id={"general.back"} style={{width: '200px'}}
                                                           onClick={() => this.goBack()}/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>


                        </Row>

                    </Col>
                </Row>


            </LayoutWrapper>
        );
    }
}
