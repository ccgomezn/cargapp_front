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
import TextInputCustom from "../../../../components/custom/input/text";
import {getActiveProfiles, getUser} from "../../../../helpers/api/users";
import {getRateServices} from "../../../../helpers/api/services";

export default class TicketShow extends Component {


    constructor(props) {
        super();
        this.state = {
            redirect: false
        }
    }


    componentWillMount() {
        const {id} = this.props.match.params;
        axios.all([getUser(id), getRateServices(), getActiveProfiles()])
            .then((responses) => {
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
                                avatar: item.avatar
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
                    identification: responses[0].data.identification,
                    phone_number: responses[0].data.phone_number,
                    average: average
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
        return (

            <LayoutWrapper>


                <Row style={rowStyle} gutter={18} justify="start" block>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                <PageHeader>

                                    <h1>
                                        {this.state.name}

                                    </h1>
                                </PageHeader>
                            </Col>
                        </Row>
                        <Row>
                            <Card className="cardContent" style={{marginTop: '50px'}}>
                                <Row gutter={10}>
                                    <Col span={5} style={{textAlign:'center'}}>
                                        <Avatar style={{marginTop: '30px' }} size={160} src= {this.state.avatar} />

                                    </Col>
                                    <Col span={1}></Col>
                                    <Col span={18}>
                                        <Row gutter={10} align="middle">

                                            <Col span={12}>
                                                <Form.Item label="Email">
                                                    <TextInputCustom disabled={true} value={this.state.email}
                                                                     placeholder="email"
                                                                     label_id={'admin.title.email'}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item label="Identificación">
                                                    <TextInputCustom disabled={true} value={this.state.identification}
                                                                     placeholder="identificación"
                                                                     label_id={'admin.title.identification'}
                                                    />
                                                </Form.Item>
                                            </Col>


                                        </Row>

                                        <Row gutter={10}>

                                            <Col span={12}>
                                                <Form.Item label="Número de teléfono">
                                                    <TextInputCustom disabled={true} value={this.state.phone_number}
                                                                     placeholder="Número de teléfono"
                                                                     label_id={'admin.title.phone_number'}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item label="Promedio">
                                                    <TextInputCustom disabled={true} value={this.state.average}
                                                                     placeholder="Puntaje promedio"
                                                                     label_id={'admin.title.average'}
                                                    />
                                                </Form.Item>
                                            </Col>

                                        </Row>
                                    </Col>
                                </Row>


                                <Row>
                                    <Col span={5}>
                                        <Form.Item wrapperCol={{span: 24}}>
                                            <PrimaryButton message_id={"general.back"} style={{width: '100%'}}
                                                           onClick={() => this.goBack()}/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>


                        </Row>

                    </Col>
                </Row>


            </LayoutWrapper>
        );
    }
}
