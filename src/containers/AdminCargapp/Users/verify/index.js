import React, {Component} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import {Row, Col, Form, Card, message} from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import PrimaryButton from "../../../../components/custom/button/primary"
import axios from "axios";
import {verifyUser} from "../../../../helpers/api/adminCalls";



export default class UserCreate extends Component {


    constructor() {
        super();
        this.state = {
            redirect: false,
            duplicated: false
        }
    }


    verify() {
        verifyUser(this.props.match.params.id, true).then((response) => {
            window.location.reload();
        })
    }

    componentWillMount() {

        axios.all([verifyUser(this.props.match.params.id, false)])
            .then((responses) => {
                if (responses[0]) {
                    if (responses[0].data.check && responses[0].data.check.check.status === 'completed') {

                        responses[0].data.check.check.scores.map((score) => {
                            this.setState(
                                {
                                    [score.data_set]: [score.score]
                                }
                            );
                            return score;
                        });

                        this.setState(
                            {
                                score: responses[0].data.check.check.score,
                                homonym_score: responses[0].data.check.check.homonym_score,
                                id_score: responses[0].data.check.check.id_score
                            }
                        );
                    }else if(responses[0].data.check == null){
                        message.error('Error. Confirme los datos.', 10)
                    }else{
                        message.warning('Truora continua verificando el usuario. Por favor intentelo en unos minutos.', 10)
                        this.setState({
                            in_progress: true
                        })
                    }

                }
            })
    }

    render() {
        const {rowStyle, colStyle} = basicStyle;

        return (

            <LayoutWrapper>


                <Row style={rowStyle} gutter={18} justify="start" block>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                <PageHeader>

                                    <h1>
                                        <IntlMessages id="users.title"/>

                                    </h1>
                                </PageHeader>
                            </Col>
                        </Row>
                        <Row>
                            <Card className="cardContent" style={{marginTop: '50px'}}>
                                <Form>
                                    <Row gutter={10}>
                                        <Col span={8}>
                                            <Form.Item
                                                label={"Score general"}>
                                                {this.state.in_progress? 'En progreso' :this.state.score}
                                            </Form.Item>
                                        </Col>
                                        <Col span={8}>
                                            <Form.Item
                                                label={"Score de homonimos"}>
                                                {this.state.in_progress? 'En progreso' : this.state.homonym_score}
                                            </Form.Item>
                                        </Col>
                                        <Col span={8}>
                                            <Form.Item
                                                label={"Score de id personal"}>
                                                {this.state.in_progress? 'En progreso' :this.state.id_score}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item
                                                label={"Calificación vehícular"}>
                                                {this.state.in_progress? 'En progreso' :this.state.vehicle_information}
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                label={"Identidad personal"}>
                                                {this.state.in_progress? 'En progreso' :this.state.personal_identity}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item
                                                label={"Multas de transito"}>
                                                {this.state.in_progress? 'En progreso' :this.state.traffic_fines}
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                label={"Licencia de conducción"}>
                                                {this.state.in_progress? 'En progreso' :this.state.driving_licenses}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item
                                                label={"Registro criminal"}>
                                                {this.state.in_progress? 'En progreso' :this.state.criminal_record}
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                label={"Registro internacional"}>
                                                {this.state.in_progress? 'En progreso' :this.state.international_background}
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item
                                                label={"Comportamiento"}>
                                                {this.state.in_progress? 'En progreso' :this.state.behavior}
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                label={"Permiso vehicular"}>
                                                {this.state.in_progress? 'En progreso' :this.state.vehicle_permits}
                                            </Form.Item>
                                        </Col>
                                    </Row>


                                    <Row>
                                        <Col span={24}>
                                            <Form.Item wrapperCol={{span: 24}}>
                                                <PrimaryButton htmlType={"submit"}
                                                               message_id={"general.verify_new"}
                                                               style={{width: '200px'}}
                                                               onClick={() => this.verify()}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card>


                        </Row>

                    </Col>
                </Row>


            </LayoutWrapper>
        );
    }
}
