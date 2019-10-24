import React, {Component} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import {Row, Col, Form, Card, Select, message } from 'antd';
import Modal from '../../../../components/feedback/modal';
import basicStyle from '../../../../settings/basicStyle';
import PrimaryButton from "../../../../components/custom/button/primary"
import {Redirect} from 'react-router-dom'
import TextInputCustom from "../../../../components/custom/input/text";
import axios from 'axios';
import {
    confirmUser,
    getActiveCountries,
    getMineCompanies, postDocument,
    postUserCompany, resendCode,
    verifyEmail,
    verifyPhoneNumber
} from "../../../../helpers/api/adminCalls";
import SelectInputCustom from "../../../../components/custom/input/select";
import {transformInputData} from "../../../../helpers/utility";
import {post} from "../../../../helpers/httpRequest";
import httpAddr from "../../../../helpers/http_helper";
import SecondaryButton from "../../../../components/custom/button/secondary";

const {Option} = Select;
export default class DriverCreate extends Component {


    constructor() {
        super();
        this.state = {
            redirect: false,
            duplicated: false,
            duplicated_phone: false,
        }
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
                this.setState({
                    redirect: true
                });
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
            if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w+)+$/.test(value)) {
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


    handlePost() {
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
                                identification:this.state.identification,
                                phone_number: parseInt(transformInputData(this.state.country_code) + this.state.phone_number),
                                password_confirmation: this.state.password_confirmation,
                                role_id: 11
                            }
                        }, false).then((response) => {
                        this.setState({userId: response.data.id});

                        getMineCompanies().then((response) => {
                            postUserCompany({
                                company_user: {
                                    user_id: this.state.userId,
                                    company_id: 2
                                }
                            }).then(() => {

                                let setCC = function(){
                                };
                                let setLC = function(){
                                };

                                if(this.state.cc_front && this.state.cc_back){
                                    let that = this;
                                    setCC = function(){
                                        const formData = new FormData();
                                        formData.append('document[document_type_id]', 5);
                                        formData.append('document[file]', that.state.cc_front, that.state.cc_front.name);
                                        formData.append('document[statu_id]', 13);
                                        formData.append('document[active]', true);
                                        formData.append('document[user_id]', that.state.userId);
                                        postDocument(formData).then(() => {
                                            const formDataBack = new FormData();
                                            formDataBack.append('document[document_type_id]', 7);
                                            formDataBack.append('document[file]', that.state.cc_back, that.state.cc_back.name);
                                            formDataBack.append('document[statu_id]', 13);
                                            formDataBack.append('document[active]', true);
                                            formDataBack.append('document[user_id]', this.state.userId);
                                            postDocument(formDataBack)
                                        })
                                    }
                                }

                                if(this.state.lc_front && this.state.lc_back){
                                    let that = this;
                                    setLC = function(){
                                        const formData = new FormData();
                                        formData.append('document[document_type_id]', 4);
                                        formData.append('document[file]', that.state.lc_front, that.state.lc_front.name);
                                        formData.append('document[statu_id]', 13);
                                        formData.append('document[active]', true);
                                        formData.append('document[user_id]', that.state.userId);
                                        postDocument(formData).then(() => {
                                            const formDataBack = new FormData();
                                            formDataBack.append('document[document_type_id]', 8);
                                            formDataBack.append('document[file]', that.state.lc_back, that.state.lc_back.name);
                                            formDataBack.append('document[statu_id]', 13);
                                            formDataBack.append('document[active]', true);
                                            formDataBack.append('document[user_id]', that.state.userId);
                                            postDocument(formDataBack)
                                        })
                                    }
                                }

                                axios.all([setCC(), setLC()]).then(()=>{
                                    message.success('Usuario creado correctamente');
                                    this.setState({visible: true});

                                }).catch((error) => {
                                    message.warning("Error al crear el usuario");
                                });

                            });
                        });


                    })
                        .catch((error) => {
                            message.warning("Error al crear el usuario");
                        })
                }

            }
        }).catch(error => {
            let errorObject = JSON.parse(JSON.stringify(error));

            message.warning(errorObject.message);


        });


    }

    componentDidMount() {
        getActiveCountries().then(response => {
            this.setState({
                countries: response.data
            })
        })
    }

    render() {
        const {rowStyle, colStyle} = basicStyle;
        const {redirect, userId} = this.state;
        if (redirect) {
            return <Redirect to={'/vehicle_manager/vehicles/add/' + userId}/>
        }
        return (

            <LayoutWrapper>


                <Row style={rowStyle} gutter={18} justify="start" block>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                <PageHeader>

                                    <h1>
                                        <IntlMessages id="driversAdd.title"/>

                                    </h1>
                                </PageHeader>
                            </Col>
                        </Row>
                        <Row>
                            <Card className="cardContent" style={{marginTop: '50px'}}>
                                <Form>

                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item
                                                label={this.state.duplicated ? "Email (el email esta duplicado)" : "Email"}>
                                                <TextInputCustom value={this.state.email} placeholder="email"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'email')}
                                                                 label_id={'admin.title.email'}
                                                                 required/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Password">
                                                <TextInputCustom type={"password"} value={this.state.password}
                                                                 placeholder="password"
                                                                 label_id={'admin.title.password'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'password')}
                                                                 required/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Confirmación de password">
                                                <TextInputCustom type={"password"}
                                                                 value={this.state.password_confirmation}
                                                                 placeholder="confirmación de password"
                                                                 label_id={'admin.title.password'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'password_confirmation')}
                                                                 required/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                label={this.state.duplicated_phone ? 'Teléfono duplicado' : 'Teléfono'}>
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
                                                                     label_id={'page.phone'}
                                                                     value={this.state.phone_number}
                                                                     placeholder='Número de teléfono'
                                                                     onChange={(e) => this.handleChange(e.target.value, 'phone_number')}/>
                                                </Col>
                                            </Form.Item>

                                        </Col>

                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={24}>
                                            <Col span={12}>
                                                <Form.Item
                                                    label={"Cédula de ciudadania"}>
                                                    <TextInputCustom value={this.state.identification} placeholder="cédula de ciudadania"
                                                                     onChange={(e) => this.handleChange(e.target.value, 'identification')}
                                                                     label_id={'admin.title.identification'}
                                                                     required/>
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item
                                                    label={"Nombre"}>
                                                    <TextInputCustom value={this.state.name} placeholder="nombre"
                                                                     onChange={(e) => this.handleChange(e.target.value, 'name')}
                                                                     label_id={'admin.title.name'}
                                                                     required/>
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item
                                                    label={"Apellido"}>
                                                    <TextInputCustom value={this.state.last_name} placeholder="apellido"
                                                                     onChange={(e) => this.handleChange(e.target.value, 'last_name')}
                                                                     label_id={'admin.title.lasName'}
                                                                     required/>
                                                </Form.Item>
                                            </Col>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={12}>
                                            <Form.Item label="Cédula de ciudadania (frontal)">
                                                <div style={{position: 'relative'}}>
                                                    <input type="file"
                                                           id="contained-button-file"
                                                           onChange={(e) => this.handleChange(e.target.files[0], 'cc_front')}
                                                           style={{
                                                               position: 'relative',
                                                               textAlign: 'right',
                                                               opacity: 0,
                                                               zIndex: 2
                                                           }}/>
                                                    <label htmlFor="contained-button-file" style={{
                                                        position: 'absolute',
                                                        top: '0px',
                                                        left: '0px',
                                                        zIndex: 1
                                                    }}>
                                                        <SecondaryButton message_id={'widget.load'}/>
                                                        {this.state.cc_front && this.state.cc_front.name}
                                                    </label>
                                                </div>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Cédula de ciudadania (tracera)">
                                                <div style={{position: 'relative'}}>
                                                    <input type="file"
                                                           id="contained-button-file"
                                                           onChange={(e) => this.handleChange(e.target.files[0], 'cc_back')}
                                                           style={{
                                                               position: 'relative',
                                                               textAlign: 'right',
                                                               opacity: 0,
                                                               zIndex: 2
                                                           }}/>
                                                    <label htmlFor="contained-button-file" style={{
                                                        position: 'absolute',
                                                        top: '0px',
                                                        left: '0px',
                                                        zIndex: 1
                                                    }}>
                                                        <SecondaryButton message_id={'widget.load'}/>
                                                        {this.state.file && this.state.file.name}
                                                    </label>
                                                </div>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col span={12}>
                                            <Form.Item label="Licencia de conducción (frontal)">
                                                <div style={{position: 'relative'}}>
                                                    <input type="file"
                                                           id="contained-button-file"
                                                           onChange={(e) => this.handleChange(e.target.files[0], 'lc_front')}
                                                           style={{
                                                               position: 'relative',
                                                               textAlign: 'right',
                                                               opacity: 0,
                                                               zIndex: 2
                                                           }}/>
                                                    <label htmlFor="contained-button-file" style={{
                                                        position: 'absolute',
                                                        top: '0px',
                                                        left: '0px',
                                                        zIndex: 1
                                                    }}>
                                                        <SecondaryButton message_id={'widget.load'}/>
                                                        {this.state.file && this.state.file.name}
                                                    </label>
                                                </div>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Licencia de conducción (tracera)">
                                                <div style={{position: 'relative'}}>
                                                    <input type="file"
                                                           id="contained-button-file"
                                                           onChange={(e) => this.handleChange(e.target.files[0], 'lc_back')}
                                                           style={{
                                                               position: 'relative',
                                                               textAlign: 'right',
                                                               opacity: 0,
                                                               zIndex: 2
                                                           }}/>
                                                    <label htmlFor="contained-button-file" style={{
                                                        position: 'absolute',
                                                        top: '0px',
                                                        left: '0px',
                                                        zIndex: 1
                                                    }}>
                                                        <SecondaryButton message_id={'widget.load'}/>
                                                        {this.state.file && this.state.file.name}
                                                    </label>
                                                </div>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={24}>
                                            <Form.Item wrapperCol={{span: 24}}>
                                                <PrimaryButton
                                                    disabled={this.state.duplicated || this.state.duplicated_phone}
                                                    htmlType={"submit"}
                                                    message_id={"general.add"}
                                                    style={{width: '200px'}}
                                                    onClick={() => this.handlePost()}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card>


                        </Row>

                    </Col>
                </Row>
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

            </LayoutWrapper>
        );
    }
}
