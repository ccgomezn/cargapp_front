import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Input from "../../components/uielements/input";
import Checkbox from "../../components/uielements/checkbox";
import Button from "../../components/uielements/button";
import authAction from "../../redux/auth/actions";
import appAction from "../../redux/app/actions";
import Firebase from "../../helpers/firebase";
import FirebaseLogin from "../../components/firebase";
import IntlMessages from "../../components/utility/intlMessages";
import SignInStyleWrapper from "./signin.style";
import { Row, Col } from "antd";

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
    const { login, clearMenu } = this.props;
    login();
    clearMenu();
    this.props.history.push("/dashboard");
  };
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
                  <label for="form-email"><IntlMessages id="page.email" /></label>
                  <Input size="large" placeholder="Correo eléctronico" id="form-email" autoComplete="new-password" />
                </div>

                <div className="isoInputWrapper">


                  <label for="password">
                    <IntlMessages id="page.password" />
                  </label>





                  <Input size="large" id="password" type="password" placeholder="Contraseña" autoComplete="new-password" />
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
                      <Button className="register">
                        <IntlMessages id="page.signup" />                        
                      </Button>
                        <Button className="sign-in">
                          <IntlMessages id="sidebar.signIn" />

                        </Button>

                      </Col>
                    </Row>
                    <hr/>
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
