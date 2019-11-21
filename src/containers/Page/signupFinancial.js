import React, {Component} from "react";
import {connect} from "react-redux";
import authAction from "../../redux/auth/actions";
import appActions from "../../redux/app/actions";
import IntlMessages from "../../components/utility/intlMessages";
import SignUpStyleWrapper from "./signupCompany.style";
import TextInputCustom from "../../components/custom/input/text"
import {Row, Col, Form, Select} from "antd";
import PrimaryButton from '../../components/custom/button/primary'
import {Redirect} from "react-router";
import {getMineUser, postUserPaymentMethod} from "../../helpers/api/users";
import {getActivePaymentMethods, postBankAccount, postPaymentMethod} from "../../helpers/api/payments";
import SecondaryButton from "../../components/custom/button/secondary";
import CreditCardInput from "react-credit-card-input";
import axios from "axios";
import {findParameters} from "../../helpers/api/internals";
import SelectInputCustom from "../../components/custom/input/select";
import {transformInputData} from "../../helpers/utility";

const {login} = authAction;
const {clearMenu} = appActions;
const {Option} = Select;

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
        axios.all([getActivePaymentMethods(), findParameters('ACCOUNT_TYPE'), findParameters('BANK')])
            .then((responses) => {

                this.setState({payment_methods: responses[0].data})

                let account_types = [];

                responses[1].data.parameters.forEach(parameter => {
                    account_types.push(parameter.name)
                });
                let banks = [];

                responses[2].data.parameters.forEach(bank => {
                    banks.push(bank.name)
                })
                this.setState({banks: banks, account_types: account_types})
            })
    }

    handlePost(generator) {

        getMineUser().then((response) => {
            if (!generator) {
                postBankAccount({
                    bank_account: {
                        account_number: this.state.account_number,
                        account_type: transformInputData(this.state.account_type),
                        bank: transformInputData(this.state.bank),
                        user_id: response.data.user.id,
                        statu_id: 15,
                        active: true
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

                                    <SelectInputCustom value={this.state.account_type} placeholder="Tipo de cuenta"
                                                       style={{width: '100%'}} onChange={(e) => {
                                        this.handleChange(e, 'account_type')
                                    }}
                                                       options={this.state && this.state.account_types &&

                                                       this.state.account_types.map((item) => {
                                                           return <Option
                                                               value={item}>{item}</Option>
                                                       })
                                                       }
                                                       label_id={'admin.title.bankAccountType'}>

                                    </SelectInputCustom>




                            </div>

                            <div className="isoInputWrapper">
                                <TextInputCustom label_id='page.accountNumber' placeholder='Número de cuenta'
                                                 value={this.state.account_number}
                                                 onChange={(e) => this.handleChange(e.target.value, 'account_number')}
                                                 required/>


                            </div>


                            <div className="isoInputWrapper">


                                    <SelectInputCustom value={this.state.bank} placeholder="Banco"
                                                       style={{width: '100%'}} onChange={(e) => {
                                        this.handleChange(e, 'bank')
                                    }}
                                                       options={this.state && this.state.banks &&

                                                       this.state.banks.map((item) => {
                                                           return <Option
                                                               value={item}>{item}</Option>
                                                       })
                                                       }
                                                       label_id={'admin.title.bank'}>

                                    </SelectInputCustom>






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
                                        cardNumberInputProps={{
                                            value: this.state.number,
                                            onChange: (e) => this.handleChange(e.target.value, 'card_number')
                                        }}
                                        cardExpiryInputProps={{
                                            value: this.state.number,
                                            onChange: (e) => this.handleChange(e.target.value, 'expiration')
                                        }}
                                        cardCVCInputProps={{
                                            value: this.state.number,
                                            onChange: (e) => this.handleChange(e.target.value, 'cvv')
                                        }}
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
                                        <div style={{display: 'inline-block'}}>
                                            <SecondaryButton message_id="page.skip"
                                                             style={{width: '130px', marginRight: '10px'}}
                                                             onClick={() => this.props.history.push("/")}/>
                                        </div>
                                        <div style={{display: 'inline-block'}}>
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
