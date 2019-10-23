import React, {Component} from "react";
import {connect} from "react-redux";
import authAction from "../../redux/auth/actions";
import appActions from "../../redux/app/actions";
import IntlMessages from "../../components/utility/intlMessages";
import TextInputCustom from '../../components/custom/input/text'
import PrimaryButton from '../../components/custom/button/primary'

import SignUpStyleWrapper from "./signupCompany.style";
import {Row, Col} from "antd";
import SelectInputCustom from "../../components/custom/input/select";
import {getActiveLoadTypes, getMineUser, postCompany, postUserCompany} from "../../helpers/api/adminCalls";
import {transformInputData} from "../../helpers/utility";
import {Redirect} from "react-router-dom";

const {login} = authAction;
const {clearMenu} = appActions;

class SignUpCompany extends Component {
    state = {
        redirectToReferrer: false
    };

    componentWillReceiveProps(nextProps) {
        if (
            this.props.isLoggedIn !== nextProps.isLoggedIn &&
            nextProps.isLoggedIn === true
        ) {
            this.setState({redirectToReferrer: false});
        }
    }

    handlePost() {
        getMineUser().then((response_user) => {
            postCompany({
                company: {
                    user_id: response_user.data.user.id,
                    legal_representative: this.state.nit,
                    name: this.state.legal_representative,
                    phone: this.state.phone,
                    load_type_id: transformInputData(this.state.load_type_id)
                }
            }).then((response_company) => {
                postUserCompany({
                    company_user:{
                        company_id: response_company.data.id,
                        user_id: response_user.data.user.id
                    }
                }).then(()=>{
                    this.setState({redirectToReferrer: true});
                })
            })
        })
    }

    handleChange(value, type) {

        this.setState(
            {
                [type]: value
            }
        )
    }

    componentDidMount() {
        getActiveLoadTypes().then((response) => {
            this.setState({load_types: response.data})
        })
    }

    render() {
        if(this.state.redirectToReferrer){
            return <Redirect to='/signup_financial'/>
        };

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
                                            <IntlMessages id="page.company.title"/>
                                        </p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <p className="subtitle">
                                            <IntlMessages id="page.company.subtitle"/>
                                        </p>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div className="isoSignUpForm">
                            <div className="isoInputWrapper" style={{marginTop: 15}}>
                                <TextInputCustom label_id='page.companyName' placeholder='Nombre de la empresa'
                                                 value={this.state.company_name}
                                                 onChange={(e) => this.handleChange(e.target.value, 'company_name')}
                                                 required/>
                            </div>
                            <div className="isoInputWrapper">
                                <TextInputCustom label_id='page.nit' placeholder='NIT'
                                                 value={this.state.nit}
                                                 onChange={(e) => this.handleChange(e.target.value, 'nit')}
                                                 required/>
                            </div>
                            <div className="isoInputWrapper">
                                <TextInputCustom label_id='page.contactPhone' placeholder='Teléfono de contacto'
                                                 value={this.state.phone}
                                                 onChange={(e) => this.handleChange(e.target.value, 'phone')}
                                                 required/>
                            </div>
                            <div className="isoInputWrapper">
                                <SelectInputCustom value={this.state.load_type_id} placeholder="tipo de carga"
                                                   style={{width: '100%'}} onChange={(e) => {
                                    this.handleChange(e, 'load_type_id')
                                }}
                                                   options={this.state && this.state.load_types &&

                                                   this.state.load_types.map((item) => {
                                                       return <option
                                                           value={item.id}>{item.name}</option>
                                                   })
                                                   }
                                                   label_id={'admin.title.loadType'}>

                                </SelectInputCustom>
                            </div>
                            <div className="sign-buttons">
                                <Row>
                                    <Col align={'right'}>
                                        <PrimaryButton htmlType={"submit"} message_id={"general.add"}
                                                       onClick={() => this.handlePost()}/>
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
)(SignUpCompany);
