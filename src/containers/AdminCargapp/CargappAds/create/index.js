import React, {Component} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import {Row, Col, Form, Input, Card, Select, Checkbox} from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import PrimaryButton from "../../../../components/custom/button/primary"
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import {getUsers, postCargappAd} from '../../../../helpers/api/adminCalls.js';


const {Option} = Select;

export default class CargappAdCreate extends Component {


    constructor() {
        super();
        this.state = {
            redirect: false
        }
    }


    componentWillMount() {
        axios.all([getUsers()])
            .then((responses) => {
                this.setState({
                    users: responses[0].data,
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

        const formData = new FormData();
        formData.append('cargapp_ad[name]', this.state.name);
        formData.append('cargapp_ad[price]', this.state.price);
        formData.append('cargapp_ad[description]', this.state.description);
        formData.append('cargapp_ad[body]', this.state.body);
        formData.append('cargapp_ad[url]', this.state.url);
        formData.append('cargapp_ad[have_discoun]', this.state.have_discoun);
        formData.append('cargapp_ad[is_percentage]', this.state.is_percentage);
        formData.append('cargapp_ad[discoun]', this.state.discoun);
        formData.append('cargapp_ad[image]', this.state.image, this.state.image.name);
        formData.append('cargapp_ad[media]', this.state.media, this.state.media.name);
        formData.append('cargapp_ad[user_id]', this.state.user_id);
        formData.append('cargapp_ad[active]', true);
        postCargappAd(
            formData).then(() => {
            this.setState({redirect: true})
        })
    }

    render() {
        const {rowStyle, colStyle} = basicStyle;
        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to='/admin/cargapp_ads'/>
        }
        return (

            <LayoutWrapper>


                <Row style={rowStyle} gutter={18} justify="start" block>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                <PageHeader>

                                    <h1>
                                        <IntlMessages id="cargappAds.title"/>

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
                                            <Form.Item label="Precio">
                                                <Input type={"number"} value={this.state.price} placeholder="precio"
                                                       onChange={(e) => this.handleChange(e.target.value, 'price')}
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
                                            <Form.Item label="Cuerpo">
                                                <Input  value={this.state.body} placeholder="cuerpo"
                                                       onChange={(e) => this.handleChange(e.target.value, 'body')}
                                                       required/>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Url">
                                                <Input value={this.state.url} placeholder="url"
                                                       onChange={(e) => this.handleChange(e.target.value, 'url')}
                                                       required/>
                                            </Form.Item>
                                        </Col>

                                    </Row>

                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Media">
                                                <input type="file"
                                                       onChange={(e) => this.handleChange(e.target.files[0], 'media')}/>
                                            </Form.Item>
                                        </Col>

                                        <Col span={12}>
                                            <Form.Item label="Imagen">
                                                <input type="file"
                                                       onChange={(e) => this.handleChange(e.target.files[0], 'image')}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item>
                                                <Checkbox
                                                    checked={this.state.is_percentage}
                                                    onChange={(e) => this.handleChange(e.target.checked, 'is_percentage')}
                                                >
                                                    Es porcentaje?
                                                </Checkbox>
                                            </Form.Item>
                                        </Col>

                                        <Col span={12}>
                                            <Form.Item>
                                                <Checkbox
                                                    checked={this.state.have_discoun}
                                                    onChange={(e) => this.handleChange(e.target.checked, 'have_discoun')}
                                                >
                                                    Tiene descuento?
                                                </Checkbox>
                                            </Form.Item>
                                        </Col>

                                    </Row>


                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Descuento">
                                                <Input value={this.state.discoun} placeholder="descuento"
                                                       onChange={(e) => this.handleChange(e.target.value, 'discoun')}
                                                       required/>
                                            </Form.Item>
                                        </Col>
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
