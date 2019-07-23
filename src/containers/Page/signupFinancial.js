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
import SignUpStyleWrapper from "./signupCompany.style";
import { Row, Col } from "antd";
import { rgb } from "polished";

const { login } = authAction;
const { clearMenu } = appActions;

class SignUpFinancial extends Component {
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
                      <IntlMessages id="page.signUpTitleCompany" />
                    </Link>
                  </Col>
                </Row>
                <Row>
                  <Col span={24} >
                    <p>
                      <IntlMessages id="page.signUpSubTitleCompany" />
                    </p>
                  </Col>
                </Row>
              </div>
            </div>

            <div className="isoLogoWrapper2">
              <div>
                <Row>
                  <Col span={24}>
                    <p className="title">
                      <IntlMessages id="page.company.title" />
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col span={24} >
                    <p className="subtitle">
                      <IntlMessages id="page.financial.subtitle" />
                    </p>
                  </Col>
                </Row>
              </div>
            </div>

            <div className="isoSignUpForm">
              <div className="isoInputWrapper" style={{ marginTop: 16 }}>
                <label>
                  <IntlMessages id="page.paymentMethod" />
                </label>
                <Input size="large" placeholder="Medio de pago" />
              </div>


              <div className="isoInputWrapper">
                <label>
                  <IntlMessages id="page.accountNumber" />
                </label>
                <Input size="large" placeholder="Número de cuenta" />
              </div>


              <div className="isoInputWrapper" >
                <label>
                  <IntlMessages id="page.bank" />
                </label>
                <Input size="large"
                  placeholder="Banco" />
              </div>

              

              <div className="isoInputWrapper" style={{ marginTop: 91 }}>
                <Button type="primary" className="signUp" style={{
                  height: 45
                }}>
                  <IntlMessages id="page.endButton" />
                </Button>
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
)(SignUpFinancial);
