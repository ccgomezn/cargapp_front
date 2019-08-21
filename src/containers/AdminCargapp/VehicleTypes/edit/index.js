import React, { Component } from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import { Row, Col } from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import { Form, Input, Avatar } from "antd";
import PrimaryButton from "../../../../components/custom/button/primary"
import { Card, message } from 'antd';
import { Redirect } from 'react-router-dom'
import { Select } from 'antd';
import { putVehicleType, getVehicleType } from '../../../../helpers/api/adminCalls.js';

const { Option } = Select;
export default class VehicleTypeEdit extends Component {


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
    getVehicleType(this.props.match.params.id)
      .then((response) => {


        this.setState({
          code: response.data.code,
          name: response.data.name,
          description: response.data.description,
          active: response.data.active,
          icon: response.data.icon,
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
    putVehicleType(this.props.match.params.id,
      {
        vehicle_type: {
          name: this.state.name,
          code: this.state.code,
          description: this.state.description,
          icon: this.state.icon,
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
      return <Redirect to='/admin/vehicle_types' />
    }
    return (

      <LayoutWrapper>


        <Row style={rowStyle} gutter={18} justify="start" block>
          <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
            <Row>
              <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                <PageHeader>

                  <h1>
                    <IntlMessages id="vehicleType.title" />

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
                        <Input required value={this.state.name} placeholder="nombre" onChange={(e) => this.handleChange(e.target.value, 'name')} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Código">
                        <Input required value={this.state.code} placeholder="código" onChange={(e) => this.handleChange(e.target.value, 'code')} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col span={12}>
                      <Form.Item label="Ícono">
                        <Row>
                          <Col span={2}>
                            <Avatar src={this.state.icon} />
                          </Col>
                          <Col span={22}>
                            <Input required value={this.state.icon} placeholder="ícono" onChange={(e) => this.handleChange(e, 'icon')} />
                          </Col>

                        </Row>

                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Descripción">
                        <Input required value={this.state.description} placeholder="descripción" onChange={(e) => this.handleChange(e, 'description')} />
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
