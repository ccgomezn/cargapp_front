import React, {Component} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import {Row, Col, DatePicker, Form, Input, Card, Select} from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import PrimaryButton from "../../../../components/custom/button/primary"
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import moment from 'moment';
import {
    postCompany,
    getActiveUsers,
    getActiveLoadTypes
} from "../../../../helpers/api/adminCalls"

const dateFormat = 'YYYY-MM-DD';

const {Option} = Select

export default class CompanyCreate extends Component {


    constructor(props) {
        super();
        this.state = {
            redirect: false
        }
    }


    componentWillMount() {
        axios.all([getActiveUsers(), getActiveLoadTypes()])
            .then((responses) => {

                this.setState({
                    users: responses[0].data,
                    load_types: responses[1].data,
                    constitution_date: moment(),
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
        postCompany(
            {
                company: {
                    name: this.state.name,
                    description: this.state.description,
                    company_type: this.state.company_type,
                    load_type_id: this.state.load_type_id,
                    sector: this.state.sector,
                    legal_representative: this.state.legal_representative,
                    address: this.state.address,
                    phone: this.state.phone,
                    user_id: this.state.user_id,
                    constitution_date: this.state.constitution_date,
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
            return <Redirect to='/admin/companies'/>
        }
        return (

            <LayoutWrapper>


                <Row style={rowStyle} gutter={18} justify="start" block>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                <PageHeader>

                                    <h1>
                                        <IntlMessages id="companies.title"/>

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
                                            <Form.Item label="Descripción">
                                                <Input value={this.state.description} placeholder="descripción"
                                                       onChange={(e) => this.handleChange(e.target.value, 'description')}
                                                       required/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Tipo de compañia">

                                                <Input value={this.state.company_type} placeholder="tipo de compañia"
                                                       onChange={(e) => this.handleChange(e.target.value, 'company_type')}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Sector">

                                                <Input value={this.state.sector} placeholder="sector"
                                                       onChange={(e) => this.handleChange(e.target.value, 'sector')}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Representante legal">
                                                <Input value={this.state.legal_representative}
                                                       placeholder="representante legal"
                                                       onChange={(e) => this.handleChange(e.target.value, 'legal_representative')}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Usuarios">
                                                <Select value={this.state.user_id} placeholder="usuarios"
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
                                        <Col span={12}>
                                            <Form.Item label="Teléfono">
                                                <Input value={this.state.phone} placeholder="teléfono"
                                                       onChange={(e) => this.handleChange(e.target.value, 'phone')}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Fecha de constitución">
                                                {
                                                    this.state && this.state.constitution_date &&
                                                    <DatePicker
                                                        defaultValue={moment(this.state.constitution_date, dateFormat)}
                                                        format={dateFormat}
                                                        onChange={(e) => this.handleChange(e, 'constitution_date')}/>
                                                }

                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Tipo de carga">
                                                <Select value={this.state.load_type_id} placeholder="tipo de carga"
                                                        style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'load_type_id')
                                                }}>
                                                    {this.state && this.state.load_types &&

                                                    this.state.load_types.map((item) => {
                                                        return <Option value={item.id}>{item.name}</Option>
                                                    })
                                                    }
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Dirección">
                                                <Input value={this.state.address} placeholder="dirección"
                                                       onChange={(e) => this.handleChange(e.target.value, 'address')}/>
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
