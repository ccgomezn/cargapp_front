import React, { Component } from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import { Row, Col, DatePicker } from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import { Form, Upload, Button, Icon } from "antd";
import PrimaryButton from "../../../../components/custom/button/primary"
import { Card } from 'antd';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import { Select, Input } from 'antd';
import httpAddr from "../../../../helpers/http_helper"
import moment from 'moment';
const dateFormat = 'YYYY-MM-DD';
const { Option } = Select;


export default class DocumentEdit extends Component {


  constructor(props) {
    super();
    this.state = {
      redirect: false
    }
  }

  getMainData() {
    return axios.get(httpAddr + `/documents/` + this.props.match.params.id)
  }

  getUsers() {
    return axios.get(httpAddr + `/users`);
  }

  getStatus() {
    return axios.get(httpAddr + `/status`);
  }


  componentWillMount() {
    axios.all([this.getMainData(), this.getUsers(), this.getStatus()])
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
          image: responses[0].data.image,
          media: responses[0].data.media,
          status_id: responses[0].data.statu_id,
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
    axios.put(httpAddr + '/documents/' + this.props.match.params.id,
      {
        document: {
          document_id: this.state.document_id,
          document_type_id: this.state.document_type_id,
          file: this.state.file,
          statu_id: this.state.statu_id,
          user_id: this.state.user_id,
          expire_date: this.state.expire_date,
          approved: this.state.approved,
          active: this.state.active,
        }
      }).then(() => {
        this.setState({ redirect: true })
      })
  }

  render() {
    const { rowStyle, colStyle } = basicStyle;
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/dashboard/admin/tickets' />
    }
    return (

      <LayoutWrapper>


        <Row style={rowStyle} gutter={18} justify="start" block>
          <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
            <Row>
              <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                <PageHeader>

                  <h1>
                    <IntlMessages id="tickets.title" />

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
                    <Col span={24}>
                      <Form.Item label="Estado">
                        <Select required value={this.state.active} placeholder="estado" style={{ width: 120 }} onChange={(e) => { this.handleChange(e, 'active') }}>
                          <Option value={true}>Activo</Option>
                          <Option value={false}>Desactivado</Option>

                        </Select>
                      </Form.Item>
                    </Col>

                  </Row>
                  <Row>
                    <Col span={24}>
                      <Form.Item wrapperCol={{ span: 24 }}>
                        <PrimaryButton htmlType={"submit"} message_id={"general.edit"} style={{ width: '200px' }} onClick={() => this.handlePut()} />
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
