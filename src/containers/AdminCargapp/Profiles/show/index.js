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
import { getProfile, getUsers, getDocumentTypes } from '../../../../helpers/api/adminCalls.js';

export default class ProfileShow extends Component {


  constructor(props) {
    super();
    this.state = {
      redirect: false
    }
  }
  transformDataToMap(data, key) {
    var dataTransformed = {};
    data.map((item) => {
      dataTransformed[item.id] = item[key];
      return item;
    });

    return dataTransformed
  }
 
  componentWillMount() {
    axios.all([getProfile(this.props.match.params.id), getUsers(), getDocumentTypes()])
      .then((responses) => {
        let data_document_types = this.transformDataToMap(responses[2].data, 'name')
        let data_users = this.transformDataToMap(responses[1].data, 'email')
        this.setState({
          first_name: responses[0].data.firt_name,
          last_name: responses[0].data.last_name,
          avatar: responses[0].data.avatar,
          phone: responses[0].data.phone,
          document_id: responses[0].data.document_id,
          document_type: data_document_types[responses[0].data.document_type_id],
          birth_date: responses[0].data.birth_date,
          user: data_users[responses[0].data.user_id],
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

  goBack() {
    this.props.history.push('/dashboard/admin/profiles')
  }


  render() {
    const { rowStyle, colStyle } = basicStyle;
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/dashboard/admin/profiles' />
    }
    return (

      <LayoutWrapper>


        <Row style={rowStyle} gutter={18} justify="start" block>
          <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
            <Row>
              <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                <PageHeader>

                  <h1>
                    <IntlMessages id="profiles.title" />

                  </h1>
                </PageHeader>
              </Col>
            </Row>
            <Row>
              <Card className="cardContent" style={{ marginTop: '50px' }}>
                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Nombre">
                      <p>{this.state.first_name}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Apellido">
                      <p>{this.state.last_name}</p>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Avatar">
                      <a  href={this.state.avatar}><IntlMessages id="general.download" /></a>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Número de telefono">
                      <p>{this.state.phone}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Tipo de documento">
                      <p>{this.state.document_type}</p>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Número de documento">
                      <p>{this.state.document_id}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Fecha de nacimiento">
                      <p>{this.state.birth_date}</p>
                    </Form.Item>
                  </Col>

                </Row>
                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Usuario">
                      <p>{this.state.user}</p>
                    </Form.Item>
                  </Col>
                 

                </Row>

                
                <Row>
                  <Col span={24}>
                    <Form.Item wrapperCol={{ span: 24 }}>
                      <PrimaryButton message_id={"general.back"} style={{ width: '200px' }} onClick={() => this.goBack()} />
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
