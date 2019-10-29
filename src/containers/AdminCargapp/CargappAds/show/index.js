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
import {getUsers} from "../../../../helpers/api/users";
import {getCargappAd} from "../../../../helpers/api/internals";

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
    axios.all([getCargappAd(this.props.match.params.id), getUsers()])
      .then((responses) => {

        if (responses[0].data.active) {
          responses[0].data.active = 'Activo';
        } else {
          responses[0].data.active = 'Desactivado';
        }

        if (responses[0].data.have_discoun) {
          responses[0].data.have_discoun = 'Si';
        } else {
          responses[0].data.have_discoun = 'No';
        }

        if (responses[0].data.is_percentage) {
          responses[0].data.is_percentage = 'Si';
        } else {
          responses[0].data.is_percentage = 'No';
        }


        let data_users = this.transformDataToMap(responses[1].data, 'email');
        this.setState({
          name: responses[0].data.name,
          price: responses[0].data.price,
          description: responses[0].data.description,
          body: responses[0].data.body,
          image: responses[0].data.image,
          url: responses[0].data.url,
          media: responses[0].data.media,
          have_discoun: responses[0].data.have_discoun,
          is_percentage: responses[0].data.is_percentage,
          discoun: responses[0].data.discoun,
          user: data_users[responses[0].data.user_id],
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
    this.props.history.push('/admin/cargapp_ads')
  }


  render() {
    const { rowStyle, colStyle } = basicStyle;
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/admin/cargapp_ads' />
    }
    return (

      <LayoutWrapper>


        <Row style={rowStyle} gutter={18} justify="start" block>
          <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
            <Row>
              <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                <PageHeader>

                  <h1>
                    <IntlMessages id="cargappAds.title" />

                  </h1>
                </PageHeader>
              </Col>
            </Row>
            <Row>
              <Card className="cardContent" style={{ marginTop: '50px' }}>
                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Nombre">
                      <p>{this.state.name}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Precio">
                      <p>{this.state.price}</p>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Descripción">
                      <p>{this.state.description}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Cuerpo">
                      <p>{this.state.body}</p>
                    </Form.Item>
                  </Col>
                </Row>

                <Row span={12}>
                  <Col span={12}>
                    <Form.Item label="Imagen">
                      <a href={this.state.image}><IntlMessages id="general.download" /></a>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Media">
                      <a href={this.state.media}><IntlMessages id="general.download" /></a>
                    </Form.Item>
                  </Col>
                </Row>


                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Url">
                      <p>{this.state.url}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Tiene descuento">
                      <p>{this.state.have_discoun}</p>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Es porcentaje">
                      <p>{this.state.is_percentage}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Descuento">
                      <p>{this.state.discoun}</p>
                    </Form.Item>
                  </Col>
                </Row>
                    <Row>
                      <Col span={12}>
                        <Form.Item label="Usuario">
                          <p>{this.state.user}</p>
                        </Form.Item>
                      </Col>
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
