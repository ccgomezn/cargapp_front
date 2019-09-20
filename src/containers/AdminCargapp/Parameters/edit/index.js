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
import {getParameter, getUsers, getModels, putParameter} from '../../../../helpers/api/adminCalls.js';
import TextInputCustom from "../../../../components/custom/input/text";
import SelectInputCustom from "../../../../components/custom/input/select";
import importantVariables from "../../../../helpers/hashVariables";

const {Option} = Select;
export default class ParameterEdit extends Component {


    constructor(props) {
        super();
        this.state = {
            redirect: false
        }
    }


    componentWillMount() {
        axios.all([getParameter(this.props.match.params.id), getUsers(), getModels()])
            .then((responses) => {


                this.setState({
                    users: responses[1].data,
                    models: responses[2].data,
                    name: responses[0].data.name,
                    code: responses[0].data.code,
                    description: responses[0].data.description,
                    user_id: responses[0].data.user_id,
                    cargapp_model_id: responses[0].data.cargapp_model_id,
                    value: responses[0].data.value,
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
        const user_id = this.state.user_id !== undefined && this.state.user_id.key !== undefined ? this.state.user_id.key : this.state.user_id;
        const active = this.state.active !== undefined && this.state.active.key !== undefined ? this.state.active.key : this.state.active;
        const cargapp_model_id = this.state.cargapp_model_id !== undefined && this.state.cargapp_model_id.key !== undefined ? this.state.cargapp_model_id.key : this.state.cargapp_model_id;

        putParameter(this.props.match.params.id,
            {
                parameter: {
                    name: this.state.name,
                    code: this.state.code,
                    description: this.state.description,
                    user_id: user_id,
                    cargapp_model_id: cargapp_model_id,
                    value: this.state.value,
                    active: active,
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
            return <Redirect to='/admin/parameters'/>
        }
        return (

            <LayoutWrapper>


                <Row style={rowStyle} gutter={18} justify="start" block>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                <PageHeader>

                                    <h1>
                                        <IntlMessages id="parameters.title"/>

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
                                                <TextInputCustom required value={this.state.name} placeholder="nombre"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'name')}
                                                                 label_id={'admin.title.name'}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Código">
                                                <TextInputCustom required value={this.state.code} placeholder="código"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'code')}
                                                                 label_id={'admin.title.code'}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Descripción">
                                                <TextInputCustom required value={this.state.description}
                                                                 placeholder="descripción"
                                                                 label_id={'admin.title.description'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'description')}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Valor">
                                                <TextInputCustom required value={this.state.value} placeholder="valor"
                                                                 label_id={'admin.title.value'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'value')}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Usuario">
                                                <SelectInputCustom required value={this.state.user_id}
                                                                   placeholder="usuario"
                                                                   style={{width: 240}} onChange={(e) => {
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
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Modelo">

                                                <SelectInputCustom required value={this.state.cargapp_model_id}
                                                                   placeholder="modelo" style={{width: 240}}
                                                                   onChange={(e) => {
                                                                       this.handleChange(e, 'cargapp_model_id')
                                                                   }}
                                                                   options={this.state && this.state.models &&
                                                                   this.state.models.map((item) => {
                                                                       return <Option
                                                                           value={item.id}>{item.name}</Option>
                                                                   })
                                                                   }
                                                                   label_id={'admin.title.model'}>

                                                </SelectInputCustom>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={10}>
                                        <Col span={24}>
                                            <Form.Item label="Estado">
                                                <SelectInputCustom required value={this.state.active}
                                                                   placeholder="estado" style={{width: 240}}
                                                                   onChange={(e) => {
                                                                       this.handleChange(e, 'active')
                                                                   }}
                                                                   options={importantVariables.activeOptions.map((item) => {
                                                                       return <Option
                                                                           value={item.key}>{item.label}</Option>
                                                                   })}
                                                                   label_id={'admin.title.active'}>

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
