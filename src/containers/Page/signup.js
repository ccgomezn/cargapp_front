import React, {Component} from "react";
import {connect} from "react-redux";
import IntlMessages from "../../components/utility/intlMessages";
import SignUpStyleWrapper from "./signup.style";
import {Row, Col, Select, Spin} from "antd";
import {Radio, message} from 'antd';
import PrimaryButton from '../../components/custom/button/primary'
import SecondaryButton from "../../components/custom/button/secondary";
import TextInputCustom from '../../components/custom/input/text'
import httpAddr from "../../helpers/http_helper"
import {Redirect} from 'react-router-dom'
import {
    confirmUser,
    getActiveCountries,
    resendCode,
    verifyEmail,
    verifyPhoneNumber
} from "../../helpers/api/adminCalls";
import SelectInputCustom from "../../components/custom/input/select";
import {transformInputData} from "../../helpers/utility";
import Modal from "../../components/feedback/modal";
import {post} from "../../helpers/httpRequest";
import {validateEmail} from "../../helpers/validations";
import authAction from "../../redux/auth/actions";

const {Option} = Select;
const {login} = authAction;

class SignUp extends Component {

    state = {
        redirect: false,
        duplicated: false,
        duplicated_phone: false,
        email: '',
        password: '',
        password_confirmation: '',
        role_id: 15,
        mobile_code: "57",
        visible: false,
    };

    componentWillReceiveProps(nextProps) {
        if (
            this.props.isLoggedIn !== nextProps.isLoggedIn &&
            nextProps.isLoggedIn === true
        ) {
            this.setState({redirectToReferrer: true});
        }


    }

    componentDidMount() {
        getActiveCountries().then((response) => {
            this.setState({
                countries: response.data
            })
        });


    }

    handleLoginRedirect = () => {
        this.props.history.push("/signin")
    };

    handleLogin() {
        const {login} = this.props;

        return login({
            user: {
                email: this.state.email.trim(),
                password: this.state.password.trim()
            },
            redirect_url: '/signup_company',
            history: this.props.history

        }, httpAddr + '/users/login', httpAddr + '/users/me')
    }

    handleConfirmUser() {
        confirmUser({
            user: {
                phone_number: parseInt(transformInputData(this.state.country_code) + this.state.phone_number),
                mobile_code: this.state.pin
            }
        }).then((response) => {
            if (response.status === 200) {
                message.success("Usuario registrado correctamente");
                this.handleLogin();
            } else {
                message.warning("Codigo incorrecto");
            }
        })
    }

    handleResendCode() {
        resendCode({
                user:
                    {
                        phone_number: parseInt(transformInputData(this.state.country_code) + this.state.phone_number)
                    }

            }
        ).then(
            message.success("Codigo reenviado")
        )
    }

    handleChange(value, type) {
        this.setState(
            {
                [type]: value
            }
        );
        if (type === 'email') {
            if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
                verifyEmail(value).then((response) => {
                    if (response.data.email) {

                        this.setState({duplicated: true});
                    } else {
                        this.setState({duplicated: false});
                    }
                })
            }
        }
        if (type === 'phone_number') {
            if (/^\d{10}\d+$/.test(transformInputData(this.state.country_code) + value)) {
                verifyPhoneNumber(parseInt(transformInputData(this.state.country_code) + value)).then((response) => {
                    if (response.data.phone_number) {

                        this.setState({duplicated_phone: true});
                    } else {
                        this.setState({duplicated_phone: false});
                    }
                })
            }
        } else if (type === 'country_code') {
            if (/^\d{10}\d+$/.test(transformInputData(value) + this.state.phone_number)) {
                verifyPhoneNumber(parseInt(transformInputData(value) + this.state.phone_number)).then((response) => {
                    if (response.data.phone_number) {

                        this.setState({duplicated_phone: true});
                    } else {
                        this.setState({duplicated_phone: false});
                    }
                })
            }
        }

    }


    handlePostRegister() {
        if (this.state.email === '' || this.state.password === '' || this.state.password_confirmation === '') {
            return null;
        }
        post(httpAddr + '/users/email_verify', {
            user: {
                email: this.state.email
            }
        }, false).then((response) => {
            if (response.status === 200) {
                message.warning('El usuario ya existe en el sistema');
            } else if (response.status === 302) {
                if (this.state.password !== this.state.password_confirmation) {
                    message.warning('La contraseña no coincide');
                } else {
                    post(httpAddr + '/users',
                        {
                            user: {
                                email: this.state.email,
                                password: this.state.password,
                                identification: this.state.identification,
                                phone_number: parseInt(transformInputData(this.state.country_code) + this.state.phone_number),
                                password_confirmation: this.state.password_confirmation,
                                role_id: this.state.role_id
                            }
                        }, false).then(() => {
                        this.setState({visible: true})

                    }).catch((error) => {
                        message.warning("Error al crear el usuario");
                    })
                }

            }
        }).catch(error => {
            let errorObject = JSON.parse(JSON.stringify(error));

            message.warning(errorObject.message);


        });

    }

    render() {
        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to='/signin'/>
        }



        console.log(this.props.loading);

        return (
            <Spin spinning={this.props.loading > 0}>

                <SignUpStyleWrapper className="isoSignUpPage">
                    <div className="isoSignUpContentWrapper">
                        <div className="isoSignUpContent">
                            <div className="isoLogoWrapper">
                                <div>
                                    <Row>
                                        <Col span={24}>
                                            <div>
                                                <div class="Bienvenido-a-Cargapp">
                                                    <IntlMessages id="page.welcomeTo"/>

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
                                                <IntlMessages id="page.signInSubtitle"/>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>

                            <div className="isoSignUpForm">
                                <div className="isoSelectWrapper">
                                    <Row>
                                        <Radio.Group defaultValue={15}
                                                     onChange={(e) => this.handleChange(e.target.value, 'role_id')}>

                                            <Col span={11}>
                                                <Radio.Button value={15} className="buttonSelect">
                                                    <div className="isoCenterComponent">
                                                        <div>
                                                            <p className="title">
                                                                <IntlMessages id="page.admin"/>
                                                            </p>

                                                            <p className="subtitle">
                                                                <IntlMessages id="page.adminSub"/>
                                                            </p>
                                                        </div>

                                                    </div>
                                                </Radio.Button>
                                            </Col>
                                            <Col span={2}></Col>
                                            <Col span={11}>
                                                <Radio.Button value={27} className="buttonSelect">
                                                    <div className="isoCenterComponent">
                                                        <div>
                                                            <p className="title">
                                                                <IntlMessages id="page.oper"/>
                                                            </p>
                                                            <p className="subtitle">
                                                                <IntlMessages id="page.operSub"/>
                                                            </p>
                                                        </div>

                                                    </div>
                                                </Radio.Button>
                                            </Col>
                                        </Radio.Group>
                                    </Row>

                                </div>
                                <form autoComplete="new-password">

                                    <div className="formData">

                                        <div className="isoInputWrapper">
                                            <TextInputCustom required
                                                             label_id={this.state.duplicated ? 'page.emailDuplicated' : 'page.email'}
                                                             value={this.state.email}
                                                             placeholder='Correo eléctronico'
                                                             onChange={(e) => this.handleChange(e.target.value, 'email')}/>
                                        </div>
                                        <div className="isoInputWrapper">
                                            <TextInputCustom required label_id='page.password'
                                                             value={this.state.password}
                                                             placeholder='Contraseña' type='password'
                                                             onChange={(e) => this.handleChange(e.target.value, 'password')}/>
                                        </div>
                                        <div className="isoInputWrapper">
                                            <TextInputCustom required label_id='page.passwordConfirmation'
                                                             value={this.state.password_confirmation}
                                                             placeholder='Contraseña' type='password'
                                                             onChange={(e) => this.handleChange(e.target.value, 'password_confirmation')}/>
                                        </div>
                                        <div className="isoInputWrapper">
                                            <Row>
                                                {this.state.countries && <Col span={6}>
                                                    <SelectInputCustom placeholder={'page.country'}
                                                                       label_id={'page.country'}
                                                                       onChange={(e) => {
                                                                           this.handleChange(e, 'country_code')
                                                                       }}
                                                                       defaultValue={{key: 57}}
                                                                       value={this.state.country_code}
                                                                       options={this.state.countries.map((item) => {
                                                                           return <Option
                                                                               value={item.code}><img alt={""}
                                                                                                      style={{
                                                                                                          width: '10px',
                                                                                                          height: '10px'
                                                                                                      }}
                                                                                                      src={item.image}/> +{item.code}
                                                                           </Option>
                                                                       })}/>
                                                </Col>}

                                                <Col span={18}>
                                                    <TextInputCustom required
                                                                     label_id={this.state.duplicated_phone ? 'page.phoneDuplicated' : 'page.phone'}
                                                                     value={this.state.phone_number}
                                                                     placeholder='Número de teléfono'
                                                                     onChange={(e) => this.handleChange(e.target.value, 'phone_number')}/>
                                                </Col>

                                            </Row>

                                        </div>
                                        <div className="isoInputWrapper">
                                            <TextInputCustom required label_id={'page.identification'}
                                                             value={this.state.identification}
                                                             placeholder='Número de identificación'
                                                             onChange={(e) => this.handleChange(e.target.value, 'identification')}/>
                                        </div>
                                    </div>


                                    <div className="sign-buttons">
                                        <Row>
                                            <Col span={24} align={'right'}>
                                                <div className="button-sign" style={{marginRight: '10px'}}>
                                                    <SecondaryButton message_id="sidebar.signin"
                                                                     onClick={() => this.handleLoginRedirect()}/>

                                                </div>

                                                <div className="button-sign">

                                                    <PrimaryButton
                                                        disabled={this.state.duplicated || this.state.duplicated_phone}
                                                        message_id="page.signup"
                                                        onClick={() => this.handlePostRegister()}/>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </form>
                                <Modal
                                    title="Ingresa el pin"
                                    visible={this.state.visible}
                                    cancelText={'Cancelar'}
                                    style={{width: '100%'}}
                                    image={'smartphone.svg'}
                                    body={
                                        <div>
                                            <Row type="flex" style={{textAlign: 'center', justifyContent: 'center'}}>
                                                <h1>Ingresa el pin</h1>

                                            </Row>

                                            <Row type={"flex"} style={{
                                                textAlign: 'center',
                                                justifyContent: 'center',
                                                marginTop: '-20px'
                                            }}>
                                                <h2>Debes ingresar el pin que te acaba
                                                    de llegar a tu celular para validar</h2>
                                            </Row>

                                            <Row style={{marginTop: '20px'}}>
                                                <TextInputCustom
                                                    value={this.state.pin}
                                                    placeholder={'Pin'}
                                                    label_id={'Signup.pin'}
                                                    onChange={(e) => this.handleChange(e.target.value, 'pin')}/>
                                            </Row>

                                            <PrimaryButton message_id={'page.confirm'}
                                                           onClick={() => this.handleConfirmUser()}
                                                           style={{marginTop: '20px', width: '100% '}}/>
                                            <SecondaryButton message_id={'page.sendAgain'}
                                                             onClick={() => this.handleResendCode()}
                                                             style={{marginTop: '20px', width: '100% '}}/>
                                        </div>
                                    }
                                />

                                <div className="footer">
                                    <Row>
                                        <Col span={24} align={'center'}>
                                            <IntlMessages id="app.footer"/>

                                        </Col>
                                    </Row>

                                </div>
                            </div>

                        </div>
                    </div>
                </SignUpStyleWrapper>
            </Spin>

        );
    }
}

export default connect(
    state => ({
        loading: state.App.loading,
        isLoggedIn: state.Auth.idToken !== null
    }),
    {login}
)(SignUp);
