import React, {Component} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import {Row, Col, Form, Input, Card, Select} from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import PrimaryButton from "../../../../components/custom/button/primary"
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import {postUserPaymentMethod} from '../../../../helpers/api/adminCalls.js';
import {getActivePaymentMethods, getActiveUsers} from "../../../../helpers/api/adminCalls";
import {transformInputData} from "../../../../helpers/utility";
import TextInputCustom from "../../../../components/custom/input/text";
import SelectInputCustom from "../../../../components/custom/input/select";


const {Option} = Select

export default class UserPaymentMethodCreate extends Component {


    constructor() {
        super();
        this.state = {
            redirect: false
        }
    }


    componentWillMount() {
        axios.all([getActiveUsers(), getActivePaymentMethods()])
            .then((responses) => {

                this.setState({
                    users: responses[0].data,
                    payment_methods: responses[1].data,
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
        postUserPaymentMethod(
            {
                user_payment_method: {
                    email: this.state.email,
                    uuid: this.state.uuid,
                    token: this.state.token,
                    card_number: this.state.card_number,
                    expiration: this.state.expiration + '/' + this.state.expiration_m,
                    cvv: this.state.cvv,
                    observation: this.state.observation,
                    user_id: transformInputData(this.state.user_id),
                    payment_method_id: transformInputData(this.state.payment_method_id),
                    active: true,
                }
            }).then(() => {
            this.setState({redirect: true})
        })
    }

    render() {
        const {rowStyle, colStyle} = basicStyle;
        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to='/admin/user_payment_methods'/>
        }
        return (

            <LayoutWrapper>


                <Row style={rowStyle} gutter={18} justify="start" block>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                <PageHeader>

                                    <h1>
                                        <IntlMessages id="user_payment_methods.title"/>

                                    </h1>
                                </PageHeader>
                            </Col>
                        </Row>
                        <Row>
                            <Card className="cardContent" style={{marginTop: '50px'}}>
                                <Form>

                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Email">
                                                <TextInputCustom value={this.state.email} placeholder="email"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'email')}
                                                                 label_id={'admin.title.email'}
                                                                 required/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Uuid">
                                                <TextInputCustom value={this.state.uuid} placeholder="uuid"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'uuid')}
                                                                 required
                                                                 label_id={'admin.title.uuid'}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>

                                        <Col span={12}>
                                            <Form.Item label="Token">
                                                <TextInputCustom value={this.state.token} placeholder="token"
                                                                 label_id={'admin.title.token'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'token')}
                                                                 required/>

                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item label="Expiración (MM)">
                                                <TextInputCustom value={this.state.expiration_m}
                                                                 placeholder="expiración (mm)"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'expiration_m')}
                                                                 label_id={'admin.title.expiration'}
                                                                 required/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item label="Expiración (YY)">
                                                <TextInputCustom value={this.state.expiration}
                                                                 placeholder="expiración (yy)"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'expiration')}
                                                                 label_id={'admin.title.expiration'}
                                                                 required/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={24}>
                                            <Form.Item label="Número de tarjeta">
                                                <TextInputCustom value={this.state.card_number}
                                                                 placeholder="número de tarjeta"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'card_number')}
                                                                 label_id={'admin.title.card'}
                                                                 required/>
                                            </Form.Item>
                                        </Col>

                                    </Row>
                                    <Row gutter={10}>

                                        <Col span={12}>
                                            <Form.Item label="CVV">
                                                <TextInputCustom value={this.state.cvv} placeholder="cvv"
                                                                 label_id={'admin.title.cvv'}

                                                                 onChange={(e) => this.handleChange(e.target.value, 'cvv')}
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

                                        <Col span={12}>
                                            <Form.Item label="Método de pago">
                                                <SelectInputCustom value={this.state.payment_method_id}
                                                        placeholder="método de pago"
                                                        style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'payment_method_id')
                                                }}
                                                options={this.state && this.state.payment_methods &&

                                                this.state.payment_methods.map((item) => {
                                                    return <Option value={item.id}>{item.uuid}</Option>
                                                })
                                                }
                                                label_id={'admin.title.method'}>

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
