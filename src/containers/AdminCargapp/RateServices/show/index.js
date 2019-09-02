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
import { getUsers } from '../../../../helpers/api/adminCalls.js';
import {getRateService, getServices} from "../../../../helpers/api/adminCalls";

export default class ServiceDocumentShow extends Component {


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
    axios.all([getRateService(this.props.match.params.id), getUsers(), getServices()])
      .then((responses) => {

        if (responses[0].data.active) {
          responses[0].data.active = 'Activo';
        } else {
          responses[0].data.active = 'Desactivado';
        }



        let data_users = this.transformDataToMap(responses[1].data, 'email');
        let data_services = this.transformDataToMap(responses[2].data, 'name');
        this.setState({
          service_point: responses[0].data.service_point,
          driver_point: responses[0].data.driver_point,
          point: responses[0].data.point,
          service: data_services[responses[0].data.service_id],
          user: data_users[responses[0].data.user_id],
          driver: data_users[responses[0].data.driver_id],
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

  goBack() {
    this.props.history.push('/admin/rate_services')
  }


  render() {
    const { rowStyle, colStyle } = basicStyle;
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/admin/rate_services' />
    }
    return (

      <LayoutWrapper>


        <Row style={rowStyle} gutter={18} justify="start" block>
          <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
            <Row>
              <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                <PageHeader>

                  <h1>
                    <IntlMessages id="rateServices.title" />

                  </h1>
                </PageHeader>
              </Col>
            </Row>
            <Row>
              <Card className="cardContent" style={{ marginTop: '50px' }}>
                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Puntos de servicio">
                      <p>{this.state.service_point}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Puntos de conductor">
                      <p>{this.state.driver_point}</p>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Puntos">
                      <p>{this.state.point}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Servicio">
                      <p>{this.state.service}</p>
                    </Form.Item>
                  </Col>
                </Row>

                <Row span={12}>
                  <Col span={12}>
                    <Form.Item label="Usuario">
                      <p>{this.state.user}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Conductor">
                      <p>{this.state.driver}</p>
                    </Form.Item>
                  </Col>
                </Row>



                    <Row>

                  <Col span={12}>
                    <Form.Item label="Estado de activación">
                      <p>{this.state.active}</p>
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
