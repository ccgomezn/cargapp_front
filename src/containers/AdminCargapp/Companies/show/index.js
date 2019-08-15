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
import { getCompany, getUsers, getLoadTypes, get } from "../../../../helpers/api/adminCalls"

export default class CompanyShow extends Component {


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
    axios.all([getCompany(this.props.match.params.id), getUsers(), getLoadTypes()])
      .then((responses) => {

        if (responses[0].data.active) {
          responses[0].data.active = 'Activo';
        } else {
          responses[0].data.active = 'Desactivado';
        }
        let data_users = this.transformDataToMap(responses[1].data, 'email')
        let data_load_types = this.transformDataToMap(responses[2].data, 'name')
        this.setState({
          name: responses[0].data.name,
          description: responses[0].data.description,
          company_type: responses[0].data.company_type,
          load_type: data_load_types[responses[0].data.load_type_id],
          sector: responses[0].data.sector,
          legal_representative: responses[0].data.legal_representative,
          address: responses[0].data.address,
          phone: responses[0].data.phone,
          user: data_users[responses[0].data.user_id],
          constitution_date: responses[0].data.constitution_date,
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
    this.props.history.push('/dashboard/admin/companies')
  }


  render() {
    const { rowStyle, colStyle } = basicStyle;
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/dashboard/admin/companies' />
    }
    return (

      <LayoutWrapper>


        <Row style={rowStyle} gutter={18} justify="start" block>
          <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
            <Row>
              <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                <PageHeader>

                  <h1>
                    <IntlMessages id="companies.title" />

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
                    <Form.Item label="Descripción">
                      <p>{this.state.description}</p>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Sector">
                      <p>{this.state.sector}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Representante legal">
                      <p>{this.state.legal_representative}</p>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Usuario">
                      <p>{this.state.user}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Teléfono">
                      <p>{this.state.phone}</p>
                    </Form.Item>
                  </Col>

                </Row>

                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Fecha de constitución">
                      <p>{this.state.constitution_date}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Tipo de carga">
                      <p>{this.state.load_type}</p>
                    </Form.Item>
                  </Col>

                </Row>


                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Tipo de compañia">
                      <p>{this.state.company_type}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Dirección">
                      <p>{this.state.address}</p>
                    </Form.Item>
                  </Col>


                </Row>

                <Row>
                  <Col span={24}>
                    <Form.Item label="Estado">
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
