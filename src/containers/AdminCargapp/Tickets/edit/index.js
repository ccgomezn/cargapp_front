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
import {putTicket, getTicket, getUsers, getStatus} from '../../../../helpers/api/adminCalls.js';
import TextInputCustom from "../../../../components/custom/input/text";
import SelectInputCustom from "../../../../components/custom/input/select";
import importantVariables from "../../../../helpers/hashVariables";
import {transformInputData} from "../../../../helpers/utility";

const {Option} = Select;


export default class TicketEdit extends Component {


    constructor() {
        super();
        this.state = {
            redirect: false
        }
    }

    componentWillMount() {
        axios.all([getTicket(this.props.match.params.id), getUsers(), getStatus()])
            .then((responses) => {

                if (responses[0].data.active) {
                    responses[0].data.active = true;
                } else {
                    responses[0].data.active = false;
                }

                this.setState({
                    users: responses[1].data,
                    status: responses[2].data,
                    title: responses[0].data.title,
                    body: responses[0].data.body,
                    statu_id: responses[0].data.statu_id,
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
        const formData = new FormData();
        formData.append('ticket[title]', this.state.title);
        formData.append('ticket[body]', this.state.body);
        formData.append('ticket[statu_id]', transformInputData(this.state.statu_id));
        formData.append('ticket[user_id]', transformInputData(this.state.user_id));
        formData.append('ticket[active]', transformInputData(this.state.active));


        if (this.state.image != null) {
            formData.append('ticket[image]', this.state.image, this.state.media.image)
        }
        if (this.state.media != null) {
            formData.append('ticket[media]', this.state.media, this.state.media.name)
        }
        putTicket(this.props.match.params.id,
            formData).then(() => {
            this.setState({redirect: true})
        })
    }

    render() {
        const {rowStyle, colStyle} = basicStyle;
        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to='/admin/tickets'/>
        }
        return (

            <LayoutWrapper>


                <Row style={rowStyle} gutter={18} justify="start" block>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                <PageHeader>

                                    <h1>
                                        <IntlMessages id="tickets.title"/>

                                    </h1>
                                </PageHeader>
                            </Col>
                        </Row>
                        <Row>
                            <Card className="cardContent" style={{marginTop: '50px'}}>
                                <Form>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Titulo">
                                                <TextInputCustom value={this.state.title} placeholder="titulo"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'title')}
                                                                 label_id={'admin.title.title'}
                                                                 required/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Cuerpo">
                                                <TextInputCustom value={this.state.body} placeholder="cuerpo"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'body')}
                                                                 required
                                                                 label_id={'admin.title.body'}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Imagen">
                                                <input type="file"
                                                       onChange={(e) => this.handleChange(e.target.files[0], 'image')}/>

                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Media">
                                                <input type="file"
                                                       onChange={(e) => this.handleChange(e.target.files[0], 'media')}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Status">
                                                <SelectInputCustom value={this.state.statu_id} placeholder="status"
                                                                   style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'statu_id')
                                                }}
                                                                   options={this.state && this.state.status &&

                                                                   this.state.status.map((item) => {
                                                                       return <Option
                                                                           value={item.id}>{item.name}</Option>
                                                                   })
                                                                   }
                                                                   label_id={'admin.title.status'}>

                                                </SelectInputCustom>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Usuarios">
                                                <SelectInputCustom value={this.state.user_id} placeholder="usuarios"
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
