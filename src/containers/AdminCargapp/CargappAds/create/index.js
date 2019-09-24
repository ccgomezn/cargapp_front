import React, {Component} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import {Row, Col, Form, Card, Select, Checkbox} from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import PrimaryButton from "../../../../components/custom/button/primary"
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import {postCargappAd} from '../../../../helpers/api/adminCalls.js';
import {getActiveUsers} from "../../../../helpers/api/adminCalls";
import TextInputCustom from "../../../../components/custom/input/text";
import SelectInputCustom from "../../../../components/custom/input/select";
import AreaInputCustom from "../../../../components/custom/input/area";


const {Option} = Select;

export default class CargappAdCreate extends Component {


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

        const formData = new FormData();
        const user_id = this.state.user_id && this.state.user_id.key ? this.state.user_id.key : this.state.user_id;
        formData.append('cargapp_ad[name]', this.state.name);
        formData.append('cargapp_ad[price]', this.state.price);
        formData.append('cargapp_ad[description]', this.state.description);
        formData.append('cargapp_ad[body]', this.state.body);
        formData.append('cargapp_ad[url]', this.state.url);
        formData.append('cargapp_ad[have_discoun]', this.state.have_discoun);
        formData.append('cargapp_ad[is_percentage]', this.state.is_percentage);
        formData.append('cargapp_ad[discoun]', this.state.discoun);
        formData.append('cargapp_ad[image]', this.state.image, this.state.image.name);
        formData.append('cargapp_ad[media]', this.state.media, this.state.media.name);
        formData.append('cargapp_ad[user_id]', user_id);
        formData.append('cargapp_ad[active]', true);
        postCargappAd(
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
                                                                 label_id={'admin.title.price'}

                                                                 onChange={(e) => this.handleChange(e.target.value, 'price')}
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
                                                                 label_id={'admin.title.url'}
                                                                 required/>
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
