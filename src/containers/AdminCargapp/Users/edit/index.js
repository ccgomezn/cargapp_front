import React, { Component } from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import { Row, Col, Form, Card, Select, message } from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import PrimaryButton from "../../../../components/custom/button/primary"
import { Redirect } from 'react-router-dom'
import axios from "axios";
import TextInputCustom from "../../../../components/custom/input/text";
import SelectMultipleInputCustom from "../../../../components/custom/input/selectMultiple";
import {
  getUser,
  confirmUser,
  getActiveRoles,
  resendCode,
  putUserRole,
  putUserCompany,
  verifyEmail,
  verifyPhoneNumber,
  getProfile,
  getProfileOfUser,
  getUserRole
} from "../../../../helpers/api/users";
import SelectInputCustom from "../../../../components/custom/input/select";
import SecondaryButton from "../../../../components/custom/button/secondary";
import { getActiveCountries } from "../../../../helpers/api/locations";
import { transformInputData } from "../../../../helpers/utility";
import { put } from "../../../../helpers/httpRequest";
import httpAddr from "../../../../helpers/http_helper";
import { getMineCompanies } from "../../../../helpers/api/companies";
import { putDocument } from "../../../../helpers/api/internals";

const { Option } = Select;

export default class UserEdit extends Component {

  constructor() {
    super();
    this.state = {
      redirect: false,
      duplicated: false
    }
  }

  handleConfirmUser() {
    confirmUser({
      user: {
        phone_number: parseInt(transformInputData(this.state.country_code) + this.state.phone_number),
        mobile_code: this.state.pin
      }
    }).then((response) => {
      if (response.status === 200) {
        message.success("Usuario registrado correctamente");
        this.setState({
          redirect: true
        });
      } else {
        message.warning("Codigo incorrecto");
      }
    })
  }

  handleResendCode() {
    resendCode({
      user:
        {
          phone_number: parseInt(transformInputData(this.state.country_code) + this.state.phone_number)
        }
    }).then(message.success("Codigo reenviado"))
  }

  handleChange(value, type) {
    this.setState(
      {
        [type]: value
      }
    )

    if (type === 'email') {
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w+)+$/.test(value)) {
        verifyEmail(value).then((response) => {
          if (response.data.email) {

            this.setState({ duplicated: true });
          } else {
            this.setState({ duplicated: false });
          }
        })
      }
    }
    if (type === 'phone_number') {
      if (/^\d{10}\d+$/.test(transformInputData(this.state.country_code) + value)) {
        verifyPhoneNumber(parseInt(transformInputData(this.state.country_code) + value)).then((response) => {
          if (response.data.phone_number) {

            this.setState({ duplicated_phone: true });
          } else {
            this.setState({ duplicated_phone: false });
          }
        })
      }
    } else if (type === 'country_code') {
      if (/^\d{10}\d+$/.test(transformInputData(value) + this.state.phone_number)) {
        verifyPhoneNumber(parseInt(transformInputData(value) + this.state.phone_number)).then((response) => {
          if (response.data.phone_number) {
            this.setState({ duplicated_phone: true });
          } else {
            this.setState({ duplicated_phone: false });
          }
        })
      }
    }
  }

  handleUpdate() {
    if (this.state.email === '' || this.state.password === '' || this.state.password_confirmation === '') {
      return null;
    }

    if (this.state.password !== this.state.password_confirmation) {
      message.warning('La contraseña no coincide');
    } else {
      let userJson = {
        email: this.state.email,
        identification: this.state.identification,
        phone_number: parseInt(transformInputData(this.state.country_code) + this.state.phone_number),
      }
      if (this.state.password && this.state.password.length() > 6) {
        userJson.password = this.state.password;
        userJson.password_confirmation = this.state.password_confirmation;
      }
      put(httpAddr + '/users/' + this.state.user_id,
        { user: userJson }, false)
        .then((response) => {
          this.setState({ userId: response.data.id });
          let role_calls = [];
          this.state.role_id.forEach((role) => {
            role_calls.push(putUserRole({
              user_role: {
                role_id: role,
                user_id: this.state.userId,
                admin_id: 1,
                active: true
              }
            }));
          });

          axios.all(role_calls).then(() => {
            getMineCompanies().then((response) => {
              putUserCompany({
                company_user: {
                  user_id: this.state.userId,
                  company_id: response.data[0].id
                }
              }).then(() => {
                let setCC = function () {
                };
                let setLC = function () {
                };

                if (this.state.cc_front && this.state.cc_back) {
                  let that = this;
                  setCC = function () {
                    const formData = new FormData();
                    formData.append('document[document_type_id]', 5);
                    formData.append('document[file]', that.state.cc_front, that.state.cc_front.name);
                    formData.append('document[statu_id]', 13);
                    formData.append('document[active]', true);
                    formData.append('document[user_id]', that.state.userId);
                    putDocument(formData).then(() => {
                      const formDataBack = new FormData();
                      formDataBack.append('document[document_type_id]', 7);
                      formDataBack.append('document[file]', that.state.cc_back, that.state.cc_back.name);
                      formDataBack.append('document[statu_id]', 13);
                      formDataBack.append('document[active]', true);
                      formDataBack.append('document[user_id]', this.state.userId);
                      putDocument(formDataBack)
                    })
                  }
                }

                if (this.state.lc_front && this.state.lc_back) {
                  let that = this;
                  setLC = function () {
                    const formData = new FormData();
                    formData.append('document[document_type_id]', 4);
                    formData.append('document[file]', that.state.lc_front, that.state.lc_front.name);
                    formData.append('document[statu_id]', 13);
                    formData.append('document[active]', true);
                    formData.append('document[user_id]', that.state.userId);
                    putDocument(formData).then(() => {
                      const formDataBack = new FormData();
                      formDataBack.append('document[document_type_id]', 8);
                      formDataBack.append('document[file]', that.state.lc_back, that.state.lc_back.name);
                      formDataBack.append('document[statu_id]', 13);
                      formDataBack.append('document[active]', true);
                      formDataBack.append('document[user_id]', that.state.userId);
                      putDocument(formDataBack)
                    })
                  }
                }

                axios.all([setCC(), setLC()]).then(() => {
                  message.success('Usuario creado correctamente');
                  this.setState({ visible: true });

                }).catch((error) => {
                  message.warning("Error al crear el usuario");
                });

              });
            });
          });
        }).catch((error) => {
          message.warning("Error al crear el usuario");
        });
      }
  }

  componentDidMount() {
    console.log(this.props);
    let userId = this.props.match.params.id;
    axios.all([getActiveRoles(), getActiveCountries(), 
                getUser(userId), getProfileOfUser(userId)])
      .then((responses) => {
        console.log(responses[2].data);
        console.log(responses[3].data);
        if (responses[0]) {
          this.setState({
            roles: responses[0].data,
            countries: responses[1].data,
          });
        }
        if (responses[2] && responses[3]) {
          let userData = responses[2].data;
          let profileData = responses[3].data;
          // only works for country code with 2 numbers
          let countryCode = userData.phone_number.toString().slice(0, 2);
          let phoneNumber = userData.phone_number.toString().slice(2);

          this.setState({
            user_id: userData.id,
            country_code: countryCode,
            name: profileData.firt_name,
            last_name: profileData.last_name,
            email: userData.email,
            identification: userData.identification,
            phone_number: phoneNumber,
            password_confirmation: this.state.password_confirmation,
          });
        }
      })
  }

  render() {
    const { rowStyle, colStyle } = basicStyle;
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/admin/users' />
    }
    return (

      <LayoutWrapper>

        <Row style={rowStyle} gutter={18} justify="start" block>
          <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
            <Row>
              <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                <PageHeader>
                  <h1>
                    <IntlMessages id="users.title" />
                  </h1>
                </PageHeader>
              </Col>
            </Row>

            <Row>
              <Card className="cardContent" style={{ marginTop: '50px' }}>
                <Form>
                  <Row gutter={10}>
                    <Col span={12}>
                      <Form.Item
                        label={this.state.duplicated ? "Email (el email esta duplicado)" : "Email"}>
                        <TextInputCustom value={this.state.email} placeholder="email"
                          onChange={(e) => this.handleChange(e.target.value, 'email')}
                          label_id={'admin.title.email'}
                          required />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Password">
                        <TextInputCustom type={"password"} value={this.state.password}
                          placeholder="password"
                          label_id={'admin.title.password'}
                          onChange={(e) => this.handleChange(e.target.value, 'password')}
                          required />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col span={12}>
                      <Form.Item label="Confirmación de password">
                        <TextInputCustom type={"password"}
                          value={this.state.password_confirmation}
                          placeholder="confirmación de password"
                          label_id={'admin.title.password'}
                          onChange={(e) => this.handleChange(e.target.value, 'password_confirmation')}
                          required />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label={this.state.duplicated_phone ? 'Teléfono duplicado' : 'Teléfono'}>
                        {this.state.countries && <Col span={6}>
                          <SelectInputCustom placeholder={'page.country'}
                            label_id={'page.country'}
                            onChange={(e) => {
                              this.handleChange(e, 'country_code')
                            }}
                            defaultValue={{ key: 57 }}
                            value={this.state.country_code}
                            options={this.state.countries.map((item) => {
                              return <Option
                                value={item.code}><img alt={""}
                                  style={{
                                    width: '10px',
                                    height: '10px'
                                  }}
                                  src={item.image} /> +{item.code}
                              </Option>
                            })} />
                        </Col>}

                        <Col span={18}>
                          <TextInputCustom required
                            label_id={'page.phone'}
                            value={this.state.phone_number}
                            placeholder='Número de teléfono'
                            onChange={(e) => this.handleChange(e.target.value, 'phone_number')} />
                        </Col>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={10}>
                    <Col span={24}>
                      <Col span={12}>
                        <Form.Item
                          label={"Cédula de ciudadania"}>
                          <TextInputCustom value={this.state.identification}
                            placeholder="cédula de ciudadania"
                            onChange={(e) => this.handleChange(e.target.value, 'identification')}
                            label_id={'admin.title.identification'}
                            required />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          label={"Nombre"}>
                          <TextInputCustom value={this.state.name} placeholder="nombre"
                            onChange={(e) => this.handleChange(e.target.value, 'name')}
                            label_id={'admin.title.name'}
                            required />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          label={"Apellido"}>
                          <TextInputCustom value={this.state.last_name} placeholder="apellido"
                            onChange={(e) => this.handleChange(e.target.value, 'last_name')}
                            label_id={'admin.title.lasName'}
                            required />
                        </Form.Item>
                      </Col>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={12}>
                      <Form.Item label="Cédula de ciudadania (frontal)">
                        <div style={{ position: 'relative' }}>
                          <input type="file"
                            id="contained-button-file"
                            onChange={(e) => this.handleChange(e.target.files[0], 'cc_front')}
                            style={{
                              position: 'relative',
                              textAlign: 'right',
                              opacity: 0,
                              zIndex: 2
                            }} />
                          <label htmlFor="contained-button-file" style={{
                            position: 'absolute',
                            top: '0px',
                            left: '0px',
                            zIndex: 1
                          }}>
                            <SecondaryButton message_id={'widget.load'} />
                            {this.state.cc_front && this.state.cc_front.name}
                          </label>
                        </div>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Cédula de ciudadania (trasera)">
                        <div style={{ position: 'relative' }}>
                          <input type="file"
                            id="contained-button-file"
                            onChange={(e) => this.handleChange(e.target.files[0], 'cc_back')}
                            style={{
                              position: 'relative',
                              textAlign: 'right',
                              opacity: 0,
                              zIndex: 2
                            }} />
                          <label htmlFor="contained-button-file" style={{
                            position: 'absolute',
                            top: '0px',
                            left: '0px',
                            zIndex: 1
                          }}>
                            <SecondaryButton message_id={'widget.load'} />
                            {this.state.cc_back && this.state.cc_back.name}
                          </label>
                        </div>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={12}>
                      <Form.Item label="Licencia de conducción (frontal)">
                        <div style={{ position: 'relative' }}>
                          <input type="file"
                            id="contained-button-file"
                            onChange={(e) => this.handleChange(e.target.files[0], 'lc_front')}
                            style={{
                              position: 'relative',
                              textAlign: 'right',
                              opacity: 0,
                              zIndex: 2
                            }} />
                          <label htmlFor="contained-button-file" style={{
                            position: 'absolute',
                            top: '0px',
                            left: '0px',
                            zIndex: 1
                          }}>
                            <SecondaryButton message_id={'widget.load'} />
                            {this.state.lc_front && this.state.lc_front.name}
                          </label>
                        </div>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Licencia de conducción (trasera)">
                        <div style={{ position: 'relative' }}>
                          <input type="file"
                            id="contained-button-file"
                            onChange={(e) => this.handleChange(e.target.files[0], 'lc_back')}
                            style={{
                              position: 'relative',
                              textAlign: 'right',
                              opacity: 0,
                              zIndex: 2
                            }} />
                          <label htmlFor="contained-button-file" style={{
                            position: 'absolute',
                            top: '0px',
                            left: '0px',
                            zIndex: 1
                          }}>
                            <SecondaryButton message_id={'widget.load'} />
                            {this.state.lc_back && this.state.lc_back.name}
                          </label>
                        </div>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={10}>
                    <Col span={12}>
                      <Form.Item label="Rol">
                        <SelectMultipleInputCustom value={this.state.role_id} placeholder="rol"
                          style={{ width: '100%' }}

                          onChange={(e) => {
                            this.handleChange(e, 'role_id')
                          }}
                          options={this.state && this.state.roles &&

                            this.state.roles.map((item) => {
                              return <Option
                                value={item.id}>{item.code}</Option>
                            })
                          }
                          label_id={'admin.title.role'}>
                        </SelectMultipleInputCustom>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={24}>
                      <Form.Item wrapperCol={{ span: 24 }}>
                        <PrimaryButton
                          disabled={this.state.duplicated || this.state.duplicated_phone}
                          htmlType={"submit"}
                          message_id={"general.add"}
                          style={{ width: '200px' }}
                          onClick={() => this.handleUpdate()} />
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
