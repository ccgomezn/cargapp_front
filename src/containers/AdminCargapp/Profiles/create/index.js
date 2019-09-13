import React, {Component} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import {Row, Col} from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import {Form, DatePicker, Select} from "antd";
import PrimaryButton from "../../../../components/custom/button/primary"
import {Card} from 'antd';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import moment from 'moment';
import {postProfile} from '../../../../helpers/api/adminCalls.js';
import {getActiveDocumentTypes, getActiveUsers} from "../../../../helpers/api/adminCalls";
import TextInputCustom from "../../../../components/custom/input/text";
import SelectInputCustom from "../../../../components/custom/input/select";
import {transformInputData} from "../../../../helpers/utility";


const dateFormat = 'YYYY-MM-DD';

const {Option} = Select;

export default class ProfileCreate extends Component {


    constructor(props) {
        super();
        this.state = {
            redirect: false,
            birth_date: moment(),
        }
    }


    componentWillMount() {
        axios.all([getActiveUsers(), getActiveDocumentTypes()])
            .then((responses) => {

                this.setState({
                    users: responses[0].data,
                    document_types: responses[1].data,
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
        const document_id = transformInputData(this.state.document_id);
        const document_type_id = transformInputData(this.state.document_type_id);
        const user_id = transformInputData(this.state.user_id);
        formData.append('profile[firt_name]', this.state.first_name)
        formData.append('profile[last_name]', this.state.last_name)
        formData.append('profile[avatar]', this.state.avatar, this.state.avatar.name)
        formData.append('profile[phone]', this.state.phone)
        formData.append('profile[document_id]', document_id)
        formData.append('profile[document_type_id]', document_type_id)
        formData.append('profile[birth_date]', this.state.birth_date)
        formData.append('profile[user_id]', user_id)

        postProfile(formData).then(() => {
            this.setState({redirect: true})
        })
    }

    render() {
        const {rowStyle, colStyle} = basicStyle;
        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to='/admin/profiles'/>
        }
        return (

            <LayoutWrapper>


                <Row style={rowStyle} gutter={18} justify="start" block>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                <PageHeader>

                                    <h1>
                                        <IntlMessages id="profiles.title"/>

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
                                                <TextInputCustom value={this.state.first_name} placeholder="nombre"
                                                                 label_id={'admin.title.name'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'first_name')}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Apellido">
                                                <TextInputCustom value={this.state.last_name} placeholder="apellido"
                                                                 label_id={'admin.title.lastName'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'last_name')}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Foto">
                                                <input type="file"
                                                       onChange={(e) => this.handleChange(e.target.files[0], 'avatar')}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Número de telefóno">
                                                <TextInputCustom value={this.state.phone}
                                                                 placeholder="número de telefóno"
                                                                 label_id={'admin.title.phone'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'phone')}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Tipo de documento">
                                                <SelectInputCustom value={this.state.document_type_id}
                                                                   placeholder="tipo de documento"
                                                                   style={{width: '100%'}}
                                                                   onChange={(e) => {
                                                                       this.handleChange(e, 'document_type_id')
                                                                   }}
                                                                   options={this.state && this.state.document_types &&

                                                                   this.state.document_types.map((item) => {
                                                                       return <Option
                                                                           value={item.id}>{item.name}</Option>
                                                                   })
                                                                   }
                                                                   label_id={'admin.title.type'}>
                                                </SelectInputCustom>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Número de documento">
                                                <TextInputCustom value={this.state.document_id}
                                                                 placeholder="número de documento"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'document_id')}
                                                                 label_id={'admin.title.document'}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
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
                                        <Col span={12}>
                                            <Form.Item label="Fecha de nacimiento">
                                                {
                                                    this.state && this.state.birth_date &&
                                                    <DatePicker defaultValue={moment(this.state.birth_date, dateFormat)}
                                                                format={dateFormat}
                                                                onChange={(e) => this.handleChange(e, 'birth_date')}/>
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
