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
import {putPaymentMethod, getPaymentMethod, getUsers} from '../../../../helpers/api/adminCalls.js';
import TextInputCustom from "../../../../components/custom/input/text";
import SelectInputCustom from "../../../../components/custom/input/select";
import importantVariables from "../../../../helpers/hashVariables";
import {transformInputData} from "../../../../helpers/utility";


const {Option} = Select;


export default class PaymentMethodEdit extends Component {


    constructor(props) {
        super();
        this.state = {
            redirect: false
        }
    }


    componentWillMount() {
        axios.all([getPaymentMethod(this.props.match.params.id), getUsers()])
            .then((responses) => {
                this.setState({
                    users: responses[1].data,
                    name: responses[0].data.name,
                    uuid: responses[0].data.uuid,
                    description: responses[0].data.description,
                    email: responses[0].data.email,
                    app_id: responses[0].data.aap_id,
                    secret_id: responses[0].data.secret_id,
                    token: responses[0].data.token,
                    password: responses[0].data.password,
                    active: responses[0].data.active,
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
        const active = transformInputData(this.state.active);

        putPaymentMethod(this.props.match.params.id,
            {
                payment_method: {
                    name: this.state.name,
                    uuid: this.state.uuid,
                    description: this.state.description,
                    email: this.state.email,
                    aap_id: this.state.app_id,
                    secret_id: this.state.secret_id,
                    password: this.state.password,
                    token: this.state.token,
                    active: active,
                }
            }).then(() => {
            this.setState({redirect: true})
        })
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

                                    <Row gutter={10}>
                                        <Col span={24}>
                                            <Form.Item label="Estado">
                                                <SelectInputCustom required value={this.state.active}
                                                                   placeholder="estado"
                                                                   options={importantVariables.activeOptions.map((item) => {
                                                                       return <Option
                                                                           value={item.key}>{item.label}</Option>
                                                                   })}
                                                                   label_id={'admin.title.active'}
                                                                   style={{width: 120}} onChange={(e) => {
                                                    this.handleChange(e, 'active')
                                                }}>
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
