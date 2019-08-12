import React, { Component } from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import { Row, Col, DatePicker, Form, Input, Card, Select, Upload, Button, Icon, Checkbox } from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import PrimaryButton from "../../../../components/custom/button/primary"
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import httpAddr from "../../../../helpers/http_helper"
import moment from 'moment';
const dateFormat = 'YYYY-MM-DD';

const { Option } = Select

export default class DocumentCreate extends Component {


  constructor(props) {
    super();
    this.state = {
      redirect: false
    }
  }
  getUsers() {
    return axios.get(httpAddr + `/users`);
  }

  getStatus() {
    return axios.get(httpAddr + `/status`);
  }

  getDocumentTypes() {
    return axios.get(httpAddr + `/document_types`);
  }



  componentWillMount() {
    axios.all([this.getUsers(), this.getStatus(), this.getDocumentTypes()])
      .then((responses) => {

        this.setState({
          users: responses[0].data,
          status: responses[1].data,
          documentTypes: responses[2].data,
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
   
    axios.post(httpAddr + '/documents',
      {
        document: {
          document_id: this.state.document_id,
          document_type_id: this.state.document_type_id,
          file: this.state.file,
          statu_id: this.state.statu_id,
          user_id: this.state.user_id,
          expire_date: this.state.expire_date,
          approved: this.state.approved,
          active: true,
        }

      }).then(() => {
        this.setState({ redirect: true })
      })
  }

  render() {
    const { rowStyle, colStyle } = basicStyle;
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/dashboard/admin/documents' />
    }
    return (

      <LayoutWrapper>


        <Row style={rowStyle} gutter={18} justify="start" block>
          <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
            <Row>
              <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                <PageHeader>

                  <h1>
                    <IntlMessages id="documents.title" />

                  </h1>
                </PageHeader>
              </Col>
            </Row>
            <Row>
              <Card className="cardContent" style={{ marginTop: '50px' }}>
                <Form>

                  <Row gutter={10}>
                    <Col span={12}>
                      <Form.Item label="Id de documento">
                        <Input value={this.state.document_id} placeholder="id de documento" onChange={(e) => this.handleChange(e.target.value, 'document_id')} required />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Tipo de documento">
                        <Select value={this.state.document_type_id} placeholder="tipo de documento" style={{ width: '100%' }} onChange={(e) => { this.handleChange(e, 'document_type_id') }} >
                          {this.state && this.state.document_types &&

                            this.state.document_types.map((item) => {
                              return <Option value={item.id}>{item.name}</Option>
                            })
                          }
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col span={12}>
                      <Form.Item label="Documento">
                        <Upload>
                          <Button>
                            <Icon type="upload" /><IntlMessages id="general.upload" />
                          </Button>
                        </Upload>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Usuario">
                        <Select value={this.state.user_id} placeholder="usuario" style={{ width: '100%' }} onChange={(e) => { this.handleChange(e, 'user_id') }} >
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
                      <Form.Item label="Status">
                        <Select value={this.state.statu_id} placeholder="status" style={{ width: '100%' }} onChange={(e) => { this.handleChange(e, 'statu_id') }} >
                          {this.state && this.state.status &&

                            this.state.status.map((item) => {
                              return <Option value={item.id}>{item.name}</Option>
                            })
                          }
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Fecha de expiración">
                        {
                          this.state && this.state.expire_date &&
                          <DatePicker defaultValue={moment(this.state.expire_date, dateFormat)} format={dateFormat} onChange={(e) => this.handleChange(e, 'expire_date')} />
                        }
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col span={12}>
                      <Checkbox value={this.state.approved} onChange={(e) => this.handleChange(e.target.checked, 'approved')}>Estado de aprobación</Checkbox>
                    </Col>
                    
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Form.Item wrapperCol={{ span: 24 }}>
                        <PrimaryButton htmlType={"submit"} message_id={"general.add"} style={{ width: '200px' }} onClick={() => this.handlePost()} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Card>


            </Row>

          </Col>
        </Row>




      </LayoutWrapper >
    );
  }
}
