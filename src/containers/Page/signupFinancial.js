import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Input from "../../components/uielements/input";
import Select from "../../components/uielements/select";
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
                    <div>
                      <div class="Bienvenido-a-Cargapp">
                        <IntlMessages id="page.closer" />

                        <div class="text-style-1">
                          <IntlMessages id="page.future" />
                        </div>
                      </div>
                    </div>

                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <div class="Una-solucin-digital">
                      <IntlMessages id="page.relation" />
                    </div>
                  </Col>
                </Row>

              </div>

            </div>

            <div className="isoLogoWrapper2">
              <hr />

              <div>
                <Row>
                  <Col span={24}>
                    <p className="title">
                      <IntlMessages id="page.financial.title" />
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
                <Select
                  labelInValue
                  placeholder="Medio de pago"
                  block
                >
                  <option value="Cuenta de ahorros">Cuenta de ahorros</option>
                </Select>
              </div>


              <div className="isoInputWrapper">
                <label>
                  <IntlMessages id="page.accountNumber" />
                </label>
                <Input size="large" placeholder="Número de cuenta" />
              </div>


              <div className="isoInputWrapper">
                <label>
                  <IntlMessages id="page.bank" />
                </label>
                <Select
                  labelInValue
                  placeholder="Banco"
                  block
                >
                  <option value="Davivienda">Davivienda</option>
                </Select>
              </div>

              

              <div className="sign-buttons">
                <Row>
                  <Col align={'right'}>

                    <Button className="sign-in">
                      <IntlMessages id="page.end" />

                    </Button>

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
)(SignUpFinancial);
