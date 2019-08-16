import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Checkbox from "../../components/uielements/checkbox";
import authAction from "../../redux/auth/actions";
import appAction from "../../redux/app/actions";
import IntlMessages from "../../components/utility/intlMessages";
import SignInStyleWrapper from "./signin.style";
import { Row, Col } from "antd";
import PrimaryButton from '../../components/custom/button/primary'
import SecondaryButton from '../../components/custom/button/secondary'
import TextInputCustom from '../../components/custom/input/text'
import httpAddr from "../../helpers/http_helper";

const { login } = authAction;
const { clearMenu } = appAction;

class SignIn extends Component {
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
    const { login } = this.props;
    login({ user: { email: this.state.email, password: this.state.password } }, httpAddr + '/users/login', httpAddr + '/users/me')

  };

  handleChange(value, type) {
    this.setState(
      {
        [type]: value
      }
    )
  }

  handleSignup() {
    this.props.history.push("/signup")
  }

  render() {
    const from = { pathname: "/dashboard" };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <SignInStyleWrapper className="isoSignInPage">
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">

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
            <div className="isoSignInForm">
              <form autoComplete="new-password">

                <div className="isoInputWrapper">
                  <TextInputCustom label_id='page.email' value={this.state.email} onChange={(e) => this.handleChange(e.target.value, 'email')} placeholder='Correo eléctronico' />
                </div>

                <div className="isoInputWrapper">
                  <TextInputCustom label_id='page.password' placeholder='Contraseña' type='password' value={this.state.password} onChange={(e) => this.handleChange(e.target.value, 'password')} />
                </div>
                <div className="helper">
                  <Row>
                    <Col span={12}>
                      <Checkbox className="check"><IntlMessages id="page.remember" /></Checkbox>
                    </Col>
                    <Col span={12} align={'right'}>
                      <Link to="/dashboard"><IntlMessages id="page.signInForgotPass" /></Link>
                    </Col>
                  </Row>
                </div>
                <div className="sign-buttons">
                  <Row>
                    <Col align={'right'}>
                      <div className="button-sign" style={{ marginRight: '10px' }}>
                        <SecondaryButton message_id="page.signup" onClick={() => this.handleSignup()}  />

                      </div>

                      <div className="button-sign">

                        <PrimaryButton message_id="sidebar.signIn" onClick={() => this.handleLogin()} />
                      </div>

                    </Col>
                  </Row>
                  <hr />
                </div>
              </form>



              <div className="isoHelperWrapper">
                <Row>
                  <Col span={6}>
                    <div className="isoHelperLogo">

                    </div>
                  </Col>
                  <Col span={16}>
                    <h1 className="title1"><IntlMessages id="page.meetUs" /></h1>
                    <h1 className="title2"><IntlMessages id="page.invitation" /></h1>
                    <div class="text-style-1">
                      Cargapp
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
      </SignInStyleWrapper>
    );
  }
}

export default connect(
  state => ({
    isLoggedIn: state.Auth.idToken !== null ? true : false
  }),
  { login, clearMenu }
)(SignIn);
