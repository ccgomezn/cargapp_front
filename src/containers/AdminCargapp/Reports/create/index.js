import React, {Component} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import {Row, Col, Form, Input, Card, Select, DatePicker} from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import PrimaryButton from "../../../../components/custom/button/primary"
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import moment from 'moment';
import {getUsers, postReport, findParameters} from '../../../../helpers/api/adminCalls.js';

const dateFormat = 'YYYY-MM-DD';

const {Option} = Select;

export default class ReportCreate extends Component {


    constructor() {
        super();
        this.state = {
            redirect: false
        }
    }


    componentWillMount() {
        axios.all([getUsers(), findParameters('REPORT_TYPES')])
            .then((responses) => {
                this.setState({
                    users: responses[0].data,
                    report_types: responses[1].data.parameters,
                    start_date: moment(),
                    end_date: moment(),
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
        formData.append('report[name]', this.state.name);
        formData.append('report[origin]', this.state.origin);
        formData.append('report[destination]', this.state.destination);
        formData.append('report[cause]', this.state.cause);
        formData.append('report[sense]', this.state.sense);
        formData.append('report[novelty]', this.state.novelty);
        formData.append('report[geolocation]', this.state.geolocation);
        formData.append('report[image]', this.state.image, this.state.image.name);
        formData.append('report[start_date]', this.state.start_date);
        formData.append('report[end_date]', this.state.end_date);
        formData.append('report[report_type]', this.state.report_type);
        formData.append('report[user_id]', this.state.user_id);
        formData.append('report[active]', true);
        postReport(
            formData).then(() => {
            this.setState({redirect: true})
        })
    }

    render() {
        const {rowStyle, colStyle} = basicStyle;
        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to='/admin/reports'/>
        }
        return (

            <LayoutWrapper>


                <Row style={rowStyle} gutter={18} justify="start" block>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                <PageHeader>

                                    <h1>
                                        <IntlMessages id="reports.title"/>

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
                                            <Form.Item label="Origen">
                                                <Input value={this.state.origin} placeholder="origen"
                                                       onChange={(e) => this.handleChange(e.target.value, 'origin')}
                                                       required/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Destino">
                                                <Input value={this.state.destination} placeholder="destino"
                                                       onChange={(e) => this.handleChange(e.target.value, 'destination')}
                                                       required/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Causa">
                                                <Input value={this.state.cause} placeholder="causa"
                                                       onChange={(e) => this.handleChange(e.target.value, 'cause')}
                                                       required/>

                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Sentido">
                                                <Input value={this.state.sense} placeholder="Sentido"
                                                       onChange={(e) => this.handleChange(e.target.value, 'sense')}
                                                       required/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Gravedad">
                                                <Input value={this.state.novelty} placeholder="gravedad"
                                                       onChange={(e) => this.handleChange(e.target.value, 'novelty')}
                                                       required/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>

                                        <Col span={12}>
                                            <Form.Item label="Geolocalización">
                                                <Input value={this.state.geolocation} placeholder="geolocalización"
                                                       onChange={(e) => this.handleChange(e.target.value, 'geolocation')}
                                                       required/>
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
                                            <Form.Item label="Fecha de inicio">
                                                {
                                                    this.state && this.state.start_date &&
                                                    <DatePicker defaultValue={moment(this.state.start_date, dateFormat)}
                                                                format={dateFormat}
                                                                onChange={(e) => this.handleChange(e, 'start_date')}/>
                                                }
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Fecha de fin">
                                                {
                                                    this.state && this.state.end_date &&
                                                    <DatePicker defaultValue={moment(this.state.end_date, dateFormat)}
                                                                format={dateFormat}
                                                                onChange={(e) => this.handleChange(e, 'end_date')}/>
                                                }
                                            </Form.Item>
                                        </Col>

                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Tipo de reporte">
                                                <Select value={this.state.report_type} placeholder="tipo de reporte"
                                                        style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'report_type')
                                                }}>
                                                    {this.state && this.state.report_types &&

                                                    this.state.report_types.map((item) => {
                                                        return <Option value={item.code}>{item.name}</Option>
                                                    })
                                                    }
                                                </Select>
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
