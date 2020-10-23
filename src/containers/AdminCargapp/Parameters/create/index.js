import React, {Component} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import {Row, Col} from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import {Form, Select} from "antd";
import PrimaryButton from "../../../../components/custom/button/primary"
import {Card, message} from 'antd';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import TextInputCustom from "../../../../components/custom/input/text";
import SelectInputCustom from "../../../../components/custom/input/select";
import AreaInputCustom from "../../../../components/custom/input/area";
import {getActiveUsers, getMineUser} from "../../../../helpers/api/users";
import {getActiveModels, postParameter} from "../../../../helpers/api/internals";

const {Option} = Select;

export default class ParameterCreate extends Component {


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
        const cargapp_model_id = this.state.cargapp_model_id !== undefined && this.state.cargapp_model_id.key !== undefined ? this.state.cargapp_model_id.key : this.state.cargapp_model_id;

        getMineUser().then((response) => {
            postParameter(
                {
                    parameter: {
                        name: this.state.name,
                        code: this.state.code,
                        description: this.state.description,
                        user_id: response.data.user.id,
                        cargapp_model_id: cargapp_model_id,
                        value: this.state.value,
                        active: true,
                    }

                }).then(() => {
                this.setState({redirect: true})
            }).catch(error => {
                let errorObject = JSON.parse(JSON.stringify(error));

                message.warning(errorObject.message);
            });
        })
    }


    componentWillMount() {
        axios.all([getActiveUsers(), getActiveModels()])
            .then((responses) => {

                this.setState({
                    users: responses[0].data,
                    models: responses[1].data,
                    user_id: responses[0].data[0].id,
                    cargapp_model_id: responses[1].data[0].id
                });

            })

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
                                                <AreaInputCustom required value={this.state.description}
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

                                    <Row>
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
