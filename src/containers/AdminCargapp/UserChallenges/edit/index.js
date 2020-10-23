import React, {Component} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import {Row, Col} from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import {Form} from "antd";
import PrimaryButton from "../../../../components/custom/button/primary"
import {Card, message} from 'antd';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import {Select} from 'antd';
import SelectInputCustom from "../../../../components/custom/input/select";
import TextInputCustom from "../../../../components/custom/input/text";
import importantVariables from "../../../../helpers/hashVariables";
import {transformInputData} from "../../../../helpers/utility";
import {getUserChallenge, getUsers, putUserChallenge} from "../../../../helpers/api/users";
import {getChallenges} from "../../../../helpers/api/internals";

const {Option} = Select;
export default class UserChallengeEdit extends Component {


    constructor(props) {
        super();
        this.state = {
            redirect: false
        }
    }

    componentWillMount() {
        axios.all([getUserChallenge(this.props.match.params.id), getUsers(), getChallenges()])
            .then((responses) => {


                this.setState({
                    users: responses[1].data,
                    challenges: responses[2].data,
                    user_id: responses[0].data.user_id,
                    challenge_id: responses[0].data.challenge_id,
                    position: responses[0].data.position,
                    point: responses[0].data.point,
                    active: responses[0].data.active,
                });
            }).catch(error => {
            let errorObject = JSON.parse(JSON.stringify(error));

            message.warning(errorObject.message);
        });
    }

    handleChange(value, type) {

        this.setState(
            {
                [type]: value
            }
        )
    }

    handlePut() {
        putUserChallenge(this.props.match.params.id,
            {
                user_challenge: {
                    user_id: transformInputData(this.state.user_id),
                    challenge_id: transformInputData(this.state.challenge_id),
                    position: this.state.position,
                    point: this.state.point,
                    active: transformInputData(this.state.active),
                }

            }).then(() => {
            this.setState({redirect: true})
        }).catch(error => {
            let errorObject = JSON.parse(JSON.stringify(error));

            message.warning(errorObject.message);
        });
    }

    render() {
        const {rowStyle, colStyle} = basicStyle;
        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to='/admin/user_challenges'/>
        }
        return (

            <LayoutWrapper>


                <Row style={rowStyle} gutter={18} justify="start" block>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                <PageHeader>

                                    <h1>
                                        <IntlMessages id="user_challenges.title"/>

                                    </h1>
                                </PageHeader>
                            </Col>
                        </Row>
                        <Row>
                            <Card className="cardContent" style={{marginTop: '50px'}}>
                                <Row gutter={10}>
                                    <Col span={12}>
                                        <Form.Item label="Usuario">
                                            <SelectInputCustom value={this.state.user_id} placeholder="usuario"
                                                               style={{width: '100%'}} onChange={(e) => {
                                                this.handleChange(e, 'user_id')
                                            }}
                                                               options={this.state && this.state.users &&

                                                               this.state.users.map((item) => {
                                                                   return <Option value={item.id}>{item.email}</Option>
                                                               })
                                                               }
                                                               label_id={'admin.title.user'}>
                                            </SelectInputCustom>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Reto">
                                            <SelectInputCustom value={this.state.challenge_id} placeholder="reto"
                                                               style={{width: '100%'}} onChange={(e) => {
                                                this.handleChange(e, 'challenge_id')
                                            }}
                                                               options={this.state && this.state.challenges &&
                                                               this.state.challenges.map((item) => {
                                                                   return <Option value={item.id}>{item.name}</Option>
                                                               })
                                                               }
                                                               label_id={'admin.title.challenge'}>

                                            </SelectInputCustom>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={10}>
                                    <Col span={12}>
                                        <Form.Item label="Posición">
                                            <TextInputCustom type="number" value={this.state.position}
                                                             placeholder="posición"
                                                             label_id={'admin.title.position'}
                                                             onChange={(e) => this.handleChange(e.target.value, 'position')}/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Puntos">
                                            <TextInputCustom type="number" value={this.state.point} placeholder="puntos"
                                                             label_id={'admin.title.points'}
                                                             onChange={(e) => this.handleChange(e.target.value, 'point')}/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={10}>
                                    <Col span={12}>
                                        <Form.Item label="Estado">
                                            <SelectInputCustom required value={this.state.active}
                                                               placeholder="estado"
                                                               options={importantVariables.activeOptions.map((item) => {
                                                                   return <Option
                                                                       value={item.key}>{item.label}</Option>
                                                               })}
                                                               label_id={'admin.title.active'}
                                                               style={{width: 120}} onChange={(e) => {
                                                this.handleChange(e, 'active')
                                            }}>
                                            </SelectInputCustom>
                                        </Form.Item>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <Form.Item wrapperCol={{span: 24}}>
                                            <PrimaryButton message_id={"general.edit"} style={{width: '200px'}}
                                                           onClick={() => this.handlePut()}/>
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
