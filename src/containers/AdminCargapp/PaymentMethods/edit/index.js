import React, {Component} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import {Row, Col, DatePicker} from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import {Form} from "antd";
import PrimaryButton from "../../../../components/custom/button/primary"
import {Card} from 'antd';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import {Select, Input} from 'antd';
import moment from 'moment';
import {putPaymentMethod, getPaymentMethod, getUsers} from '../../../../helpers/api/adminCalls.js';


const dateFormat = 'YYYY-MM-DD';
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
                    user_id: responses[0].data.user_id,
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
        const formData = new FormData();
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
                    user_id: this.state.user_id,
                    token: this.state.token,
                    active: this.state.active,
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
                                        <Input value={this.state.name} placeholder="nombre"
                                               onChange={(e) => this.handleChange(e.target.value, 'name')}
                                               required/>
                                      </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                      <Form.Item label="Uuid">
                                        <Input value={this.state.uuid} placeholder="uuid"
                                               onChange={(e) => this.handleChange(e.target.value, 'uuid')}
                                               required/>
                                      </Form.Item>
                                    </Col>
                                  </Row>
                                  <Row gutter={10}>
                                    <Col span={12}>
                                      <Form.Item label="Descripción">
                                        <Input value={this.state.description} placeholder="descripción"
                                               onChange={(e) => this.handleChange(e.target.value, 'description')}
                                               required/>
                                      </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                      <Form.Item label="Email">
                                        <Input value={this.state.email} placeholder="email"
                                               onChange={(e) => this.handleChange(e.target.value, 'email')}
                                               required/>

                                      </Form.Item>
                                    </Col>
                                  </Row>
                                  <Row gutter={10}>
                                    <Col span={12}>
                                      <Form.Item label="Id de aplicación">
                                        <Input value={this.state.app_id} placeholder="id de aplicación"
                                               onChange={(e) => this.handleChange(e.target.value, 'app_id')}
                                               required/>
                                      </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                      <Form.Item label="Id de secreto">
                                        <Input value={this.state.secret_id} placeholder="id de secreto"
                                               onChange={(e) => this.handleChange(e.target.value, 'secret_id')}
                                               required/>
                                      </Form.Item>
                                    </Col>
                                  </Row>
                                  <Row gutter={10}>

                                    <Col span={12}>
                                      <Form.Item label="Token">
                                        <Input value={this.state.token} placeholder="token"
                                               onChange={(e) => this.handleChange(e.target.value, 'token')}
                                               required/>
                                      </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                      <Form.Item label="Password">
                                        <Input value={this.state.password} type={"password"}
                                               placeholder="password"
                                               onChange={(e) => this.handleChange(e.target.value, 'password')}
                                               required/>
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
