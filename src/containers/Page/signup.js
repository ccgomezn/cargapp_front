import React, { Component } from "react";
import { connect } from "react-redux";
import authAction from "../../redux/auth/actions";
import appActions from "../../redux/app/actions";
import IntlMessages from "../../components/utility/intlMessages";
import SignUpStyleWrapper from "./signup.style";
import { Row, Col } from "antd";
import { Radio } from 'antd';
import PrimaryButton from '../../components/custom/button/primary'
import SecondaryButton from "../../components/custom/button/secondary";
import TextInputCustom from '../../components/custom/input/text'

const { login } = authAction;
const { clearMenu } = appActions;

class SignUp extends Component {
  state = {
    redirectToReferrer: false
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
  render() {
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
                  <Radio.Group >

                  <Col span={11}>
                    <Radio.Button value="a" className="buttonSelect" >
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
                    <TextInputCustom label_id='page.name' placeholder='Nombre' />
                  </div>
                  <div className="isoInputWrapper">
                    <TextInputCustom label_id='page.email' placeholder='Correo eléctronico' />
                  </div>





                  <div className="isoInputWrapper" >
                    <TextInputCustom label_id='page.password' placeholder='Contraseña' type='password' />

                    
                  </div>
                </form>
              </div>
              
              

              <div className="sign-buttons">
                <Row>
                  <Col span={24} align={'right'}>
                    <div className="button-sign" style={{ marginRight: '10px' }}>
                      <SecondaryButton message_id="page.signup"  />

                    </div>

                    <div className="button-sign">

                      <PrimaryButton message_id="page.start"/>
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
