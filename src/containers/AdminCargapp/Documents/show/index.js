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
import {getDocument, getDocumentTypes, getStatus} from "../../../../helpers/api/internals";

export default class DocumentShow extends Component {


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
    axios.all([getDocument(this.props.match.params.id), getStatus(), getDocumentTypes(), getUsers()])
      .then((responses) => {

        if (responses[0].data.active) {
          responses[0].data.active = 'Activo';
        } else {
          responses[0].data.active = 'Desactivado';
        }

        if (responses[0].data.approved) {
          responses[0].data.approved = 'Aprobado';
        } else {
          responses[0].data.approved = 'No Aprobado';
        }
        let data_status = this.transformDataToMap(responses[1].data, 'name')
        let data_document_types = this.transformDataToMap(responses[2].data, 'name')
        let data_users = this.transformDataToMap(responses[3].data, 'email')
        this.setState({
          document_id: responses[0].data.document_id,
          document_type: data_document_types[responses[0].data.document_type_id],
          expire_date: responses[0].data.expire_date,
          file: responses[0].data.file,
          status: data_status[responses[0].data.statu_id],
          active: responses[0].data.active,
          approved: responses[0].data.approved,
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
    this.props.history.push('/admin/documents')
  }


  render() {
    const { rowStyle, colStyle } = basicStyle;
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/admin/documents' />
    }
    return (

      <LayoutWrapper>


        <Row style={rowStyle} gutter={18} justify="start" block>
          <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
            <Row>
              <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                <PageHeader>

                  <h1>
                    <IntlMessages id="documents.title" />

                  </h1>
                </PageHeader>
              </Col>
            </Row>
            <Row>
              <Card className="cardContent" style={{ marginTop: '50px' }}>
                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Id de documento">
                      <p>{this.state.document_id}</p>
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
                    <Form.Item label="Documento">
                      <a href={this.state.file}><IntlMessages id="general.download" /></a>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Fecha de vencimiento">
                      <p>{this.state.expire_date}</p>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Status">
                      <p>{this.state.status}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Usuario">
                      <p>{this.state.user}</p>
                    </Form.Item>
                  </Col>

                </Row>


                <Row>
                  <Col span={12}>
                    <Form.Item label="Estado">
                      <p>{this.state.active}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Estado de aprobación">
                      <p>{this.state.approved}</p>
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
