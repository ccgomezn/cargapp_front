import React, { Component } from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import { Row, Col } from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import { Form } from "antd";
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
      redirect: false
    }
  }

  getMainData() {
    return axios.get(httpAddr + `/user_roles/` + this.props.match.params.id)
  }
  getUsers() {
    return axios.get(httpAddr + `/users`);
  }

  getRoles() {
    return axios.get(httpAddr + `/roles`);
  }
  componentWillMount() {
    console.log(this.props);
    axios.all([this.getMainData(), this.getUsers(), this.getRoles()])
      .then((responses) => {


        this.setState({
          users: responses[1].data,
          roles: responses[2].data,
          user_id: responses[0].data.user_id,
          role_id: responses[0].data.role_id,
          active: responses[0].data.active,
        });
      }).catch(error => {
        let errorObject = JSON.parse(JSON.stringify(error));

        message.warning(errorObject.message);
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
    axios.put(httpAddr + '/user_roles/' + this.props.match.params.id,
      {
        user_role: {
          user_id: this.state.user_id,
          role_id: this.state.role_id,
          admin_id: 1,
          active: this.state.active,
        }

      }).then(() => {
        this.setState({ redirect: true })
      }).catch(error => {
        let errorObject = JSON.parse(JSON.stringify(error));

        message.warning(errorObject.message);
      });
  }

  render() {
    const { rowStyle, colStyle } = basicStyle;
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/dashboard/admin/user_roles' />
    }
    return (

      <LayoutWrapper>


        <Row style={rowStyle} gutter={18} justify="start" block>
          <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
            <Row>
              <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                <PageHeader>

                  <h1>
                    <IntlMessages id="users_roles.title" />

                  </h1>
                </PageHeader>
              </Col>
            </Row>
            <Row>
              <Card className="cardContent" style={{ marginTop: '50px' }}>
                <Row gutter={10}>
                  <Col span={24}>
                    <Form.Item label="Usuario">
                      <Select value={this.state.user_id} placeholder="usuario" style={{ width: 240 }} onChange={(e) => { this.handleChange(e, 'user_id') }}>
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
                    <Form.Item label="Rol">
                      <Select value={this.state.role_id} placeholder="rol" style={{ width: 240 }} onChange={(e) => { this.handleChange(e, 'role_id') }}>
                        {this.state && this.state.roles &&
                          this.state.roles.map((item) => {
                            return <Option value={item.id}>{item.name}</Option>
                          })
                        }
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={10}>
                  <Col span={24}>
                    <Form.Item label="Estado">
                      <Select value={this.state.active} placeholder="estado" style={{ width: 240 }} onChange={(e) => { this.handleChange(e, 'active') }}>
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
