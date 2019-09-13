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
import {Select, Input} from 'antd';
import {getIntegration, getUsers, putIntegration} from "../../../../helpers/api/adminCalls"
import TextInputCustom from "../../../../components/custom/input/text";
import SelectInputCustom from "../../../../components/custom/input/select";
import importantVariables from "../../../../helpers/hashVariables";

const {Option} = Select;
export default class CargappIntegrationEdit extends Component {


    constructor(props) {
        super();
        this.state = {
            redirect: false
        }
    }


    componentWillMount() {
        axios.all([getIntegration(this.props.match.params.id), getUsers()])
            .then((responses) => {

                if (responses[0].data.active) {
                    responses[0].data.active = true;
                } else {
                    responses[0].data.active = false;
                }
                const user_id = this.state.user_id && this.state.user_id.key ? this.state.user_id.key : this.state.user_id;
                const active = this.state.active !== undefined && this.state.active.key !== undefined ? this.state.active.key : this.state.active;

                this.setState({
                    users: responses[1].data,
                    name: responses[0].data.name,
                    description: responses[0].data.description,
                    provider: responses[0].data.provider,
                    code: responses[0].data.code,
                    url: responses[0].data.url,
                    url_provider: responses[0].data.url_provider,
                    url_production: responses[0].data.url_production,
                    url_develop: responses[0].data.url_develop,
                    email: responses[0].data.email,
                    username: responses[0].data.username,
                    phone: responses[0].data.phone,
                    pin: responses[0].data.pin,
                    token: responses[0].data.token,
                    app_id: responses[0].data.app_id,
                    client_id: responses[0].data.client_id,
                    api_key: responses[0].data.api_key,
                    user_id: responses[0].data.user_id,
                    active: responses[0].data.active,
                    password: responses[0].data.password,
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
        const user_id = this.state.user_id && this.state.user_id.key ? this.state.user_id.key : this.state.user_id;
        const active = this.state.active !== undefined && this.state.active.key !== undefined ? this.state.active.key : this.state.active;

        putIntegration(this.props.match.params.id, {
            cargapp_integration: {
                name: this.state.name,
                description: this.state.description,
                provider: this.state.provider,
                code: this.state.code,
                url: this.state.url,
                url_provider: this.state.url_provider,
                url_production: this.state.url_production,
                url_develop: this.state.url_develop,
                email: this.state.email,
                username: this.state.username,
                password: this.state.password,
                phone: this.state.phone,
                pin: this.state.pin,
                token: this.state.token,
                app_id: this.state.app_id,
                client_id: this.state.client_id,
                api_key: this.state.api_key,
                user_id: user_id,
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
            return <Redirect to='/admin/cargapp_integrations'/>
        }
        return (

            <LayoutWrapper>


                <Row style={rowStyle} gutter={18} justify="start" block>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                <PageHeader>

                                    <h1>
                                        <IntlMessages id="cargappIntegrations.title"/>

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
                                                                 label_id={'admin.title.name'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'name')}
                                                                 required/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Código">
                                                <TextInputCustom value={this.state.code} placeholder="código"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'code')}
                                                                 label_id={'admin.title.code'}
                                                                 required/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Descripción">
                                                <TextInputCustom value={this.state.description}
                                                                 placeholder="descripción"
                                                                 label_id={'admin.title.description'}

                                                                 onChange={(e) => this.handleChange(e.target.value, 'description')}
                                                                 required/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Proveedor">
                                                <TextInputCustom value={this.state.provider} placeholder="proveedor"
                                                                 label_id={'admin.title.provider'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'provider')}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Url">
                                                <TextInputCustom value={this.state.url} placeholder="url"
                                                                 label_id={'admin.title.url'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'url')}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Url de proveedor">
                                                <TextInputCustom value={this.state.url_provider}
                                                                 placeholder="url de proveedor"
                                                                 label_id={'admin.title.urlProvider'}

                                                                 onChange={(e) => this.handleChange(e.target.value, 'url_provider')}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Url de producción">
                                                <TextInputCustom value={this.state.url_production}
                                                                 placeholder="url de producción"
                                                                 label_id={'admin.title.urlProduction'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'url_production')}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Url de desarrollo">
                                                <TextInputCustom value={this.state.url_develop}
                                                                 placeholder="url de desarrollo"
                                                                 label_id={'admin.title.urlDevelopment'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'url_develop')}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={10}>

                                        <Col span={12}>
                                            <Form.Item label="Nombre de usuario">
                                                <TextInputCustom value={this.state.username}
                                                                 placeholder="nombre de usuario"
                                                                 label_id={'admin.title.name'}

                                                                 onChange={(e) => this.handleChange(e.target.value, 'username')}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Email">
                                                <TextInputCustom value={this.state.email} placeholder="email"
                                                                 label_id={'admin.title.email'}

                                                                 onChange={(e) => this.handleChange(e.target.value, 'email')}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Contraseña">
                                                <TextInputCustom type={'password'} secureTextEntry={true}
                                                                 label_id={'admin.title.password'}

                                                                 value={this.state.password} placeholder="contraseña"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'password')}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Teléfono">
                                                <TextInputCustom value={this.state.phone} placeholder="teléfono"
                                                                 label_id={'admin.title.phone'}

                                                                 onChange={(e) => this.handleChange(e.target.value, 'phone')}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Pin">
                                                <TextInputCustom value={this.state.pin} placeholder="pin"
                                                                 label_id={'admin.title.pin'}

                                                                 onChange={(e) => this.handleChange(e.target.value, 'pin')}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Token">
                                                <TextInputCustom value={this.state.token} placeholder="token"
                                                                 label_id={'admin.title.token'}

                                                                 onChange={(e) => this.handleChange(e.target.value, 'token')}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Id de aplicación">
                                                <TextInputCustom
                                                    label_id={'admin.title.applicationId'}

                                                    value={this.state.app_id} placeholder="id de aplicación"
                                                    onChange={(e) => this.handleChange(e.target.value, 'app_id')}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Id de cliente">
                                                <TextInputCustom
                                                    label_id={'admin.title.clientId'}
                                                    value={this.state.client_id} placeholder="id de cliente"
                                                    onChange={(e) => this.handleChange(e.target.value, 'client_id')}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Llave de API">
                                                <TextInputCustom
                                                    label_id={'admin.title.apiKey'}
                                                    value={this.state.api_key} placeholder="llave de API"
                                                    onChange={(e) => this.handleChange(e.target.value, 'api_key')}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Usuario">
                                                <SelectInputCustom value={this.state.user_id} placeholder="usuario"
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
                                            <Form.Item label="Estado">
                                                <SelectInputCustom required value={this.state.active}
                                                                   placeholder="estado" style={{width: 120}}
                                                                   onChange={(e) => {
                                                                       this.handleChange(e, 'active')
                                                                   }}
                                                                   label_id={'admin.title.active'}
                                                                   options={importantVariables.activeOptions &&

                                                                   importantVariables.activeOptions.map((item) => {
                                                                       return <Option
                                                                           value={item.key}>{item.label}</Option>
                                                                   })
                                                                   }>
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
