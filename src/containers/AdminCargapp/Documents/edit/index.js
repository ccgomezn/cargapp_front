import React, {Component} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import {Row, Col, DatePicker} from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import {Form, Checkbox} from "antd";
import PrimaryButton from "../../../../components/custom/button/primary"
import {Card} from 'antd';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import {Select} from 'antd';
import moment from 'moment';
import {
    getDocument,
    getUsers,
    getStatus,
    getDocumentTypes,
    putDocument
} from "../../../../helpers/api/adminCalls"
import TextInputCustom from "../../../../components/custom/input/text";
import SelectInputCustom from "../../../../components/custom/input/select";
import importantVariables from "../../../../helpers/hashVariables";

const dateFormat = 'YYYY-MM-DD';
const {Option} = Select;


export default class DocumentEdit extends Component {


    constructor(props) {
        super();
        this.state = {
            redirect: false
        }
    }

    componentWillMount() {
        axios.all([getDocument(this.props.match.params.id), getUsers(), getStatus(), getDocumentTypes()])
            .then((responses) => {

                if (responses[0].data.active) {
                    responses[0].data.active = true;
                } else {
                    responses[0].data.active = false;
                }

                this.setState({
                    users: responses[1].data,
                    status: responses[2].data,
                    document_types: responses[3].data,
                    document_id: responses[0].data.document_id,
                    document_type_id: responses[0].data.document_type_id,
                    expire_date: responses[0].data.expire_date,
                    statu_id: responses[0].data.statu_id,
                    active: responses[0].data.active,
                    approved: responses[0].data.approved,
                    user_id: responses[0].data.user_id,
                })
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
        const user_id = this.state.user_id !== undefined && this.state.user_id.key !== undefined ? this.state.user_id.key : this.state.user_id;
        const statu_id = this.state.statu_id !== undefined && this.state.statu_id.key !== undefined ? this.state.statu_id.key : this.state.statu_id;
        const document_type_id = this.state.document_type_id !== undefined && this.state.document_type_id.key !== undefined ? this.state.document_type_id.key : this.state.document_type_id;
        const active = this.state.active !== undefined && this.state.active.key !== undefined ? this.state.active.key : this.state.active;
        const formData = new FormData();
        formData.append('document[document_id]', this.state.document_id);
        formData.append('document[document_type_id]', document_type_id);
        if (this.state.file != null) {
            formData.append('document[file]', this.state.file, this.state.file.name);

        }
        formData.append('document[statu_id]', statu_id);
        formData.append('document[user_id]', user_id);
        formData.append('document[expire_date]', this.state.expire_date);
        formData.append('document[approved]', this.state.approved);
        formData.append('document[active]', active);

        putDocument(this.props.match.params.id,
            formData).then(() => {
            this.setState({redirect: true})
        })
    }

    render() {
        const {rowStyle, colStyle} = basicStyle;
        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to='/admin/documents'/>
        }
        return (

            <LayoutWrapper>


                <Row style={rowStyle} gutter={18} justify="start" block>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                <PageHeader>

                                    <h1>
                                        <IntlMessages id="documents.title"/>

                                    </h1>
                                </PageHeader>
                            </Col>
                        </Row>
                        <Row>
                            <Card className="cardContent" style={{marginTop: '50px'}}>
                                <Form>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Id de documento">
                                                <TextInputCustom value={this.state.document_id}
                                                                 placeholder="id de documento"
                                                                 label_id={'admin.title.document'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'document_id')}
                                                                 required/>
                                            </Form.Item>
                                        </Col>
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
                                                                   label_id={'admin.title.document'}>

                                                </SelectInputCustom>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Documento">
                                                <div style={{position: 'relative'}}>
                                                    <input type="file"
                                                           id="contained-button-file"
                                                           onChange={(e) => this.handleChange(e.target.files[0], 'file')}
                                                           style={{
                                                               position: 'relative',
                                                               textAlign: 'right',
                                                               opacity: 0,
                                                               zIndex: 2
                                                           }}/>
                                                    <label htmlFor="contained-button-file" style={{
                                                        position: 'absolute',
                                                        top: '0px',
                                                        left: '0px',
                                                        zIndex: 1
                                                    }}>
                                                        <PrimaryButton message_id={'widget.load'}/>
                                                        {this.state.file && this.state.file.name}
                                                    </label>
                                                </div>
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
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Checkbox checked={this.state.approved}
                                                      onChange={(e) => this.handleChange(e.target.checked, 'approved')}>Estado
                                                de aprobación</Checkbox>
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
