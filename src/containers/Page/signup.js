import React, { Component } from "react";
import { connect } from "react-redux";
import authAction from "../../redux/auth/actions";
import appActions from "../../redux/app/actions";
import IntlMessages from "../../components/utility/intlMessages";
import SignUpStyleWrapper from "./signup.style";
import { Row, Col } from "antd";
import { Radio, message } from 'antd';
import PrimaryButton from '../../components/custom/button/primary'
import SecondaryButton from "../../components/custom/button/secondary";
import TextInputCustom from '../../components/custom/input/text'
import axios from 'axios';
import httpAddr from "../../helpers/http_helper"
import { Redirect } from 'react-router-dom'
import  importantVariables  from '../../helpers/hashVariables'
const { login } = authAction;
const { clearMenu } = appActions;

class SignUp extends Component {

  state = {
    redirect: false
  };

  componentWillReceiveProps(nextProps) {
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }
  handleLogin = () => {
    const { login, clearMenu } = this.props;
    login();
    clearMenu();
    this.props.history.push("/dashboard");
  };

  handleChange(value, type) {

    this.setState(
      {
        [type]: value
      }
    )
  }

  handlePostRegister() {

    axios.post(httpAddr + '/users/email_verify', {
      user: {
        email: this.state.email
      }
    }).then((response) => {
      if (response.status === 200) {
        message.warning('El usuario ya existe en el sistema');
      }
    }).catch(error => {
      let errorObject = JSON.parse(JSON.stringify(error));
      if (error.response.status === 302) {
        if (this.state.password !== this.state.password_confirmation) {
          message.warning('La contraseña no coincide');
        } else {
          axios.post(httpAddr + '/users',
            {
              user: {
                email: this.state.email,
                password: this.state.password,
                password_confirmation: this.state.password_confirmation,

              }
            }).then((response) => {
              axios.post(httpAddr + '/user_roles',
                {
                  user_role: {
                    user_id: response.data.id,
                    role_id: importantVariables.user_role_id,
                  }
                }).then(()=>{
                  this.setState({ redirect: true })
                })
            });
        }

      } else {

        message.warning(errorObject.message);
      }

    });

  }
  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/signin' />
    }

    return (
      <SignUpStyleWrapper className="isoSignUpPage">
        <div className="isoSignUpContentWrapper">
          <div className="isoSignUpContent">
            <div className="isoLogoWrapper">
              <div>
                <Row>
                  <Col span={24}>
                    <div>
                      <div class="Bienvenido-a-Cargapp">
                        <IntlMessages id="page.welcomeTo" />

                        <div class="text-style-1">
                          Cargapp
                      </div>
                      </div>
                    </div>

                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <div class="Una-solucin-digital">
                      <IntlMessages id="page.signInSubtitle" />
                    </div>
                  </Col>
                </Row>
              </div>
            </div>

            <div className="isoSignUpForm">
              <div className="isoSelectWrapper">
                <Row>
                  <Radio.Group defaultValue="a" >

                    <Col span={11}>
                      <Radio.Button value="a" className="buttonSelect">
                        <div className="isoCenterComponent">
                          <div>
                            <p className="title">
                              <IntlMessages id="page.admin" />
                            </p>

                            <p className="subtitle">
                              <IntlMessages id="page.adminSub" />
                            </p>
                          </div>

                        </div>
                      </Radio.Button>
                    </Col>
                    <Col span={2}></Col>
                    <Col span={11}>
                      <Radio.Button value="b" className="buttonSelect" >
                        <div className="isoCenterComponent">
                          <div>
                            <p className="title">
                              <IntlMessages id="page.oper" />
                            </p>
                            <p className="subtitle">
                              <IntlMessages id="page.operSub" />
                            </p>
                          </div>

                        </div>
                      </Radio.Button>
                    </Col>
                  </Radio.Group>
                </Row>

              </div>
              <div className="formData">
                <form autoComplete="new-password">

                  <div className="isoInputWrapper">
                    <TextInputCustom label_id='page.email' value={this.state.email} placeholder='Correo eléctronico' onChange={(e) => this.handleChange(e.target.value, 'email')} />
                  </div>
                  <div className="isoInputWrapper" >
                    <TextInputCustom label_id='page.password' value={this.state.password} placeholder='Contraseña' type='password' onChange={(e) => this.handleChange(e.target.value, 'password')} />
                  </div>
                  <div className="isoInputWrapper" >
                    <TextInputCustom label_id='page.passwordConfirmation' value={this.state.password_confirmation} placeholder='Contraseña' type='password' onChange={(e) => this.handleChange(e.target.value, 'password_confirmation')} />
                  </div>

                </form>
              </div>



              <div className="sign-buttons">
                <Row>
                  <Col span={24} align={'right'}>
                    <div className="button-sign" style={{ marginRight: '10px' }}>
                      <SecondaryButton message_id="page.signup" />

                    </div>

                    <div className="button-sign">

                      <PrimaryButton message_id="page.start" onClick={() => this.handlePostRegister()} />
                    </div>
                  </Col>
                </Row>
              </div>

              <div className="footer">
                <Row>
                  <Col span={24} align={'center'}>
                    <IntlMessages id="app.footer" />

                  </Col>
                </Row>

              </div>
            </div>

          </div>
        </div>
      </SignUpStyleWrapper>
    );
  }
}

export default connect(
  state => ({
    isLoggedIn: state.Auth.idToken !== null ? true : false
  }),
  { login, clearMenu }
)(SignUp);
