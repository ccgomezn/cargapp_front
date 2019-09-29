import React, {Component} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import {Row, Col, Form, Card} from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import PrimaryButton from "../../../../components/custom/button/primary"
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import moment from 'moment';
import {postPaymentMethod} from '../../../../helpers/api/adminCalls.js';
import {getActiveUsers, getMineUser} from "../../../../helpers/api/adminCalls";
import TextInputCustom from "../../../../components/custom/input/text";



export default class PaymentMethodCreate extends Component {


    constructor() {
        super();
        this.state = {
            redirect: false
        }
    }


    componentWillMount() {
        axios.all([getActiveUsers()])
            .then((responses) => {

                this.setState({
                    users: responses[0].data,
                    expire_date: moment(),
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
        getMineUser().then((response) => {
            postPaymentMethod(
                {
                    payment_method: {
                        name: this.state.name,
                        uuid: this.state.uuid,
                        description: this.state.description,
                        email: this.state.email,
                        aap_id: this.state.app_id,
                        secret_id: this.state.secret_id,
                        password: this.state.password,
                        user_id: response.data.user.id,
                        token: this.state.token,
                        active: true,
                    }
                }).then(() => {
                this.setState({redirect: true})
            })
        });

    }

    render() {
        const {rowStyle, colStyle} = basicStyle;
        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to='/admin/payment_methods'/>
        }
        return (

            <LayoutWrapper>


                <Row style={rowStyle} gutter={18} justify="start" block>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                <PageHeader>

                                    <h1>
                                        <IntlMessages id="payment_methods.title"/>

                                    </h1>
                                </PageHeader>
                            </Col>
                        </Row>
                        <Row>
                            <Card className="cardContent" style={{marginTop: '50px'}}>
                                <Form>

                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Nombre">
                                                <TextInputCustom value={this.state.name} placeholder="nombre"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'name')}
                                                                 required
                                                                 label_id={'admin.title.name'}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Uuid">
                                                <TextInputCustom value={this.state.uuid} placeholder="uuid"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'uuid')}
                                                                 label_id={'admin.title.uuid'}
                                                                 required/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Descripción">
                                                <TextInputCustom value={this.state.description}
                                                                 placeholder="descripción"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'description')}
                                                                 label_id={'admin.title.description'}
                                                                 required/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Email">
                                                <TextInputCustom value={this.state.email} placeholder="email"
                                                                 label_id={'admin.title.email'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'email')}
                                                                 required/>

                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Id de aplicación">
                                                <TextInputCustom value={this.state.app_id}
                                                                 placeholder="id de aplicación"
                                                                 label_id={'admin.title.aplication'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'app_id')}
                                                                 required/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Id de secreto">
                                                <TextInputCustom value={this.state.secret_id}
                                                                 placeholder="id de secreto"
                                                                 label_id={'admin.title.secret'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'secret_id')}
                                                                 required/>
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
                                        <Col span={12}>
                                            <Form.Item label="Password">
                                                <TextInputCustom value={this.state.password} type={"password"}
                                                                 placeholder="password"
                                                                 label_id={'admin.title.password'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'password')}
                                                                 required/>
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
