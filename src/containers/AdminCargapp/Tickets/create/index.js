import React, { Component } from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import { Row, Col, Form, Input, Card, Select } from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import PrimaryButton from "../../../../components/custom/button/primary"
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import httpAddr from "../../../../helpers/http_helper"

const { Option } = Select

export default class TicketCreate extends Component {


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
  
  componentWillMount() {
    axios.all([this.getUsers(), this.getStatus()])
      .then((responses) => {

        this.setState({
          users: responses[0].data,
          status: responses[1].data,
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
    formData.append('ticket[title]', this.state.title)
    formData.append('ticket[body]', this.state.body)
    formData.append('ticket[image]', this.state.image, this.state.media.image)
    formData.append('ticket[media]', this.state.media, this.state.media.name)
    formData.append('ticket[statu_id]', this.state.statu_id)
    formData.append('ticket[user_id]', this.state.user_id)
    formData.append('ticket[active]', true)

    axios.post(httpAddr + '/tickets',
      formData
      ).then(() => {
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
                    <Form.Item label="Titulo">
                      <Input value={this.state.title} placeholder="titulo" onChange={(e) => this.handleChange(e.target.value, 'title')} required />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Cuerpo">
                      <Input value={this.state.body} placeholder="cuerpo" onChange={(e) => this.handleChange(e.target.value, 'body')} required />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Imagen">
                      <input type="file" onChange={(e) => this.handleChange(e.target.files[0], 'image')} />

                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Media">
                      <input type="file" onChange={(e) => this.handleChange(e.target.files[0], 'media')} />
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
                    <Form.Item label="Usuarios">
                      <Select value={this.state.user_id} placeholder="usuarios" style={{ width: '100%' }} onChange={(e) => { this.handleChange(e, 'user_id') }} >
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
