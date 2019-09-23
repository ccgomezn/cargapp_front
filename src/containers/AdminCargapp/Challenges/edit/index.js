import React, {Component} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import {Row, Col} from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import {Form} from "antd";
import PrimaryButton from "../../../../components/custom/button/primary"
import {Card} from 'antd';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import {Select} from 'antd';
import {getChallenge, getUsers, putChallenge} from "../../../../helpers/api/adminCalls"
import TextInputCustom from "../../../../components/custom/input/text";
import SelectInputCustom from "../../../../components/custom/input/select";
import importantVariables from "../../../../helpers/hashVariables";

const {Option} = Select;
export default class ChallengeEdit extends Component {


    constructor(props) {
        super();
        this.state = {
            redirect: false
        }
    }


    componentWillMount() {
        axios.all([getChallenge(this.props.match.params.id), getUsers()])
            .then((responses) => {
                this.setState({
                    users: responses[1].data,
                    name: responses[0].data[0].name,
                    body: responses[0].data[0].body,
                    point: responses[0].data[0].point,
                    user_id: responses[0].data[0].user_id,
                    active: responses[0].data[0].active,
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

    handlePut() {
        const formData = new FormData();
        formData.append('challenge[name]', this.state.name);
        formData.append('challenge[body]', this.state.body);
        if (this.state.image != null) {
            formData.append('challenge[image]', this.state.image, this.state.image.name)
        }
        formData.append('challenge[point]', this.state.point);
        const user_id = this.state.user_id !== undefined && this.state.user_id.key !== undefined ? this.state.user_id.key : this.state.user_id;
        const active = this.state.active !== undefined && this.state.active.key !== undefined ? this.state.active.key : this.state.active;

        formData.append('challenge[user_id]', user_id);
        formData.append('challenge[active]', active);

        putChallenge(this.props.match.params.id, formData).then(() => {
            this.setState({redirect: true})
        })
    }

    render() {
        const {rowStyle, colStyle} = basicStyle;
        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to='/admin/challenges'/>
        }
        return (

            <LayoutWrapper>


                <Row style={rowStyle} gutter={18} justify="start">
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                <PageHeader>

                                    <h1>
                                        <IntlMessages id="challenges.title"/>

                                    </h1>
                                </PageHeader>
                            </Col>
                        </Row>
                        <Row>
                            <Card className="cardContent" style={{marginTop: '50px'}}>
                                <Form>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Nombre">
                                                <TextInputCustom value={this.state.name} placeholder="nombre"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'name')}
                                                                 label_id={'admin.title.name'}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Descripción del desafio">
                                                <TextInputCustom value={this.state.body}
                                                                 placeholder="descripción del desafio"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'body')}
                                                                 label_id={'admin.title.description'}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Imágen">
                                                <div style={{position: 'relative'}}>
                                                    <input type="file"
                                                           id="contained-button-file"
                                                           onChange={(e) => this.handleChange(e.target.files[0], 'image')}
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
                                                        <PrimaryButton message_id={'widget.load'}/>
                                                        {this.state.image && this.state.image.name}
                                                    </label>
                                                </div>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Puntos">
                                                <TextInputCustom type="number" value={this.state.point}
                                                                 placeholder="puntos"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'point')}
                                                                 label_id={'admin.title.points'}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Usuario">
                                                <SelectInputCustom value={this.state.user_id} placeholder="usuario"
                                                                   style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'user_id')
                                                }}
                                                                   options={this.state && this.state.users &&

                                                                   this.state.users.map((item) => {
                                                                       return <Option
                                                                           value={item.id}>{item.email}</Option>
                                                                   })
                                                                   }
                                                                   label_id={'admin.title.user'}>

                                                </SelectInputCustom>
                                            </Form.Item>
                                        </Col>

                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Estado">
                                                <SelectInputCustom required value={this.state.active}
                                                                   placeholder="estado"
                                                                   label_id={'admin.title.active'}
                                                                   style={{width: 120}} onChange={(e) => {
                                                    this.handleChange(e, 'active')
                                                }}
                                                                   options={
                                                                       importantVariables.activeOptions.map((item) => {
                                                                           return <Option
                                                                               value={item.key}>{item.label}</Option>
                                                                       })
                                                                   }>

                                                </SelectInputCustom>
                                            </Form.Item>
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col span={24}>
                                            <Form.Item wrapperCol={{span: 24}}>
                                                <PrimaryButton htmlType={"submit"} message_id={"general.edit"}
                                                               style={{width: '200px'}}
                                                               onClick={() => this.handlePut()}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card>


                        </Row>

                    </Col>
                </Row>


                <
                    /LayoutWrapper>
                    )
                    ;
                    }
                    }
