import React, {Component} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import {Row, Col} from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import {Form, Select } from "antd";
import PrimaryButton from "../../../../components/custom/button/primary"
import {Card, Checkbox} from 'antd';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import {getUsers, getModels, getRoles, postPermission, findParameters} from '../../../../helpers/api/adminCalls.js';

const {Option} = Select;

export default class PermissionCreate extends Component {


    constructor() {
        super();
        this.state = {
            redirect: false
        }
    }


    handleChange(value, type) {

        this.setState(
            {
                [type]: value
            }
        )
    }

    handlePost() {
        postPermission(
            {
                permission: {
                    role_id: this.state.role_id,
                    cargapp_model_id: this.state.model_id,
                    action: this.state.action,
                    method: this.state.method,
                    allow: this.state.allow,
                    user_id: this.state.user_id,
                    active: true,
                }

            }).then(() => {
            this.setState({redirect: true})
        })
    }


    componentWillMount() {
        axios.all([getUsers(), getModels(), getRoles(), findParameters('ACTIONS'), findParameters('METHODS')])
            .then((responses) => {

                this.setState({
                    users: responses[0].data,
                    models: responses[1].data,
                    roles: responses[2].data,
                    actions: responses[3].data.parameters,
                    methods: responses[4].data.parameters
                });

            })

    }

    render() {
        const {rowStyle, colStyle} = basicStyle;
        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to='/admin/permissions'/>
        }
        return (

            <LayoutWrapper>


                <Row style={rowStyle} gutter={18} justify="start" block>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                <PageHeader>

                                    <h1>
                                        <IntlMessages id="permissions.title"/>

                                    </h1>
                                </PageHeader>
                            </Col>
                        </Row>
                        <Row>
                            <Card className="cardContent" style={{marginTop: '50px'}}>
                                <Form>

                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Rol">
                                                <Select required value={this.state.role_id} placeholder="rol"
                                                        style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'role_id')
                                                }}>
                                                    {this.state && this.state.roles &&

                                                    this.state.roles.map((item) => {
                                                        return <Option value={item.id}>{item.name}</Option>
                                                    })
                                                    }
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Modelo">
                                                <Select required value={this.state.model_id} placeholder="modelo"
                                                        style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'model_id')
                                                }}>
                                                    {this.state && this.state.models &&

                                                    this.state.models.map((item) => {
                                                        return <Option value={item.id}>{item.name}</Option>
                                                    })
                                                    }
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={24}>
                                            <Form.Item label="Usuario">
                                                <Select required value={this.state.user_id} placeholder="usuario"
                                                        style={{width: '50%'}} onChange={(e) => {
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
                                        <Col span={12}>
                                            <Form.Item label="Acción">
                                                <Select value={this.state.action} placeholder="acción"
                                                        style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'action')
                                                }}>
                                                    {this.state && this.state.actions &&

                                                    this.state.actions.map((item) => {
                                                        return <Option value={item.code}>{item.name}</Option>
                                                    })
                                                    }
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Método">
                                                <Select value={this.state.method} placeholder="método"
                                                        style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'method')
                                                }}>
                                                    {this.state && this.state.methods &&

                                                    this.state.methods.map((item) => {
                                                        return <Option value={item.code}>{item.name}</Option>
                                                    })
                                                    }
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={24}>
                                            <Form.Item>
                                                <Checkbox
                                                    checked={this.state.allow}
                                                    onChange={(e) => this.handleChange(e.target.checked, 'allow')}
                                                >
                                                    Allow
                                                </Checkbox>
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
