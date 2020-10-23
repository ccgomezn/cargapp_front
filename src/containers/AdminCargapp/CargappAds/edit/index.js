import React, {Component} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import {Row, Col, Checkbox} from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import {Form} from "antd";
import PrimaryButton from "../../../../components/custom/button/primary"
import {Card} from 'antd';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import {Select} from 'antd';
import TextInputCustom from "../../../../components/custom/input/text";
import SelectInputCustom from "../../../../components/custom/input/select";
import importantVariables from "../../../../helpers/hashVariables";
import AreaInputCustom from "../../../../components/custom/input/area";
import {getUsers} from "../../../../helpers/api/users";
import {getCargappAd, putCargappAd} from "../../../../helpers/api/internals";


const {Option} = Select;


export default class CargappAdEdit extends Component {


    constructor(props) {
        super();
        this.state = {
            redirect: false
        }
    }


    componentWillMount() {
        axios.all([getCargappAd(this.props.match.params.id), getUsers()])
            .then((responses) => {
                this.setState({
                    users: responses[1].data,
                    name: responses[0].data.name,
                    price: responses[0].data.price,
                    description: responses[0].data.description,
                    body: responses[0].data.body,
                    url: responses[0].data.url,
                    have_discoun: responses[0].data.have_discoun,
                    is_percentage: responses[0].data.is_percentage,
                    discoun: responses[0].data.discoun,
                    user_id: responses[0].data.user_id,
                    active: responses[0].data.active,
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

        formData.append('cargapp_ad[name]', this.state.name);
        formData.append('cargapp_ad[price]', this.state.price);
        formData.append('cargapp_ad[description]', this.state.description);
        formData.append('cargapp_ad[body]', this.state.body);
        formData.append('cargapp_ad[url]', this.state.url);
        formData.append('cargapp_ad[have_discoun]', this.state.have_discoun);
        formData.append('cargapp_ad[is_percentage]', this.state.is_percentage);
        formData.append('cargapp_ad[discoun]', this.state.discoun);
        if (this.state.image) {
            formData.append('service_document[image]', this.state.image, this.state.image.name);
        }
        if (this.state.media) {
            formData.append('service_document[media]', this.state.media, this.state.media.name);
        }

        const user_id = this.state.user_id && this.state.user_id.key ? this.state.user_id.key : this.state.user_id;
        const active = this.state.active !== undefined && this.state.active.key !== undefined ? this.state.active.key : this.state.active;

        formData.append('cargapp_ad[user_id]', user_id);
        formData.append('cargapp_ad[active]', active);


        putCargappAd(this.props.match.params.id,
            formData).then(() => {
            this.setState({redirect: true})
        })
    }

    render() {
        const {rowStyle, colStyle} = basicStyle;
        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to='/admin/cargapp_ads'/>
        }
        return (

            <LayoutWrapper>


                <Row style={rowStyle} gutter={18} justify="start" block>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                <PageHeader>

                                    <h1>
                                        <IntlMessages id="cargappAds.title"/>

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
                                                                 label_id={'admin.title.name'}
                                                                 required/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Precio">
                                                <TextInputCustom type={"number"} value={this.state.price}
                                                                 placeholder="precio"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'price')}
                                                                 label_id={'admin.title.price'}

                                                                 required/>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Descripción">
                                                <AreaInputCustom value={this.state.description}
                                                                 placeholder="descripción"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'description')}
                                                                 label_id={'admin.title.description'}
                                                                 required/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Cuerpo">
                                                <TextInputCustom value={this.state.body} placeholder="cuerpo"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'body')}
                                                                 label_id={'admin.title.body'}

                                                                 required/>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Url">
                                                <TextInputCustom value={this.state.url} placeholder="url"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'url')}
                                                                 required
                                                                 label_id={'admin.title.url'}
                                                />
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
                                                        <PrimaryButton message_id={'widget.load'}/>
                                                        {this.state.media && this.state.media.name}
                                                    </label>
                                                </div>
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
                                                        <PrimaryButton message_id={'widget.load'}/>
                                                        {this.state.image && this.state.image.name}
                                                    </label>
                                                </div>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item>
                                                <Checkbox
                                                    checked={this.state.is_percentage}
                                                    onChange={(e) => this.handleChange(e.target.checked, 'is_percentage')}
                                                >
                                                    Es porcentaje?
                                                </Checkbox>
                                            </Form.Item>
                                        </Col>

                                        <Col span={12}>
                                            <Form.Item>
                                                <Checkbox
                                                    checked={this.state.have_discoun}
                                                    onChange={(e) => this.handleChange(e.target.checked, 'have_discoun')}
                                                >
                                                    Tiene descuento?
                                                </Checkbox>
                                            </Form.Item>
                                        </Col>

                                    </Row>


                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Descuento">
                                                <TextInputCustom value={this.state.discoun} placeholder="descuento"
                                                                 label_id={'admin.title.discount'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'discoun')}
                                                                 required/>
                                            </Form.Item>
                                        </Col>
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
                                                                   label_id={'admin.title.user'}
                                                >

                                                </SelectInputCustom>
                                            </Form.Item>
                                        </Col>

                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Estado">
                                                <SelectInputCustom required value={this.state.active}
                                                                   placeholder="estado"
                                                                   style={{width: 120}} onChange={(e) => {
                                                    this.handleChange(e, 'active')
                                                }}

                                                                   options={importantVariables.activeOptions.map((item) => {
                                                                       return <Option
                                                                           value={item.key}>{item.label}</Option>
                                                                   })}
                                                                   label_id={'admin.title.user'}
                                                >

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


            </LayoutWrapper>
        );
    }
}
