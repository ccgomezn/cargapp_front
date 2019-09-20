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
import {getCountry, putCountry} from "../../../../helpers/api/adminCalls"
import TextInputCustom from "../../../../components/custom/input/text";
import SelectInputCustom from "../../../../components/custom/input/select";
import importantVariables from "../../../../helpers/hashVariables";

const {Option} = Select;
export default class CountryEdit extends Component {


    constructor(props) {
        super();
        this.state = {
            redirect: false
        }
    }


    componentWillMount() {
        axios.all([getCountry(this.props.match.params.id)])
            .then((responses) => {

                if (responses[0].data.active) {
                    responses[0].data.active = true;
                } else {
                    responses[0].data.active = false;
                }
                this.setState({
                    name: responses[0].data.name,
                    code: responses[0].data.code,
                    description: responses[0].data.description,
                    cioc: responses[0].data.cioc,
                    currency_code: responses[0].data.currency_code,
                    currency_name: responses[0].data.currency_name,
                    currency_symbol: responses[0].data.currency_symbol,
                    language_iso639: responses[0].data.language_iso639,
                    language_name: responses[0].data.language_name,
                    language_native_name: responses[0].data.language_native_name,
                    image: responses[0].data.image,
                    date_utc: responses[0].data.date_utc,
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
        const active = this.state.active !== undefined && this.state.active.key !== undefined ? this.state.active.key : this.state.active;
        putCountry(this.props.match.params.id,
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
                                                                 label_id={'admin.title.language'}
                                                                 placeholder="nombre nativo de lenguaje"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'date_utc')}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Estado">
                                                <SelectInputCustom required value={this.state.active}
                                                                   placeholder="estado"
                                                                   style={{width: 120}} onChange={(e) => {
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
