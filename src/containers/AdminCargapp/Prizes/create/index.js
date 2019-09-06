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
import {postPrize} from '../../../../helpers/api/adminCalls.js';
import {getActiveUsers} from "../../../../helpers/api/adminCalls";

const dateFormat = 'YYYY-MM-DD';

const {Option} = Select

export default class PrizeCreate extends Component {


    constructor() {
        super();
        this.state = {
            redirect: false
        }
    }


    componentWillMount() {
        axios.all([getActiveUsers()])
            .then((responses) => {

                this.setState({
                    users: responses[0].data,
                    expire_date: moment(),
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
        formData.append('prize[name]', this.state.name)
        formData.append('prize[code]', this.state.code)
        formData.append('prize[image]', this.state.image, this.state.image.name)
        formData.append('prize[media]', this.state.media, this.state.media.name)
        formData.append('prize[point]', this.state.point)
        formData.append('prize[description]', this.state.description)
        formData.append('prize[body]', this.state.body)
        formData.append('prize[user_id]', this.state.user_id)
        formData.append('prize[expire_date]', this.state.expire_date)
        formData.append('prize[active]', true)
        postPrize(
            formData).then(() => {
            this.setState({redirect: true})
        })
    }

    render() {
        const {rowStyle, colStyle} = basicStyle;
        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to='/admin/prizes'/>
        }
        return (

            <LayoutWrapper>


                <Row style={rowStyle} gutter={18} justify="start" block>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                <PageHeader>

                                    <h1>
                                        <IntlMessages id="prizes.title"/>

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
                                            <Form.Item label="Codigo">
                                                <Input value={this.state.code} placeholder="codigo"
                                                       onChange={(e) => this.handleChange(e.target.value, 'code')}
                                                       required/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Puntos">
                                                <Input type="number" value={this.state.point} placeholder="puntos"
                                                       onChange={(e) => this.handleChange(e.target.value, 'point')}
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
                                            <Form.Item label="Cuerpo">
                                                <Input value={this.state.body} placeholder="cuerpo"
                                                       onChange={(e) => this.handleChange(e.target.value, 'body')}
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

                                        <Col span={24}>
                                            <Form.Item label="Media">
                                                <input type="file"
                                                       onChange={(e) => this.handleChange(e.target.files[0], 'media')}/>

                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
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
                                        <Col span={12}>
                                            <Form.Item label="Fecha de expiración">
                                                {
                                                    this.state && this.state.expire_date &&
                                                    <DatePicker
                                                        defaultValue={moment(this.state.expire_date, dateFormat)}
                                                        format={dateFormat}
                                                        onChange={(e) => this.handleChange(e, 'expire_date')}/>
                                                }
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
