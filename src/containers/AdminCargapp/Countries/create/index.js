import React, {Component} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import {Row, Col} from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import {Form, Input} from "antd";
import PrimaryButton from "../../../../components/custom/button/primary"
import {Card} from 'antd';
import {Redirect} from 'react-router-dom'
import {postCountry} from "../../../../helpers/api/adminCalls"
import TextInputCustom from "../../../../components/custom/input/text";


export default class CountryCreate extends Component {


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
        postCountry(
            {
                country: {
                    name: this.state.name,
                    code: this.state.code,
                    description: this.state.description,
                    cioc: this.state.cioc,
                    currency_code: this.state.currency_code,
                    currency_name: this.state.currency_name,
                    currency_symbol: this.state.currency_symbol,
                    language_iso639: this.state.language_iso639,
                    language_name: this.state.language_name,
                    language_native_name: this.state.language_native_name,
                    image: this.state.image,
                    date_utc: this.state.date_utc,
                    active: true,
                }

            }).then(() => {
            this.setState({redirect: true})
        })
    }

    render() {
        const {rowStyle, colStyle} = basicStyle;
        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to='/admin/countries'/>
        }
        return (

            <LayoutWrapper>


                <Row style={rowStyle} gutter={18} justify="start" block>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                <PageHeader>

                                    <h1>
                                        <IntlMessages id="countries.title"/>

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
                                                                 onChange={(e) => this.handleChange(e.target.value, 'name')}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Código">
                                                <TextInputCustom value={this.state.code} placeholder="código"
                                                                 label_id={'admin.title.code'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'code')}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Descripción">
                                                <TextInputCustom value={this.state.description}
                                                                 placeholder="descripción"
                                                                 label_id={'admin.title.description'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'description')}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Cioc">
                                                <TextInputCustom value={this.state.cioc} placeholder="cioc"
                                                                 label_id={'admin.title.cioc'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'cioc')}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Código de moneda">
                                                <TextInputCustom value={this.state.currency_code}
                                                                 placeholder="código de moneda"
                                                                 label_id={'admin.title.money'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'currency_code')}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Nombre de moneda">
                                                <TextInputCustom value={this.state.currency_name}
                                                                 placeholder="nombre de moneda"
                                                                 label_id={'admin.title.money'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'currency_name')}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Simbolo de moneda">
                                                <TextInputCustom value={this.state.currency_symbol}
                                                                 label_id={'admin.title.money'}
                                                                 placeholder="simbolo de moneda"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'currency_symbol')}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Lenguaje iso 639">
                                                <TextInputCustom value={this.state.language_iso639}
                                                                 placeholder="lenguaje iso 639"
                                                                 label_id={'admin.title.language'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'language_iso639')}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Nombre de lenguaje">
                                                <TextInputCustom value={this.state.language_name}
                                                                 placeholder="nombre de lenguaje"
                                                                 label_id={'admin.title.language'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'language_name')}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Nombre nativo de lenguaje">
                                                <TextInputCustom value={this.state.language_native_name}
                                                                 placeholder="nombre nativo de lenguaje"
                                                                 label_id={'admin.title.language'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'language_native_name')}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Imagen">
                                                <TextInputCustom value={this.state.image} placeholder="Imagen"
                                                                 label_id={'admin.title.image'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'image')}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Fecha UTC">
                                                <TextInputCustom value={this.state.date_utc}
                                                                 placeholder="nombre nativo de lenguaje"
                                                                 label_id={'admin.title.language'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'date_utc')}/>
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
