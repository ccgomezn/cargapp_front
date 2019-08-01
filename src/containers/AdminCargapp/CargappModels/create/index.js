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

export default class CargappModelCreate extends Component {


  constructor(props) {
    super();
    this.state = {
      code: '',
      name: '',
      description: '',
      value: '',
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
    axios.post(httpAddr + '/cargapp_models',
      {
        cargapp_model: {
          name: this.state.name,
          code: this.state.code,
          description: this.state.description,
          value: this.state.value,
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
      return <Redirect to='/dashboard/admin/cargapp_models' />
    }
    return (
      
      <LayoutWrapper>


        <Row style={rowStyle} gutter={18} justify="start" block>
          <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
            <Row>
              <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                <PageHeader>

                  <h1>
                    <IntlMessages id="cargappModel.title" />

                  </h1>
                </PageHeader>
              </Col>
            </Row>
            <Row>
              <Card className="cardContent" style={{ marginTop: '50px' }}>
                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Nombre">
                      <Input value={this.state.name} onChange={(e) => this.handleChange(e, 'name')} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Codigo">
                      <Input value={this.state.code} onChange={(e) => this.handleChange(e, 'code')} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Valor">
                      <Input value={this.state.value} onChange={(e) => this.handleChange(e, 'value')} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Descripción">
                      <Input value={this.state.description} onChange={(e) => this.handleChange(e, 'description')} />
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
