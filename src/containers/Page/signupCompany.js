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

class SignUpCompany extends Component {
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
                      <IntlMessages id="page.company.title" />
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col span={24} >
                    <p className="subtitle">
                      <IntlMessages id="page.company.subtitle" />
                    </p>
                  </Col>
                </Row>
              </div>
            </div>

            <div className="isoSignUpForm">
              <div className="isoInputWrapper" style={{ marginTop: 15 }}>
                <label>
                  <IntlMessages id="page.companyName" />
                </label>
                <Input size="large" placeholder="Nombre de la empresa" />
              </div>


              <div className="isoInputWrapper">
                <label>
                  <IntlMessages id="page.nit" />
                </label>
                <Input size="large" placeholder="NIT" />
              </div>


              <div className="isoInputWrapper" >
                <label>
                  <IntlMessages id="page.contactPhone" />
                </label>
                <Input size="large"
                  placeholder="Teléfono de contacto" />
              </div>

              <div className="isoInputWrapper" >
                <label>
                  <IntlMessages id="page.dato1" />
                </label>
                <Input size="large"
                  placeholder="Dato 1" />
              </div>


              <div className="sign-buttons">
                <Row>
                  <Col align={'right'}>
                    
                    <Button className="sign-in">
                      <IntlMessages id="page.continue" />

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
)(SignUpCompany);
