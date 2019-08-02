import React, { Component } from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import { Row, Col } from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import { Form, Input } from "antd";
import PrimaryButton from "../../../../components/custom/button/primary"
import { Card } from 'antd';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import httpAddr from "../../../../helpers/http_helper"


export default class RoleCreate extends Component {


  constructor(props) {
    super();
    this.state = {
      code: '',
      name: '',
      description: '',
      redirect: false
    }
  }

  handleChange(e, type) {

    this.setState(
      {
        [type]: e.target.value
      }
    )
  }
  handlePost() {
    axios.post(httpAddr + '/roles',
      {
        role: {
          name: this.state.name,
          code: this.state.code,
          description: this.state.description,
          active: true,
        }

      }).then(() => {
        this.setState({redirect: true})
      })
  }

  render() {
    const { rowStyle, colStyle } = basicStyle;
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/dashboard/admin/roles' />
    }
    return (
      
      <LayoutWrapper>


        <Row style={rowStyle} gutter={18} justify="start" block>
          <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
            <Row>
              <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                <PageHeader>

                  <h1>
                    <IntlMessages id="roles.title" />

                  </h1>
                </PageHeader>
              </Col>
            </Row>
            <Row>
              <Card className="cardContent" style={{ marginTop: '50px' }}>
                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Nombre">
                      <Input value={this.state.name} placeholder="nombre" onChange={(e) => this.handleChange(e, 'name')} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Codigo">
                      <Input value={this.state.code} placeholder="código" onChange={(e) => this.handleChange(e, 'code')} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={10}>
                  <Col span={24}>
                    <Form.Item label="Descripción">
                      <Input value={this.state.description} placeholder="descripción" onChange={(e) => this.handleChange(e, 'description')} />
                    </Form.Item>
                  </Col>

                </Row>

                <Row>
                  <Col span={24}>
                    <Form.Item wrapperCol={{ span: 24 }}>
                      <PrimaryButton message_id={"general.add"} style={{ width: '200px' }} onClick={() => this.handlePost()} />
                    </Form.Item>
                  </Col>
                </Row>

              </Card>


            </Row>

          </Col>
        </Row>




      </LayoutWrapper>
    );
  }
}
