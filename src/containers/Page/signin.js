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
                    <Link to="/dashboard">
                      <IntlMessages id="page.signInTitle" />
                    </Link>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <p>
                      <IntlMessages id="page.signInSubtitle" />
                    </p>
                  </Col>
                </Row>
              </div>


            </div>

            <div className="isoSignInForm">
              <div className="isoInputWrapper">
                <label>
                  <IntlMessages id="page.email" />
                </label>
                <Input size="large" placeholder="Email" />
              </div>

              <div className="isoInputWrapper">
                <div>
                  <Row style={{ marginTop: 6 }}>
                    <Col span={12}>
                      <label>
                        <IntlMessages id="page.password" />
                      </label>
                    </Col>
                    <Col span={12} align={'end'}>
                      <Link to="/forgotpassword">
                        <IntlMessages id="page.forgetPassSubTitle" />

                      </Link>
                    </Col>
                  </Row>

                </div>



                <Input size="large" type="password" placeholder="Password" />
              </div>

              <div className="isoInputWrapper">

                <Button type="primary" onClick={this.handleLogin} block style={{
                  height: 50,
                  marginTop: 8
                }}>
                  <IntlMessages id="page.signInButton" />
                </Button>
              </div>




              <div className="isoCenterComponent isoHelperWrapper">
                <div>
                    <p>

                      <IntlMessages id="page.notMember" />{' '}
                      <Link to="/signup">
                        <IntlMessages id="page.signUpButton" />
                      </Link>
                    </p>
                    
                
                    <Link to="/signup">
                      <IntlMessages id="page.aboutUs" />
                    </Link>
                </div>
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
