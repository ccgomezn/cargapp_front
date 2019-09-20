import React, {Component} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import {Row, Col} from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import {Form} from "antd";
import PrimaryButton from "../../../../components/custom/button/primary"
import {Card, Select} from 'antd';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import {postVehicle} from '../../../../helpers/api/adminCalls.js';
import {getActiveDocumentTypes, getActiveUsers, getActiveVehicleTypes} from "../../../../helpers/api/adminCalls";
import TextInputCustom from "../../../../components/custom/input/text";
import SelectInputCustom from "../../../../components/custom/input/select";
import {transformInputData} from "../../../../helpers/utility";

const {Option} = Select;
export default class VehicleCreate extends Component {


    constructor(props) {
        super();
        this.state = {
            redirect: false
        }
    }


    handleChange(value, type) {

        this.setState(
            {
                [type]: value
            }
        )
    }


    componentWillMount() {
        axios.all([getActiveUsers(), getActiveDocumentTypes(), getActiveVehicleTypes()])
            .then((responses) => {

                this.setState({
                    users: responses[0].data,
                    document_types: responses[1].data,
                    vehicle_types: responses[2].data,
                });

            })

    }

    handlePost() {
        postVehicle(
            {
                vehicle: {
                    brand: this.state.brand,
                    model: this.state.model,
                    model_year: this.state.model_year,
                    color: this.state.color,
                    plate: this.state.plate,
                    chassis: this.state.chassis,
                    owner_vehicle: this.state.owner_vehicle,
                    vehicle_type_id: transformInputData(this.state.vehicle_type_id),
                    owner_document_type_id: transformInputData(this.state.owner_document_type_id),
                    owner_document_id: transformInputData(this.state.owner_document_id),
                    user_id: transformInputData(this.state.user_id),
                    active: true,
                }

            }).then(() => {
            this.setState({redirect: true})
        })
    }

    render() {
        const {rowStyle, colStyle} = basicStyle;
        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to='/admin/vehicles'/>
        }
        return (

            <LayoutWrapper>


                <Row style={rowStyle} gutter={18} justify="start" block>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                <PageHeader>

                                    <h1>
                                        <IntlMessages id="vehicles.title"/>

                                    </h1>
                                </PageHeader>
                            </Col>
                        </Row>
                        <Row>
                            <Card className="cardContent" style={{marginTop: '50px'}}>
                                <Form>

                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Marca">
                                                <TextInputCustom value={this.state.brand} placeholder="marca"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'brand')}
                                                                 label_id={'admin.title.brand'}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Modelo">
                                                <TextInputCustom value={this.state.model} placeholder="modelo"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'model')}
                                                                 label_id={'admin.title.model'}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Año del modelo">
                                                <TextInputCustom type="number" value={this.state.model_year}
                                                                 placeholder="año del modelo"
                                                                 label_id={'admin.title.year'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'model_year')}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Color">
                                                <TextInputCustom value={this.state.color} placeholder="color"
                                                                 label_id={'admin.title.color'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'color')}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Placa">
                                                <TextInputCustom value={this.state.plate} placeholder="placa"
                                                                 label_id={'admin.title.plate'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'plate')}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Chasis">
                                                <TextInputCustom value={this.state.chassis} placeholder="chasis"
                                                                 label_id={'admin.title.chassis'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'chassis')}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Tipo del vehiculo">
                                                <SelectInputCustom value={this.state.vehicle_type_id}
                                                                   placeholder="tipo del vehiculo"
                                                                   style={{width: '100%'}}
                                                                   onChange={(e) => {
                                                                       this.handleChange(e, 'vehicle_type_id')
                                                                   }}
                                                                   options={this.state && this.state.vehicle_types &&

                                                                   this.state.vehicle_types.map((item) => {
                                                                       return <Option
                                                                           value={item.id}>{item.name}</Option>
                                                                   })
                                                                   }
                                                                   label_id={'admin.title.type'}>

                                                </SelectInputCustom>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Nombre del dueño del vehiculo">
                                                <TextInputCustom value={this.state.owner_vehicle}
                                                                 label_id={'admin.title.name'}
                                                                 placeholder="nombre del dueño del vehiculo"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'owner_vehicle')}/>
                                            </Form.Item>
                                        </Col>

                                    </Row>

                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Tipo de documento del dueño del vehiculo">
                                                <SelectInputCustom value={this.state.owner_document_type_id}
                                                                   placeholder="tipo de documento del dueño del vehiculo"
                                                                   style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'owner_document_type_id')
                                                }}
                                                                   options={this.state && this.state.document_types &&

                                                                   this.state.document_types.map((item) => {
                                                                       return <Option
                                                                           value={item.id}>{item.name}</Option>
                                                                   })
                                                                   }
                                                                   label_id={'admin.title.type'}>

                                                </SelectInputCustom>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Número de documento del dueño del vehiculo">
                                                <TextInputCustom value={this.state.owner_document_id}
                                                                 label_id={'admin.title.document'}
                                                                 placeholder="número de documento del dueño del vehiculo"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'owner_document_id')}/>
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
