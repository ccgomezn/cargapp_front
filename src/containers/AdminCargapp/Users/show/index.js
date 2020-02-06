import React, {Component} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import {Row, Col, Avatar} from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import {Form} from "antd";
import PrimaryButton from "../../../../components/custom/button/primary"
import {Card} from 'antd';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import IntlMessages from '../../../../components/utility/intlMessages';
import {getActiveProfiles, getUser, getMineStatistics, getDocumentsOfUser} from "../../../../helpers/api/users";
import {getRateServices} from "../../../../helpers/api/services";
import { TitleLabel, TitleDivider } from './style.js';

export default class TicketShow extends Component {


    constructor(props) {
        super();
        this.state = {
            redirect: false
        }
    }


    componentWillMount() {
        const {id} = this.props.match.params;
        axios.all([getUser(id), getRateServices(), getActiveProfiles(), getMineStatistics(), getDocumentsOfUser({"user": {"id" : id}})])
            .then((responses) => {
              console.log(responses[4].data);
                let sum_average = 0;
                let count = 0;
                
                if (responses[1].data !== null) {
                    responses[1].data.map((item) => {
                        if (item.driver_id === parseInt(id)) {
                            sum_average += item.driver_point;
                            count += 1;
                        }
                        return item;
                    });
                    responses[2].data.map((item) => {
                        if (item.user_id === parseInt(id)) {
                          this.setState({
                                name: item.firt_name + ' ' + item.last_name,
                                phone: item.phone,
                                avatar: item.avatar,
                                identification: item.document_id,
                            })
                        }
                        return item;
                    });
                }
                let average;
                
                if (sum_average !== 0) {
                    average = sum_average/count;
                } else {
                    average = 'El usuario no tiene calificaciones'
                }
                this.setState({
                    email: responses[0].data.email,
                    phone_number: responses[0].data.phone_number,
                    average: average,
                    total_services: responses[3].data.total_services,
                    kilometers: responses[3].data.kilometres,
                    identification_document: '',
                    license_document: '',
                    arl_document: '',
                });

            }).catch((error) => {
            console.error(error);
        });
    }

    handleChange(value, type) {

        this.setState(
            {
                [type]: value
            }
        )
    }

    goBack() {
        if(this.props.generator){
            if(this.props.detail){
                this.props.history.push('/generator/service_users/'+this.props.match.params.service_id)

            }else{
                this.props.history.push('/generator/services/detail/'+this.props.match.params.service_id)
            }
        }else{
            this.props.history.push('/admin/users')
        }
    }


    render() {
        const {rowStyle, colStyle} = basicStyle;
        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to='/admin/tickets'/>
        }
        console.log(this.state)
        return (
            <LayoutWrapper>

                <Row style={rowStyle} gutter={18} justify="start" block>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                <PageHeader>
                                    <h1> Conductor asignado</h1>
                                </PageHeader>
                            </Col>
                        </Row>
                        <Row>
                            <Card className="cardContent" style={{marginTop: '50px'}}>
                                <Row gutter={10}>
                                    <Col span={5} style={{textAlign:'center'}}>
                                        <Avatar style={{marginTop: '30px' }} size={160} src= {this.state.avatar} />
                                        <h3>{this.state.name}</h3>
                                    </Col>
                                    <Col span={1}></Col>
                                    <Col span={18}>
                                      <TitleLabel>Conductor</TitleLabel>
                                      <TitleDivider/>
                                      <Row>
                                        <Col span={12}>
                                            <Form.Item label="Correo electrónico" style={{marginBottom: '15px'}}>
                                              <div class="ant-form-item-control" style={{lineHeight: 1}}>
                                                {this.state.email}
                                              </div>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Número de identificación" style={{marginBottom: '15px'}}>
                                              <div class="ant-form-item-control" style={{lineHeight: 1}}>
                                                {this.state.identification} 
                                              </div>
                                            </Form.Item>
                                        </Col>
                                      </Row>

                                      <Row>
                                        <Col span={12}>
                                            <Form.Item label="Viajes realizados" style={{marginBottom: '15px'}}>
                                              <div class="ant-form-item-control" style={{lineHeight: 1}}>
                                                {this.state.total_services || 'No ha realizado ningún viaje'}
                                              </div>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Kilómetros recorridos" style={{marginBottom: '15px'}}>
                                              <div class="ant-form-item-control" style={{lineHeight: 1}}>
                                                {this.state.kilometers || 'No ha realizado ningún viaje'} 
                                              </div>
                                            </Form.Item>
                                        </Col>
                                      </Row>

                                      <Row>
                                        <div style={{marginTop: 190}}>
                                          <TitleLabel>Documentos</TitleLabel>
                                          <TitleDivider/>
                                        </div>
                                        <Row>
                                          <Col span={12}>
                                            <Form.Item label="Documento de identidad">
                                              <a href={this.state.identification_document}><IntlMessages id="general.download" /></a>
                                            </Form.Item>
                                          </Col>
                                          <Col span={12}>
                                            <Form.Item label="Licencia de conducción">
                                              <a href={this.state.license_document}><IntlMessages id="general.download" /></a>
                                            </Form.Item>
                                          </Col>
                                        </Row>

                                        <Row>
                                          <Col span={8}>
                                            <Form.Item label="Planilla de pagos ARL">
                                              <a href={this.state.arl_document}><IntlMessages id="general.download" /></a>
                                            </Form.Item>
                                          </Col>
                                        </Row>
                                      </Row>
                                    </Col>
                                </Row>
                            </Card>

                            <Row>
                                <Col span={24}>
                                    <Form.Item wrapperCol={{span: 24}}>
                                        <PrimaryButton message_id={"general.back"} style={{width: '200px'}}
                                                       onClick={() => this.goBack()}/>
                                    </Form.Item>
                                </Col>
                            </Row>

                        </Row>
                    </Col>
                </Row>


            </LayoutWrapper>
        );
    }
}
