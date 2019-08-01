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
import { Select } from 'antd';
import httpAddr from "../../../../helpers/http_helper"

const { Option } = Select;
export default class RoleEdit extends Component {


  constructor(props) {
    super();
    this.state = {
      code: '',
      name: '',
      description: '',
      active: false,
      redirect: false
    }
  }
  componentWillMount() {
    console.log(this.props);
    axios.get(httpAddr + `/roles/`+this.props.match.params.id)
      .then((response) => {

        
        this.setState({
          code: response.data.code,
          name: response.data.name,
          description: response.data.description,
          active: response.data.active,
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
    axios.put(httpAddr + '/roles/' + this.props.match.params.id,
      {
        role: {
          name: this.state.name,
          code: this.state.code,
          description: this.state.description,
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
                      <Input value={this.state.name} onChange={(e) => this.handleChange(e.target.value, 'name')} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Codigo">
                      <Input value={this.state.code} onChange={(e) => this.handleChange(e.target.value, 'code')} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={10}>
                  <Col span={24}>
                    <Form.Item label="Descripción">
                      <Input value={this.state.description} onChange={(e) => this.handleChange(e.target.value, 'description')} />
                    </Form.Item>
                  </Col>

                </Row>
                <Row gutter={10}>
                  <Col span={24}>
                    <Form.Item label="Estado">
                      <Select value={this.state.active} style={{ width: 120 }} onChange={(e) => { this.handleChange(e, 'active')}}>
                        <Option value={true}>Activo</Option>
                        <Option value={false}>Desactivado</Option>
                  
                      </Select>
                    </Form.Item>
                  </Col>

                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item wrapperCol={{ span: 24 }}>
                      <PrimaryButton message_id={"general.edit"} style={{ width: '200px' }} onClick={() => this.handlePut()} />
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
