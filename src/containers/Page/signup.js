import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Input from "../../components/uielements/input";
import Checkbox from "../../components/uielements/checkbox";
import Button from "../../components/uielements/button";
import authAction from "../../redux/auth/actions";
import appActions from "../../redux/app/actions";
import Firebase from "../../helpers/firebase";
import FirebaseLogin from "../../components/firebase";
import IntlMessages from "../../components/utility/intlMessages";
import SignUpStyleWrapper from "./signup.style";
import { Row, Col } from "antd";
import { rgb } from "polished";

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
                    <Link to="/dashboard">
                      <IntlMessages id="page.signInTitle" />
                    </Link>
                  </Col>
                </Row>
                <Row>
                  <Col span={24} >
                    <p>
                      <IntlMessages id="page.signInSubtitle" />
                    </p>
                  </Col>
                </Row>
              </div>
            </div>

            <div className="isoSignUpForm">

              <div className="isoInputWrapper">
                <Row>
                  <Col span={11}>
                    <Button style={{ height: 180, border: '1.2px solid #E1E7FD' }} color="#E1E7FD">
                      <div className="isoCenterComponent">
                        <div>
                          <Row>
                            <p className="title">
                              <IntlMessages id="page.admin" />
                            </p>
                          </Row>
                          <Row style={{ marginTop: 10 }}>
                            <p className="subtitle">
                              <IntlMessages id="page.adminSub" />
                            </p>
                          </Row>
                        </div>

                      </div>
                    </Button>
                  </Col>
                  <Col span={2}></Col>
                  <Col span={11}>
                    <Button style={{ height: 180, border: '1.2px solid #E1E7FD' }} type="#">
                      <div className="isoCenterComponent">
                        <div>
                          <Row>
                            <p className="title">
                              <IntlMessages id="page.oper" />
                            </p>
                          </Row>
                          <Row style={{ marginTop: 10 }}>
                            <p className="subtitle">
                              <IntlMessages id="page.operSub" />
                            </p>
                          </Row>
                        </div>

                      </div>
                    </Button>
                  </Col>
                </Row>

              </div>

              <div className="isoInputWrapper" style={{ marginTop: 16 }}>
                <label>
                  <IntlMessages id="page.name" />
                </label>
                <Input size="large" placeholder="Nombre" />
              </div>


              <div className="isoInputWrapper">
                <label>
                  <IntlMessages id="page.email" />
                </label>
                <Input size="large" placeholder="Correo electrónico" />
              </div>


              <div className="isoInputWrapper" >
                <label>
                  <IntlMessages id="page.password" />
                </label>
                <Input size="large" type="password"
                  placeholder="Contraseña" />
              </div>

              <div className="positionSignup">
                <div className="isoInputWrapper">
                  <Button type="primary" className="signUp" style={{
                    height: 45
                  }}>
                    <IntlMessages id="page.signUpButton" />
                  </Button>
                </div>

                <div className="isoCenterComponent isoHelperWrapper">
                  <div>
                    <p>

                      <IntlMessages id="page.member" />{' '}
                      <Link to="/signup">
                        <IntlMessages id="page.signInButton" />
                      </Link>
                    </p>
                  </div>
                </div>
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
