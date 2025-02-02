import React, {Component} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import {Row, Col, Form, Card} from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import PrimaryButton from "../../../../components/custom/button/primary"
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import moment from 'moment';
import {getActiveUsers, getMineUser} from "../../../../helpers/api/users";
import TextInputCustom from "../../../../components/custom/input/text";
import AreaInputCustom from "../../../../components/custom/input/area";
import DatePickerCustom from "../../../../components/custom/input/date";
import {postPrize} from "../../../../helpers/api/internals";

const dateFormat = 'YYYY-MM-DD';


export default class PrizeCreate extends Component {


    constructor() {
        super();
        this.state = {
            redirect: false
        }
    }


    componentWillMount() {
        axios.all([getActiveUsers()])
            .then((responses) => {
                this.setState({
                    users: responses[0].data,
                    expire_date: moment(),
                });

            })

    }

    handleChange(value, type) {

        this.setState(
            {
                [type]: value
            }
        )
    }

    handlePost() {
        getMineUser().then((response) => {
            const formData = new FormData();
            formData.append('prize[name]', this.state.name);
            formData.append('prize[code]', this.state.code);
            formData.append('prize[image]', this.state.image, this.state.image.name);
            formData.append('prize[media]', this.state.media, this.state.media.name);
            formData.append('prize[point]', this.state.point);
            formData.append('prize[description]', this.state.description);
            formData.append('prize[body]', this.state.body);
            formData.append('prize[user_id]', response.data.user.id);
            formData.append('prize[expire_date]', this.state.expire_date);
            formData.append('prize[active]', true);
            postPrize(
                formData).then(() => {
                this.setState({redirect: true})
            })
        });

    }

    render() {
        const {rowStyle, colStyle} = basicStyle;
        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to='/admin/prizes'/>
        }
        return (

            <LayoutWrapper>


                <Row style={rowStyle} gutter={18} justify="start" block>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                <PageHeader>

                                    <h1>
                                        <IntlMessages id="prizes.title"/>

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
                                                                 required
                                                                 label_id={'admin.title.name'}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Codigo">
                                                <TextInputCustom value={this.state.code} placeholder="codigo"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'code')}
                                                                 label_id={'admin.title.code'}
                                                                 required/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Puntos">
                                                <TextInputCustom type="number" value={this.state.point}
                                                                 placeholder="puntos"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'point')}
                                                                 label_id={'admin.title.points'}
                                                                 required/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Descripción">
                                                <AreaInputCustom value={this.state.description}
                                                                 placeholder="descripción"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'description')}
                                                                 label_id={'admin.title.description'}
                                                                 required/>

                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Cuerpo">
                                                <TextInputCustom value={this.state.body} placeholder="cuerpo"
                                                                 label_id={'admin.title.body'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'body')}
                                                                 required/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Imagen">
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
                                                        <PrimaryButton message_id={'widget.load'}
                                                                       style={{marginTop: '5px'}}/>
                                                        {this.state.image && this.state.image.name}
                                                    </label>
                                                </div>

                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>

                                        <Col span={12}>
                                            <Form.Item label="Media">
                                                <div style={{position: 'relative'}}>
                                                    <input type="file"
                                                           id="contained-button-file"
                                                           onChange={(e) => this.handleChange(e.target.files[0], 'media')}
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
                                                        <PrimaryButton message_id={'widget.load'}
                                                                       style={{marginTop: '5px'}}/>
                                                        {this.state.media && this.state.media.name}
                                                    </label>
                                                </div>

                                            </Form.Item>
                                        </Col>

                                        <Col span={12}>
                                            <Form.Item label="Fecha de expiración">
                                                {
                                                    this.state && this.state.expire_date &&
                                                    <DatePickerCustom
                                                        defaultValue={moment(this.state.expire_date, dateFormat)}
                                                        format={dateFormat}
                                                        label_id={'label.date'}
                                                        onChange={(e) => this.handleChange(e, 'expire_date')}/>
                                                }
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col span={24}>
                                            <Form.Item wrapperCol={{span: 24}}>
                                                <PrimaryButton htmlType={"submit"} message_id={"general.add"}
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


            </LayoutWrapper>
        );
    }
}
