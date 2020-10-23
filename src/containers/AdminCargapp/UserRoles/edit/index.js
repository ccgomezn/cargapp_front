import React, {Component} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import {Row, Col} from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import {Form} from "antd";
import PrimaryButton from "../../../../components/custom/button/primary"
import {Card, message} from 'antd';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import {Select} from 'antd';
import SelectInputCustom from "../../../../components/custom/input/select";
import importantVariables from "../../../../helpers/hashVariables";
import {transformInputData} from "../../../../helpers/utility";
import {getRoles, getUserRole, getUsers, putUserRole} from "../../../../helpers/api/users";

const {Option} = Select;
export default class RoleEdit extends Component {


    constructor() {
        super();
        this.state = {
            redirect: false
        }
    }


    componentWillMount() {
        axios.all([getUserRole(this.props.match.params.id), getUsers(), getRoles()])
            .then((responses) => {


                this.setState({
                    users: responses[1].data,
                    roles: responses[2].data,
                    user_id: responses[0].data.user_id,
                    role_id: responses[0].data.role_id,
                    active: responses[0].data.active,
                });
            }).catch(error => {
            let errorObject = JSON.parse(JSON.stringify(error));

            message.warning(errorObject.message);
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
        putUserRole(this.props.match.params.id,
            {
                user_role: {
                    user_id: transformInputData(this.state.user_id),
                    role_id: transformInputData(this.state.role_id),
                    active: transformInputData(this.state.active),
                }

            }).then(() => {
            this.setState({redirect: true})
        }).catch(error => {
            let errorObject = JSON.parse(JSON.stringify(error));

            message.warning(errorObject.message);
        });
    }

    render() {
        const {rowStyle, colStyle} = basicStyle;
        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to='/admin/user_roles'/>
        }
        return (

            <LayoutWrapper>


                <Row style={rowStyle} gutter={18} justify="start" block>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                <PageHeader>

                                    <h1>
                                        <IntlMessages id="users_roles.title"/>

                                    </h1>
                                </PageHeader>
                            </Col>
                        </Row>
                        <Row>
                            <Card className="cardContent" style={{marginTop: '50px'}}>
                                <Row gutter={10}>
                                    <Col span={24}>
                                        <Form.Item label="Usuario">
                                            <SelectInputCustom value={this.state.user_id} placeholder="usuario"
                                                               style={{width: 240}} onChange={(e) => {
                                                this.handleChange(e, 'user_id')
                                            }}
                                                               options={this.state && this.state.users &&

                                                               this.state.users.map((item) => {
                                                                   return <Option value={item.id}>{item.email}</Option>
                                                               })
                                                               }
                                                               label_id={'admin.title.user'}>

                                            </SelectInputCustom>
                                        </Form.Item>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <Form.Item label="Rol">
                                            <SelectInputCustom value={this.state.role_id} placeholder="rol"
                                                               style={{width: 240}}
                                                               onChange={(e) => {
                                                                   this.handleChange(e, 'role_id')
                                                               }}
                                                               options={this.state && this.state.roles &&
                                                               this.state.roles.map((item) => {
                                                                   return <Option value={item.id}>{item.name}</Option>
                                                               })
                                                               }
                                                               label_id={'admin.title.role'}>

                                            </SelectInputCustom>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={10}>
                                    <Col span={12}>
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
                                            <PrimaryButton message_id={"general.edit"} style={{width: '200px'}}
                                                           onClick={() => this.handlePut()}/>
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
