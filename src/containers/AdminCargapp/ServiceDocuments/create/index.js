import React, { Component } from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import { Row, Col, Form, Card, Select } from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import PrimaryButton from "../../../../components/custom/button/primary"
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import TextInputCustom from "../../../../components/custom/input/text";
import SelectInputCustom from "../../../../components/custom/input/select";
import { transformInputData } from "../../../../helpers/utility";
import SecondaryButton from "../../../../components/custom/button/secondary";
import { getMineUser } from "../../../../helpers/api/users";
import { getActiveServices, getMineServices, postServiceDocument } from "../../../../helpers/api/services";
import { getFilteredDocument } from "../../../../helpers/api/internals";

const { Option } = Select;

export default class ServiceDocumentCreate extends Component {


  constructor() {
    super();
    this.state = {
      redirect: false
    }
  }


  componentWillMount() {
    const service_id = this.props.match.params.id;
    
    let getServices = function () { return getMineServices() };
    if (this.props.admin) {
      getServices = function () { return getActiveServices() };
    }
    axios.all([getMineUser(), getServices(), getFilteredDocument('ServiceDownload')])
      .then((responses) => {
        let document_types = [];
        if (this.props.admin) {
          responses[2].data.forEach(type => {
            document_types.push(type);
          });
        }
        if (this.props.generator) {
          responses[2].data.forEach(type => {
            if (type.id >= 18 && type.id <= 22) {
              document_types.push(type);
            }
          });
        }
        this.setState({
          user_id: responses[0].data.user.id,
          services: responses[1].data,
          document_types: document_types,
        });

      });
    if (service_id) {
      this.setState({ service_id: service_id })
    }
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
    const document_type_id = this.state.document_type_id !== undefined && this.state.document_type_id.key !== undefined ? this.state.document_type_id.key : this.state.document_type_id;
    
    if (this.state.document && document_type_id) {
      formData.append('service_document[name]', '');
      formData.append('service_document[document_type_id]', document_type_id)
      formData.append('service_document[document]', this.state.document, this.state.document.name);
      formData.append('service_document[service_id]', transformInputData(this.state.service_id));
      formData.append('service_document[user_id]', this.state.user_id);
      formData.append('service_document[active]', true);
    }
    
    postServiceDocument(
      formData).then(() => {
        this.setState({ redirect: true })
      });
  }

  render() {
    const { rowStyle, colStyle } = basicStyle;
    const { redirect } = this.state;
    const { generator } = this.props;
    const { id } = this.props.match.params;
    if (redirect) {
      if (generator) {
        return <Redirect to={`/generator/service_documents/detailed/${id}`} />
      } else {
        return <Redirect to={`/admin/service_documents/detailed/${id}`}/>
      }
    }
    return (

      <LayoutWrapper>


        <Row style={rowStyle} gutter={18} justify="start" block>
          <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
            <Row>
              <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                <PageHeader>

                  <h1>
                    <IntlMessages id="serviceDocuments.title" />

                  </h1>
                </PageHeader>
              </Col>
            </Row>
            <Row>
              <Card className="cardContent" style={{ marginTop: '50px' }}>
                <Form>

                  <Row gutter={10}>
                    <Col span={12}>
                      <Form.Item label="Tipo de documento">
                        <SelectInputCustom value={this.state.document_type_id}
                          placeholder="tipo de documento"
                          style={{ width: '100%' }}
                          onChange={(e) => {
                            this.handleChange(e, 'document_type_id')
                          }}
                          options={this.state && this.state.document_types &&
                            this.state.document_types.map((item) => {
                              return <Option
                                value={item.id}>{item.name}</Option>
                            })
                          }
                          label_id={'admin.title.document'}>

                        </SelectInputCustom>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={10}>
                    {!id && <Col span={12}>
                      <Form.Item label="Servicio">
                        <SelectInputCustom value={this.state.service_id} placeholder="servicio"
                          style={{ width: '100%' }} onChange={(e) => {
                            this.handleChange(e, 'service_id')
                          }}
                          options={this.state && this.state.services &&

                            this.state.services.map((item) => {
                              return <Option
                                value={item.id}>{item.name}</Option>
                            })
                          }
                          label_id={'admin.title.service'}>

                        </SelectInputCustom>
                      </Form.Item>
                    </Col>}
                    <Col span={12}>
                      <Form.Item label="Documento">
                        <div style={{ position: 'relative', width: '100%' }}>
                          <input type="file"
                            required
                            id="contained-button-file"
                            onChange={(e) => this.handleChange(e.target.files[0], 'document')}
                            style={{
                              position: 'relative',
                              textAlign: 'right',
                              opacity: 0,
                              zIndex: 2
                            }} />
                          <label htmlFor="contained-button-file" style={{
                            position: 'absolute',
                            top: '0px',
                            left: '0px',
                            width: '100%',
                            zIndex: 1,
                            marginTop: '3px',
                          }}>
                            <SecondaryButton message_id={'widget.load'}
                              style={{ width: '200px' }} />
                            {this.state.document && this.state.document.name}
                          </label>
                        </div>
                      </Form.Item>
                    </Col>

                  </Row>


                  <Row>
                    <Col span={24}>
                      <Form.Item wrapperCol={{ span: 24 }}>
                        <PrimaryButton htmlType={"submit"} message_id={"documents.create"}
                          style={{ width: '200px', marginTop: '20px' }}
                          onClick={() => this.handlePost()} />
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
