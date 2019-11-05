import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import authAction from "../../redux/auth/actions";
import appAction from "../../redux/app/actions";
import IntlMessages from "../../components/utility/intlMessages";
import SignInStyleWrapper from "./signin.style";
import {Row, Col, message, Spin} from "antd";
import Modal from "../../components/feedback/modal";
import PrimaryButton from '../../components/custom/button/primary'
import SecondaryButton from '../../components/custom/button/secondary'
import TextInputCustom from '../../components/custom/input/text'
import {validateEmail} from "../../helpers/validations";
import {changePassword, recoverPassword} from "../../helpers/api/users";

const {login} = authAction;
const {clearMenu} = appAction;

class SignIn extends Component {
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


    handleRecover = (e) => {

        if (!validateEmail(this.state.email)) {
            message.warning('El correo no es valido');
            return null;
        }
        console.log(this.state.email);
        recoverPassword({user: {email: this.state.email, notify: 'phone'}}).then((response) => {
            this.setState({visible: true});
        })

    };

    handleChange(value, type) {
        this.setState(
            {
                [type]: value
            }
        )
    }

    goLogin() {
        this.props.history.push("/signin")
    }

    handleResetPassword() {
        if (this.state.password.length < 6) {
          message.warning('La contraseña es muy corta');
        }else if(this.state.password !== this.state.password_confirmation) {
          message.warning('La contraseña no coincide');
        }else {
          changePassword({
            user:{
              email: this.state.email,
              pin: this.state.pin,
              new_password: this.state.password,
              new_password_confirmation:  this.state.password_confirmation
            }
          }).then(response => {
            if(response.status === 200){
              message.success('Contraseña actualizada');
              this.props.history.push("/signin");
            }else{
              message.warning('Los datos ingresados no son correctos')
            }

          })
        }
    }


render()
{
    const from = {pathname: "/dashboard"};
    const {redirectToReferrer} = this.state;

    if (redirectToReferrer) {
        return <Redirect to={from}/>;
    }
    return (
        <Spin spinning={this.props.loading > 0}>
            <SignInStyleWrapper className="isoSignInPage">
                <div className="isoLoginContentWrapper">
                    <div className="isoLoginContent">

                        <div className="isoLogoWrapper">
                            <div>
                                <Row>
                                    <Col span={24}>
                                        <div>
                                            <div class="Bienvenido-a-Cargapp">
                                                <IntlMessages id="page.recover"/>

                                                <div class="text-style-1">
                                                    <IntlMessages id="page.password"/>
                                                </div>
                                            </div>
                                        </div>

                                    </Col>
                                </Row>

                            </div>
                        </div>
                        <div className="isoSignInForm">

                            <div className="isoInputWrapper">
                                <TextInputCustom required label_id='page.email' value={this.state.email}
                                                 onChange={(e) => this.handleChange(e.target.value, 'email')}
                                                 placeholder='Correo eléctronico'/>
                            </div>


                            <div className="sign-buttons">
                                <Row>
                                    <Col align={'right'}>
                                        <div className="button-sign" style={{marginRight: '10px'}}>
                                            <SecondaryButton message_id="page.back"
                                                             onClick={() => this.goLogin()}/>

                                        </div>

                                        <div className="button-sign">

                                            <PrimaryButton message_id="sidebar.recover"
                                                           onClick={(e) => this.handleRecover(e)}/>
                                        </div>

                                    </Col>
                                </Row>
                                <hr/>
                            </div>
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
                                                de llegar a tu celular y tu nueva contraseña</h2>
                                        </Row>

                                        <Row style={{marginTop: '20px'}}>
                                            <TextInputCustom
                                                value={this.state.pin}
                                                placeholder={'Pin'}
                                                label_id={'Signup.pin'}
                                                onChange={(e) => this.handleChange(e.target.value, 'pin')}/>
                                        </Row>
                                        <Row style={{marginTop: '20px'}}>
                                            <TextInputCustom
                                                value={this.state.password}
                                                placeholder={'Contraseña'}
                                                type='password'
                                                label_id={'Signup.password'}
                                                onChange={(e) => this.handleChange(e.target.value, 'password')}/>
                                        </Row>
                                        <Row style={{marginTop: '20px'}}>
                                            <TextInputCustom
                                                value={this.state.password_confirmation}
                                                placeholder={'Confirmación Contraseña'}
                                                type='password'
                                                label_id={'Signup.passwordConfirmation'}
                                                onChange={(e) => this.handleChange(e.target.value, 'password_confirmation')}/>
                                        </Row>

                                        <PrimaryButton message_id={'page.confirm'}
                                                       onClick={() => this.handleResetPassword()}
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
            </SignInStyleWrapper>
        </Spin>

    );
}
}

export default connect(
    state => ({
        loading: state.App.loading,
        isLoggedIn: state.Auth.idToken !== null ? true : false
    }),
    {login, clearMenu}
)(SignIn);
