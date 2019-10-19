import React, {Component} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import {Row, Col, Form, Card, Select} from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import PrimaryButton from "../../../../components/custom/button/primary"
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import {postServiceDocument} from '../../../../helpers/api/adminCalls.js';
import {getMineUser, getMineServices} from "../../../../helpers/api/adminCalls";
import TextInputCustom from "../../../../components/custom/input/text";
import SelectInputCustom from "../../../../components/custom/input/select";
import {transformInputData} from "../../../../helpers/utility";
import SecondaryButton from "../../../../components/custom/button/secondary";


const {Option} = Select;

export default class ServiceDocumentCreate extends Component {


    constructor() {
        super();
        this.state = {
            redirect: false
        }
    }


    componentWillMount() {
        const service_id = this.props.match.params.id;
        axios.all([getMineUser(), getMineServices(),])
            .then((responses) => {
                this.setState({
                    user_id: responses[0].data.user.id,
                    services: responses[1].data,
                });

            });
        if (service_id) {
            this.setState({service_id: service_id})
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

        const formData = new FormData();

        formData.append('service_document[name]', this.state.name);
        formData.append('service_document[document_type]', this.state.document_type);
        formData.append('service_document[document]', this.state.document, this.state.document.name);
        formData.append('service_document[service_id]', transformInputData(this.state.service_id));
        formData.append('service_document[user_id]', this.state.user_id);
        formData.append('service_document[active]', true);
        postServiceDocument(
            formData).then(() => {
            this.setState({redirect: true})
        })
    }

    render() {
        const {rowStyle, colStyle} = basicStyle;
        const {redirect} = this.state;
        const {generator} = this.props;
        const {id} = this.props.match.params;
        if (redirect) {
            if (generator) {
                return <Redirect to='/generator/service_documents'/>
            } else {
                return <Redirect to='/admin/service_documents'/>
            }
        }
        return (

            <LayoutWrapper>


                <Row style={rowStyle} gutter={18} justify="start" block>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                <PageHeader>

                                    <h1>
                                        <IntlMessages id="serviceDocuments.title"/>

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
                                            <Form.Item label="Tipo de documento">
                                                <TextInputCustom value={this.state.document_type}
                                                                 placeholder="tipo de documento"
                                                                 label_id={'admin.title.type'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'document_type')}
                                                                 required/>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={10}>
                                        {!id && <Col span={12}>
                                            <Form.Item label="Servicio">
                                                <SelectInputCustom value={this.state.service_id} placeholder="servicoi"
                                                                   style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'service_id')
                                                }}
                                                                   options={this.state && this.state.services &&

                                                                   this.state.services.map((item) => {
                                                                       return <Option
                                                                           value={item.id}>{item.name}</Option>
                                                                   })
                                                                   }
                                                                   label_id={'admin.title.service'}>

                                                </SelectInputCustom>
                                            </Form.Item>
                                        </Col>}
                                        <Col span={12}>
                                            <Form.Item label="Documento">
                                                <div style={{position: 'relative', width: '100%'}}>
                                                    <input type="file"
                                                           id="contained-button-file"
                                                           onChange={(e) => this.handleChange(e.target.files[0], 'document')}
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
                                                        width: '100%',
                                                        zIndex: 1,
                                                        marginTop: '3px',
                                                    }}>
                                                        <SecondaryButton message_id={'widget.load'}
                                                                         style={{width: '200px'}}/>
                                                        {this.state.document && this.state.document.name}
                                                    </label>
                                                </div>
                                            </Form.Item>
                                        </Col>

                                    </Row>


                                    <Row>
                                        <Col span={24}>
                                            <Form.Item wrapperCol={{span: 24}}>
                                                <PrimaryButton htmlType={"submit"} message_id={"general.add"}
                                                               style={{width: '200px', marginTop: '20px'}}
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
