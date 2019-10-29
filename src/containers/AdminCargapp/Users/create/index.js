import React, {Component} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import {Row, Col, Form, Card, Select} from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import PrimaryButton from "../../../../components/custom/button/primary"
import {Redirect} from 'react-router-dom'
import axios from "axios";
import TextInputCustom from "../../../../components/custom/input/text";
import SelectMultipleInputCustom from "../../../../components/custom/input/selectMultiple";
import {getActiveRoles, postUser, postUserRole, verifyEmail} from "../../../../helpers/api/users";


const {Option} = Select;

export default class UserCreate extends Component {


    constructor() {
        super();
        this.state = {
            redirect: false,
            duplicated: false
        }
    }


    handleChange(value, type) {
        if (type === 'email') {
            if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w+)+$/.test(value)) {
                verifyEmail(value).then((response) => {
                    if (response.data.email) {

                        this.setState({duplicated: true});
                    } else {
                        this.setState({duplicated: false});
                    }
                })
            }
        }
        this.setState(
            {
                [type]: value
            }
        )
    }


    handlePost() {
        postUser(
            {
                user: {
                    email: this.state.email,
                    password: this.state.password,
                    identification: this.state.identification,
                    phone_number: this.state.phone_number,
                    password_confirmation: this.state.password_confirmation,
                }
            }).then((response) => {
            let role_calls = [];
            this.state.role_id.map((role) => {

                role_calls.push(postUserRole({
                        user_role: {
                            role_id: role,
                            user_id: response.data.id,
                            admin_id: 1,
                            active: true
                        }
                    }
                ));
                return role;

            });

            axios.all(role_calls)
                .then(() => {
                    this.setState({redirect: true});
                })

        })
    }

    componentWillMount() {

        axios.all([getActiveRoles()])
            .then((responses) => {
                if (responses[0]) {
                    this.setState({
                        roles: responses[0].data
                    });
                }
            })
    }

    render() {
        const {rowStyle, colStyle} = basicStyle;
        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to='/admin/users'/>
        }
        return (

            <LayoutWrapper>


                <Row style={rowStyle} gutter={18} justify="start" block>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                <PageHeader>

                                    <h1>
                                        <IntlMessages id="users.title"/>

                                    </h1>
                                </PageHeader>
                            </Col>
                        </Row>
                        <Row>
                            <Card className="cardContent" style={{marginTop: '50px'}}>
                                <Form>

                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item
                                                label={this.state.duplicated ? "Email (el email esta duplicado)" : "Email"}>
                                                <TextInputCustom value={this.state.email} placeholder="email"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'email')}
                                                                 label_id={'admin.title.email'}
                                                                 required/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Password">
                                                <TextInputCustom type={"password"} value={this.state.password}
                                                                 placeholder="password"
                                                                 label_id={'admin.title.password'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'password')}
                                                                 required/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Confirmación de password">
                                                <TextInputCustom type={"password"}
                                                                 value={this.state.password_confirmation}
                                                                 placeholder="confirmación de password"
                                                                 label_id={'admin.title.password'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'password_confirmation')}
                                                                 required/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>

                                            <Form.Item
                                                label={"Cédula"}>
                                                <TextInputCustom value={this.state.identification} placeholder="cédula"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'identification')}
                                                                 label_id={'admin.title.identification'}
                                                                 required/>
                                            </Form.Item>
                                        </Col>

                                    </Row>
                                    <Row gutter={10}>

                                        <Col span={12}>
                                            <Form.Item label="Teléfono">
                                                <TextInputCustom value={this.state.phone_number}
                                                                 placeholder="teléfono"
                                                                 label_id={'admin.title.phone_number'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'phone_number')}
                                                                 required/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Rol">
                                                <SelectMultipleInputCustom value={this.state.role_id} placeholder="rol"
                                                                           style={{width: '100%'}}

                                                                           onChange={(e) => {
                                                                               this.handleChange(e, 'role_id')

                                                                           }}
                                                                           options={this.state && this.state.roles &&

                                                                           this.state.roles.map((item) => {
                                                                               return <Option
                                                                                   value={item.id}>{item.code}</Option>
                                                                           })
                                                                           }
                                                                           label_id={'admin.title.role'}
                                                >

                                                </SelectMultipleInputCustom>
                                            </Form.Item>
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col span={24}>
                                            <Form.Item wrapperCol={{span: 24}}>
                                                <PrimaryButton disabled={this.state.duplicated} htmlType={"submit"}
                                                               message_id={"general.add"}
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
