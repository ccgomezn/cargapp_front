import React, { Component } from "react";
import { connect } from "react-redux";
import authAction from "../../redux/auth/actions";
import appActions from "../../redux/app/actions";
import IntlMessages from "../../components/utility/intlMessages";
import SignUpStyleWrapper from "./signupCompany.style";
import SelectInputCustom from "../../components/custom/input/select"
import TextInputCustom from "../../components/custom/input/text"
import { Row, Col } from "antd";
import PrimaryButton from '../../components/custom/button/primary'
import {postPaymentMethod} from "../../helpers/api/adminCalls";

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

  handlePost(){
    postPaymentMethod({payment_method: {
      uuid: this.state.account_number,
        description: this.state.bank
      }})
  }

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



              <div className="isoInputWrapper">
                <TextInputCustom label_id='page.accountNumber' placeholder='Número de cuenta'
                                 value={this.state.account_number}
                                 onChange={(e) => this.handleChange(e.target.value, 'account_number')}
                                 required />


              </div>


              <div className="isoInputWrapper">
                <TextInputCustom value={this.state.bank} placeholder="banco"
                                 label_id="admin.title.bank"

                                 onChange={(e) => this.handleChange(e.target.value, 'bank')}
                                 required />

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
