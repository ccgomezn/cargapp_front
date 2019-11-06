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
import {getUsers} from "../../../../helpers/api/users";
import {getCompanies} from "../../../../helpers/api/companies";
import {getServices} from "../../../../helpers/api/services";
import {getBankAccounts, getCargappPayment, getPaymentMethods} from "../../../../helpers/api/payments";
import {getStatus} from "../../../../helpers/api/internals";

export default class CargappPaymentShow extends Component {


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
        axios.all([getCargappPayment(this.props.match.params.id), getPaymentMethods(), getUsers(), getStatus(), getBankAccounts(), getServices(), getCompanies()])
            .then((responses) => {

                if (responses[0].data.active) {
                    responses[0].data.active = 'Activo';
                } else {
                    responses[0].data.active = 'Desactivado';
                }


                let data_payment_methods = this.transformDataToMap(responses[1].data, 'name');
                let data_users = this.transformDataToMap(responses[2].data, 'email');
                let data_status = this.transformDataToMap(responses[3].data, 'name');
                let data_bank_accounts = this.transformDataToMap(responses[4].data, 'name');
                let data_services = this.transformDataToMap(responses[5].data, 'name');
                let data_companies = this.transformDataToMap(responses[6].data, 'name');
                this.setState({

                    uuid: responses[0].data.uuid,
                    amount: responses[0].data.amount,
                    transaction_code: responses[0].data.transaction_code,
                    observation: responses[0].data.observation,
                    payment_method: data_payment_methods[responses[0].data.payment_method_id],
                    status: data_status[responses[0].data.statu_id],
                    generator: data_users[responses[0].data.generator_id],
                    receiver: data_users[responses[0].data.receiver_id],
                    user: data_users[responses[0].data.user_id],
                    bank_account: data_bank_accounts[responses[0].data.bank_account_id],
                    service: data_services[responses[0].data.service_id],
                    company: data_companies[responses[0].data.company_id],
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
        this.props.history.push('/admin/cargapp_payments')
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
                                <Row gutter={10}>
                                    <Col span={12}>
                                        <Form.Item label="Uuid">
                                            <p>{this.state.uuid}</p>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Cantidad">
                                            <p>{this.state.amount}</p>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={10}>
                                    <Col span={12}>
                                        <Form.Item label="Código de transacción">
                                            <p>{this.state.transaction_code}</p>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Observación">
                                            <p>{this.state.observation}</p>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row span={12}>
                                    <Col span={12}>
                                        <Form.Item label="Método de pago">
                                            <p>{this.state.payment_method}</p>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Status">
                                            <p>{this.state.status}</p>
                                        </Form.Item>
                                    </Col>
                                </Row>


                                <Row>

                                    <Col span={12}>
                                        <Form.Item label="Generador">
                                            <p>{this.state.generator}</p>
                                        </Form.Item>
                                    </Col>

                                    <Col span={12}>
                                        <Form.Item label="Receptor">
                                            <p>{this.state.receiver}</p>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>

                                    <Col span={12}>
                                        <Form.Item label="Cuenta bancaria">
                                            <p>{this.state.account_number}</p>
                                        </Form.Item>
                                    </Col>

                                    <Col span={12}>
                                        <Form.Item label="Servicio">
                                            <p>{this.state.service}</p>
                                        </Form.Item>
                                    </Col>
                                </Row>
                              <Row>

                                <Col span={12}>
                                  <Form.Item label="Compañia">
                                    <p>{this.state.company}</p>
                                  </Form.Item>
                                </Col>

                                <Col span={12}>
                                  <Form.Item label="Usuario">
                                    <p>{this.state.user}</p>
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
