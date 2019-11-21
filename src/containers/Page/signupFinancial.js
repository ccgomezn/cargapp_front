import React, {Component} from "react";
import {connect} from "react-redux";
import authAction from "../../redux/auth/actions";
import appActions from "../../redux/app/actions";
import IntlMessages from "../../components/utility/intlMessages";
import SignUpStyleWrapper from "./signupCompany.style";
import TextInputCustom from "../../components/custom/input/text"
import {Row, Col} from "antd";
import PrimaryButton from '../../components/custom/button/primary'
import {Redirect} from "react-router";
import {getMineUser, postUserPaymentMethod} from "../../helpers/api/users";
import {getActivePaymentMethods, postPaymentMethod} from "../../helpers/api/payments";
import SecondaryButton from "../../components/custom/button/secondary";
import CreditCardInput from "react-credit-card-input";

const {login} = authAction;
const {clearMenu} = appActions;

class SignUpFinancial extends Component {
    state = {
        redirectToReferrer: false
    };

    componentWillReceiveProps(nextProps) {
        if (
            this.props.isLoggedIn !== nextProps.isLoggedIn &&
            nextProps.isLoggedIn === true
        ) {
            this.setState({redirectToReferrer: true});
        }
    }

    handleLogin = () => {
        const {login, clearMenu} = this.props;
        login();
        clearMenu();
        this.props.history.push("/dashboard");
    };

    handleChange(value, type) {

        this.setState(
            {
                [type]: value
            }
        )
    }


    componentDidMount() {
        getActivePaymentMethods().then((response) => {
            this.setState({payment_methods: response.data})
        })
    }

    handlePost(generator) {

        getMineUser().then((response) => {
            if (!generator) {
                postPaymentMethod({
                    payment_method: {
                        uuid: this.state.account_number,
                        description: this.state.account_type + this.state.bank,
                        name: 'Cuenta de ahorros',
                        user_id: response.data.user.id
                    }
                }).then((response) => {
                    this.props.history.push('/')
                })
            } else {
                postUserPaymentMethod({
                    user_payment_method: {
                        payment_method_id: 2,
                        card_number: this.state.card_number,
                        cvv: this.state.cvv,
                        expiration: this.state.expiration,
                        user_id: response.data.user.id

                    }
                }).then((response) => {
                    this.props.history.push('/')
                })
            }

        })

    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={'/'}/>
        }
        const {generator} = this.props;
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
                                                <IntlMessages id="page.closer"/>

                                                <div class="text-style-1">
                                                    <IntlMessages id="page.future"/>
                                                </div>
                                            </div>
                                        </div>

                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <div class="Una-solucin-digital">
                                            <IntlMessages id="page.relation"/>
                                        </div>
                                    </Col>
                                </Row>

                            </div>

                        </div>

                        <div className="isoLogoWrapper2">
                            <hr/>

                            <div>
                                <Row>
                                    <Col span={24}>
                                        <p className="title">
                                            <IntlMessages id="page.financial.title"/>
                                        </p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <p className="subtitle">
                                            <IntlMessages id="page.financial.subtitle"/>
                                        </p>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        {!generator &&
                        <div className="isoSignUpForm">

                            <div className="isoInputWrapper">
                                <TextInputCustom value={this.state.account_type} placeholder="tipo de cuenta"
                                                 label_id="admin.title.bankAccountType"

                                                 onChange={(e) => this.handleChange(e.target.value, 'account_type')}
                                                 required/>

                            </div>

                            <div className="isoInputWrapper">
                                <TextInputCustom label_id='page.accountNumber' placeholder='Número de cuenta'
                                                 value={this.state.account_number}
                                                 onChange={(e) => this.handleChange(e.target.value, 'account_number')}
                                                 required/>


                            </div>


                            <div className="isoInputWrapper">
                                <TextInputCustom value={this.state.bank} placeholder="banco"
                                                 label_id="admin.title.bank"

                                                 onChange={(e) => this.handleChange(e.target.value, 'bank')}
                                                 required/>

                            </div>


                            <div className="sign-buttons">
                                <Row>
                                    <Col align={'right'}>

                                        <PrimaryButton message_id="page.end" onClick={() => this.handlePost()}/>


                                    </Col>
                                </Row>
                            </div>
                            <div className="footer">
                                <Row>
                                    <Col span={24} align={'center'}>
                                        <IntlMessages id="app.footer"/>

                                    </Col>
                                </Row>

                            </div>

                        </div>}

                        {generator &&
                        <div className="isoSignUpForm">



                            <Row style={{marginTop: '10px'}}>
                                <Col span={24}>
                                    <CreditCardInput
                                        containerStyle={{width: '100%', height: '40px'}}
                                        fieldStyle={{height: '40px'}}
                                        inputStyle={{height: '40px', border: '13px'}}
                                        cardNumberInputProps={{ value: this.state.number, onChange: (e) => this.handleChange(e.target.value, 'card_number')}}
                                        cardExpiryInputProps={{ value: this.state.number, onChange: (e) => this.handleChange(e.target.value, 'expiration') }}
                                        cardCVCInputProps={{ value: this.state.number, onChange: (e) => this.handleChange(e.target.value, 'cvv') }}
                                        fieldClassName="input"
                                        customTextLabels={{
                                            invalidCardNumber: 'El número de la tarjeta es inválido',
                                            expiryError: {
                                                invalidExpiryDate: 'La fecha de expiración es inválida',
                                                monthOutOfRange: 'El mes de expiración debe estar entre 01 y 12',
                                                yearOutOfRange: 'El año de expiración no puede estar en el pasado',
                                                dateOutOfRange: 'La fecha de expiración no puede estar en el pasado'
                                            },
                                            invalidCvc: 'El código de seguridad es inválido',
                                            invalidZipCode: 'El código postal es inválido',
                                            cardNumberPlaceholder: 'Número de tarjeta',
                                            expiryPlaceholder: 'MM/AA',
                                            cvcPlaceholder: 'CVV',
                                            zipPlaceholder: 'C.P.'
                                        }}
                                    />
                                </Col>
                            </Row>



                            <div className="sign-buttons">
                                <Row>
                                    <Col span={24} align={'right'}>
                                        <div style={{ display: 'inline-block'}}>
                                            <SecondaryButton message_id="page.skip"
                                                             style={{width: '130px', marginRight: '10px'}}
                                                             onClick={() => this.props.history.push("/")}/>
                                        </div>
                                        <div style={{ display: 'inline-block'}}>
                                            <PrimaryButton message_id="page.end"
                                                           style={{width: '130px'}}
                                                           onClick={() => this.handlePost(true)}/>

                                        </div>


                                    </Col>
                                </Row>
                            </div>
                            <div className="footer">
                                <Row>
                                    <Col span={24} align={'center'}>
                                        <IntlMessages id="app.footer"/>

                                    </Col>
                                </Row>

                            </div>

                        </div>}

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
    {login, clearMenu}
)(SignUpFinancial);
