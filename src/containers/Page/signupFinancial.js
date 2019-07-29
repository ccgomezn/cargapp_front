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
import SelectInputCustom from "../../components/custom/input/select"
import TextInputCustom from "../../components/custom/input/text"
import { Row, Col } from "antd";
import { rgb } from "polished";
import PrimaryButton from '../../components/custom/button/primary'

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
                <SelectInputCustom label_id='page.paymentMethod' placeholder='Medio de pago' options={
                  <option value="Cuenta de ahorros">Cuenta de ahorros</option>
                }/>
                
              </div>


              <div className="isoInputWrapper">
                <TextInputCustom label_id='page.accountNumber' placeholder='Número de cuenta' />

               
              </div>


              <div className="isoInputWrapper">
                <SelectInputCustom label_id='page.bank' placeholder='Banco' options={
                  <option value="Davivienda">Davivienda</option>
                } />
              </div>

              

              <div className="sign-buttons">
                <Row>
                  <Col align={'right'}>

                    <PrimaryButton message_id="page.end" />


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
