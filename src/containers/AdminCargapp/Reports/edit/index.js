import React, {Component} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import {Row, Col, DatePicker} from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import {Form} from "antd";
import PrimaryButton from "../../../../components/custom/button/primary"
import {Card} from 'antd';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import {Select, Input} from 'antd';
import moment from 'moment';
import {putReport, getReport, getUsers, findParameters} from '../../../../helpers/api/adminCalls.js';
import TextInputCustom from "../../../../components/custom/input/text";
import SelectInputCustom from "../../../../components/custom/input/select";
import importantVariables from "../../../../helpers/hashVariables";
import {transformInputData} from "../../../../helpers/utility";


const dateFormat = 'YYYY-MM-DD';
const {Option} = Select;


export default class ReportEdit extends Component {


    constructor(props) {
        super();
        this.state = {
            redirect: false
        }
    }


    componentWillMount() {
        axios.all([getReport(this.props.match.params.id), getUsers(), findParameters('REPORT_TYPES')])
            .then((responses) => {
                this.setState({
                    report_types: responses[2].data.parameters,
                    users: responses[1].data,
                    name: responses[0].data.name,
                    origin: responses[0].data.origin,
                    destination: responses[0].data.destination,
                    cause: responses[0].data.cause,
                    sense: responses[0].data.sense,
                    novelty: responses[0].data.novelty,
                    geolocation: responses[0].data.geolocation,
                    start_date: responses[0].data.start_date,
                    end_date: responses[0].data.end_date,
                    report_type: responses[0].data.report_type,
                    user_id: responses[0].data.user_id,
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
        const user_id = transformInputData(this.state.user_id);
        const report_type = transformInputData(this.state.report_type);
        const active = transformInputData(this.state.active);
        const formData = new FormData();
        formData.append('report[name]', this.state.name);
        formData.append('report[origin]', this.state.origin);
        formData.append('report[destination]', this.state.destination);
        formData.append('report[cause]', this.state.cause);
        formData.append('report[sense]', this.state.sense);
        formData.append('report[novelty]', this.state.novelty);
        formData.append('report[geolocation]', this.state.geolocation);
        if (this.state.image) {
            formData.append('report[image]', this.state.image, this.state.image.name);
        }
        formData.append('report[start_date]', this.state.start_date);
        formData.append('report[end_date]', this.state.end_date);
        formData.append('report[report_type]', report_type);
        formData.append('report[user_id]', user_id);
        formData.append('report[active]', active);
        putReport(this.props.match.params.id,
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
                                                <TextInputCustom value={this.state.name} placeholder="nombre"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'name')}
                                                                 label_id={'admin.title.name'}
                                                                 required/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Origen">
                                                <TextInputCustom value={this.state.origin} placeholder="origen"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'origin')}
                                                                 label_id={'admin.title.origin'}
                                                                 required/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Destino">
                                                <TextInputCustom value={this.state.destination} placeholder="destino"
                                                                 label_id={'admin.title.destination'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'destination')}
                                                                 required/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Causa">
                                                <TextInputCustom value={this.state.cause} placeholder="causa"
                                                                 label_id={'admin.title.cause'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'cause')}
                                                                 required/>

                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Sentido">
                                                <TextInputCustom value={this.state.sense} placeholder="Sentido"
                                                                 label_id={'admin.title.sense'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'sense')}
                                                                 required/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Gravedad">
                                                <TextInputCustom value={this.state.novelty} placeholder="gravedad"
                                                                 label_id={'admin.title.strength'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'novelty')}
                                                                 required/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>

                                        <Col span={12}>
                                            <Form.Item label="Geolocalización">
                                                <TextInputCustom value={this.state.geolocation}
                                                                 placeholder="geolocalización"
                                                                 label_id={'admin.title.geo'}
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
                                                <SelectInputCustom value={this.state.report_type}
                                                                   placeholder="tipo de reporte"
                                                                   style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'report_type')
                                                }}
                                                                   options={this.state && this.state.report_types &&

                                                                   this.state.report_types.map((item) => {
                                                                       return <Option
                                                                           value={item.code}>{item.name}</Option>
                                                                   })
                                                                   }
                                                                   label_id={'admin.title.type'}>

                                                </SelectInputCustom>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Usuario">
                                                <SelectInputCustom value={this.state.user_id} placeholder="usuario"
                                                                   style={{width: '100%'}} onChange={(e) => {
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
