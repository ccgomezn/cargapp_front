import React, {Component} from "react";
import IsoWidgetsWrapper from '../../Dashboard/widgets-wrapper';
import LayoutWrapper from '../../../components/utility/layoutWrapper.js';
import ReportsSmallWidget from '../../Dashboard/reportsmall/report-widget';
import {Col, Row} from "antd";
import IntlMessages from "../../../components/utility/intlMessages";
import {put} from "../../../helpers/httpRequest";
import PrimaryButton from "../../../components/custom/button/primary";
import {httpAddr} from '../../../helpers/http_helper';
import TextInputCustom from "../../../components/custom/input/text";
import Modal from "../../../components/feedback/modal"
import SecondaryButton from "../../../components/custom/button/secondary";

export default class Configuration extends Component {

    state = {visible: false};


    showModal() {
        this.setState({
            visible: true,
        });
    };

    changePassword() {
        put(httpAddr + '/users/update_password', {
            user: {
                current_password: this.state.current_password,
                password: this.state.password,
                password_confirmation: this.state.password_confirmation,
            }
        }, true).then(() => {
                window.location.reload();
            }
        )
    }

    handleCancel() {
        this.setState({
            visible: false,
        });
    };

    handleChange(value, type) {

        this.setState(
            {
                [type]: value
            }
        )
    };

    render() {
        return (
            <div>
                <IsoWidgetsWrapper>
                    <LayoutWrapper>
                        <Row style={{width: '100%'}}>
                            <Col lg={8} md={8} sm={24} xs={24} style={{
                                marginBottom: '16px',
                            }}>
                                <IsoWidgetsWrapper style={{height: '100% !important'}}>
                                    <div className="vehiclesOnTrack" style={{height: '100%'}}>
                                        <ReportsSmallWidget
                                            label={<IntlMessages id="Imagen"/>}

                                            hr={<hr style={{marginTop: 0}}/>}
                                        >

                                        </ReportsSmallWidget>
                                    </div>
                                </IsoWidgetsWrapper>

                            </Col>
                            <Col lg={16} md={16} sm={24} xs={24} style={{
                                marginBottom: '16px',
                            }}>
                                <IsoWidgetsWrapper style={{height: '100% !important'}}>
                                    <div className="vehiclesOnTrack" style={{height: '100%'}}>
                                        <ReportsSmallWidget
                                            label={<IntlMessages id="widget.title_configuration_profile"/>}

                                            hr={<hr style={{marginTop: 0}}/>}
                                        >

                                            <Modal
                                                title="Cambio de contraseña"
                                                visible={this.state.visible}
                                                cancelText={'Cancelar'}
                                                style={{width: '100%'}}
                                                image={'clave-temporal-retiro-white.svg'}
                                                body={
                                                    <div>
                                                        <Row type="flex" style={{textAlign: 'center', justifyContent: 'center'}}>
                                                            <h1>Contraseña</h1>
                                                        </Row>
                                                        <TextInputCustom value={this.state.current_password}
                                                                         placeholder={'Contraseña actual'}
                                                                         label_id={'Profile.currentPassword'}
                                                                         onChange={(e) => this.handleChange(e.target.value, 'current_password')}/>
                                                        < TextInputCustom value={this.state.password}
                                                                          placeholder={'Contraseña'}
                                                                          label_id={'page.password'}
                                                                          onChange={(e) => this.handleChange(e.target.value, 'password')}/>
                                                        <TextInputCustom value={this.state.password_confirmation}
                                                                         placeholder={'Confirmar contraseña'}
                                                                         label_id={'page.passwordConfirmation'}
                                                                         onChange={(e) => this.handleChange(e.target.value, 'password_confirmation')}/>
                                                        <PrimaryButton message_id={'page.confirm'} onClick={() => this.changePassword()} style={{marginTop: '20px', width: '100% '}} />
                                                        <SecondaryButton message_id={'page.cancel'} onClick={() => this.handleCancel()} style={{marginTop: '20px', width: '100% '}}/>
                                                    </div>
                                                }
                                            />

                                            <PrimaryButton message_id={'Profile.changePassword'} style={{width: '100%'}}
                                                           onClick={() => this.showModal()}/>

                                        </ReportsSmallWidget>
                                    </div>
                                </IsoWidgetsWrapper>

                            </Col>
                        </Row>

                    </LayoutWrapper>
                </IsoWidgetsWrapper>
            </div>
        );
    }
}