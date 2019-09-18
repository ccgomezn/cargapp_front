import React, {Component} from "react";
import {connect} from "react-redux";
import authAction from "../../redux/auth/actions";
import appActions from "../../redux/app/actions";
import IntlMessages from "../../components/utility/intlMessages";
import SignUpStyleWrapper from "./signup.style";
import {Row, Col} from "antd";
import {Radio, message} from 'antd';
import PrimaryButton from '../../components/custom/button/primary'
import SecondaryButton from "../../components/custom/button/secondary";
import TextInputCustom from '../../components/custom/input/text'
import axios from 'axios';
import httpAddr from "../../helpers/http_helper"
import {Redirect} from 'react-router-dom'
import importantVariables from '../../helpers/hashVariables'
import {verifyEmail} from "../../helpers/api/adminCalls";

const {login} = authAction;
const {clearMenu} = appActions;

class SignUp extends Component {

    state = {
        redirect: false,
        duplicated: false,
        email: '',
        password: '',
        password_confirmation: ''
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
        this.props.history.push("/signin")
    };

    handleChange(value, type) {
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
        this.setState(
            {
                [type]: value
            }
        )
    }

    handlePostRegister() {
        if (this.state.email === '' || this.state.password === '' || this.state.password_confirmation === '') {
            return null;
        }
        axios.post(httpAddr + '/users/email_verify', {
            user: {
                email: this.state.email
            }
        }).then((response) => {
            console.log(response);
            if (response.status === 200) {
                message.warning('El usuario ya existe en el sistema');
            }
        }).catch(error => {
            console.log(error);
            let errorObject = JSON.parse(JSON.stringify(error));
            if (error.response.status === 302) {
                if (this.state.password !== this.state.password_confirmation) {
                    message.warning('La contraseña no coincide');
                } else {
                    axios.post(httpAddr + '/users',
                        {
                            user: {
                                email: this.state.email,
                                password: this.state.password,
                                password_confirmation: this.state.password_confirmation,

                            }
                        }).then((response) => {
                        axios.post(httpAddr + '/user_roles',
                            {
                                user_role: {
                                    user_id: response.data.id,
                                    role_id: importantVariables.user_role_id,
                                }
                            }).then(() => {
                            message.success('El usuario fue cerado correctamente');
                            this.setState({redirect: true})
                        })
                    }).catch(() => {
                        message.warning('La contraseña no cumple los criterios');
                    });
                }

            } else {

                message.warning(errorObject.message);
            }

        });

    }

    render() {
        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to='/signin'/>
        }

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
                                    <Radio.Group defaultValue="a">

                                        <Col span={11}>
                                            <Radio.Button value="a" className="buttonSelect">
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
                                            <Radio.Button value="b" className="buttonSelect">
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
                                        <TextInputCustom required label_id={this.state.duplicated?'page.emailDuplicated':'page.email'} value={this.state.email}
                                                         placeholder='Correo eléctronico'
                                                         onChange={(e) => this.handleChange(e.target.value, 'email')}/>
                                    </div>
                                    <div className="isoInputWrapper">
                                        <TextInputCustom required label_id='page.password' value={this.state.password}
                                                         placeholder='Contraseña' type='password'
                                                         onChange={(e) => this.handleChange(e.target.value, 'password')}/>
                                    </div>
                                    <div className="isoInputWrapper">
                                        <TextInputCustom required label_id='page.passwordConfirmation'
                                                         value={this.state.password_confirmation}
                                                         placeholder='Contraseña' type='password'
                                                         onChange={(e) => this.handleChange(e.target.value, 'password_confirmation')}/>
                                    </div>

                                </div>


                                <div className="sign-buttons">
                                    <Row>
                                        <Col span={24} align={'right'}>
                                            <div className="button-sign" style={{marginRight: '10px'}}>
                                                <SecondaryButton message_id="sidebar.signin"
                                                                 onClick={() => this.handleLogin()}/>

                                            </div>

                                            <div className="button-sign">

                                                <PrimaryButton disabled={this.state.duplicated} message_id="page.signup"
                                                               onClick={() => this.handlePostRegister()}/>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </form>


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
        );
    }
}

export default connect(
    state => ({
        isLoggedIn: state.Auth.idToken !== null ? true : false
    }),
    {login, clearMenu}
)(SignUp);
