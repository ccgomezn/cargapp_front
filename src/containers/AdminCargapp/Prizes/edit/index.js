import React, { Component } from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import { Row, Col, DatePicker } from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import { Form } from "antd";
import PrimaryButton from "../../../../components/custom/button/primary"
import { Card } from 'antd';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import { Select, Input } from 'antd';
import moment from 'moment';
import { putPrize, getPrize, getUsers } from '../../../../helpers/api/adminCalls.js';


const dateFormat = 'YYYY-MM-DD';
const { Option } = Select;


export default class PrizeEdit extends Component {


  constructor(props) {
    super();
    this.state = {
      redirect: false
    }
  }

 

  componentWillMount() {
    axios.all([getPrize(this.props.match.params.id), getUsers()])
      .then((responses) => {

        if (responses[0].data.active) {
          responses[0].data.active = true;
        } else {
          responses[0].data.active = false;
        }

        this.setState({
          users: responses[1].data,
          name: responses[0].data.name,
          code: responses[0].data.code,
          point: responses[0].data.point,
          description: responses[0].data.description,
          body: responses[0].data.body,
          expire_date: responses[0].data.expire_date,
          user_id: responses[0].data.user_id,
          active: responses[0].data.active,
        })
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
    const formData = new FormData();
    formData.append('prize[name]', this.state.name)
    formData.append('prize[code]', this.state.code)
    if (this.state.image != null) {

      formData.append('prize[image]', this.state.image, this.state.image.name)
    }
    if (this.state.media != null) {
      formData.append('prize[media]', this.state.media, this.state.media.name)

    }
    formData.append('prize[point]', this.state.point)
    formData.append('prize[description]', this.state.description)
    formData.append('prize[body]', this.state.body)
    formData.append('prize[user_id]', this.state.user_id)
    formData.append('prize[expire_date]', this.state.expire_date)
    formData.append('prize[active]', this.state.active)

    putPrize(this.props.match.params.id,
      formData).then(() => {
        this.setState({ redirect: true })
      })
  }

  render() {
    const { rowStyle, colStyle } = basicStyle;
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/admin/prizes' />
    }
    return (

      <LayoutWrapper>


        <Row style={rowStyle} gutter={18} justify="start" block>
          <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
            <Row>
              <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                <PageHeader>

                  <h1>
                    <IntlMessages id="prizes.title" />

                  </h1>
                </PageHeader>
              </Col>
            </Row>
            <Row>
              <Card className="cardContent" style={{ marginTop: '50px' }}>
                <Form>
                  <Row gutter={10}>
                    <Col span={12}>
                      <Form.Item label="Nombre">
                        <Input value={this.state.name} placeholder="nombre" onChange={(e) => this.handleChange(e.target.value, 'name')} required />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Codigo">
                        <Input value={this.state.code} placeholder="codigo" onChange={(e) => this.handleChange(e.target.value, 'code')} required />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col span={12}>
                      <Form.Item label="Puntos">
                        <Input type="number" value={this.state.point} placeholder="puntos" onChange={(e) => this.handleChange(e.target.value, 'point')} required />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Descripción">
                        <Input value={this.state.description} placeholder="descripción" onChange={(e) => this.handleChange(e.target.value, 'description')} required />

                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col span={12}>
                      <Form.Item label="Cuerpo">
                        <Input value={this.state.body} placeholder="cuerpo" onChange={(e) => this.handleChange(e.target.value, 'body')} required />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Imagen">
                        <input type="file" onChange={(e) => this.handleChange(e.target.files[0], 'image')} />

                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={10}>

                    <Col span={24}>
                      <Form.Item label="Media">
                        <input type="file" onChange={(e) => this.handleChange(e.target.files[0], 'media')} />

                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col span={12}>
                      <Form.Item label="Usuario">
                        <Select value={this.state.user_id} placeholder="usuario" style={{ width: '100%' }} onChange={(e) => { this.handleChange(e, 'user_id') }} >
                          {this.state && this.state.users &&

                            this.state.users.map((item) => {
                              return <Option value={item.id}>{item.email}</Option>
                            })
                          }
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Fecha de expiración">
                        {
                          this.state && this.state.expire_date &&
                          <DatePicker defaultValue={moment(this.state.expire_date, dateFormat)} format={dateFormat} onChange={(e) => this.handleChange(e, 'expire_date')} />
                        }
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col span={24}>
                      <Form.Item label="Estado">
                        <Select required value={this.state.active} placeholder="estado" style={{ width: 120 }} onChange={(e) => { this.handleChange(e, 'active') }}>
                          <Option value={true}>Activo</Option>
                          <Option value={false}>Desactivado</Option>

                        </Select>
                      </Form.Item>
                    </Col>

                  </Row>
                  <Row>
                    <Col span={24}>
                      <Form.Item wrapperCol={{ span: 24 }}>
                        <PrimaryButton htmlType={"submit"} message_id={"general.edit"} style={{ width: '200px' }} onClick={() => this.handlePut()} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Card>


            </Row>

          </Col>
        </Row>




      </LayoutWrapper>
    );
  }
}
