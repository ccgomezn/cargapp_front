import React, { Component } from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import { Row, Col, Avatar } from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import { Form } from "antd";
import PrimaryButton from "../../../../components/custom/button/primary";
import { Card } from 'antd';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Modal from '../../../../components/feedback/modal';
import { getActiveProfiles, getUser, getMineStatistics, getDocumentsOfUser } from "../../../../helpers/api/users";
import { getRateServices } from "../../../../helpers/api/services";
import { TitleLabel, TitleDivider } from './style.js';
import { PdfDocumentCustom } from "../../../../components/documents/pdf";
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

export default class TicketShow extends Component {


  constructor(props) {
    super();
    this.state = {
      redirect: false,
      documentModal: false,
      licenseModal: false,
      arlModal: false,
    }
  }

  formatDocumentImages(documents) {
    let id_documents = ['', ''];
    let license_documents = ['', ''];
    let arl_document = '';

    documents.forEach(document => {
      switch (document.document_type_id) {
        case 5:
          id_documents[0] = document.file;
          break;
        case 7:
          id_documents[1] = document.file;
          break;
        case 4:
          license_documents[0] = document.file;
          break;
        case 8:
          license_documents[1] = document.file;
          break;
        case 12:
          arl_document = document.file;
        default:
          break;
      }
    });

    return [id_documents, license_documents, arl_document];
  }

  componentWillMount() {
    const { id } = this.props.match.params;
    axios.all([getUser(id), getRateServices(), getActiveProfiles(), getMineStatistics(), getDocumentsOfUser({ "user": { "id": id } })])
      .then((responses) => {
        let documents = responses[4].data;
        documents = this.formatDocumentImages(documents);
        let id_documents = documents[0];
        let license_documents = documents[1];
        let arl_document = documents[2];

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
          average = sum_average / count;
        } else {
          average = 'El usuario no tiene calificaciones'
        }


        if (responses[4].data !== null) {

        }
        this.setState({
          email: responses[0].data.email,
          phone_number: responses[0].data.phone_number,
          average: average,
          total_services: responses[3].data.total_services,
          kilometers: responses[3].data.kilometres,
          identification_documents: id_documents,
          license_documents: license_documents,
          arl_document: arl_document,
        });

      }).catch((error) => {
        console.error(error);
      });
  }

  modalClick(modalState, modalStateValue) {
    this.setState({
      [modalState]: !modalStateValue
    });
  }

  goBack() {
    if (this.props.generator) {
      if (this.props.detail) {
        this.props.history.push('/generator/service_users/' + this.props.match.params.service_id)

      } else {
        this.props.history.push('/generator/services/detail/' + this.props.match.params.service_id)
      }
    } else {
      this.props.history.push('/admin/users')
    }
  }

  pdfHasImages(pdf) {
    if (pdf && pdf.props && (pdf.props.image1 !== undefined || pdf.props.image2 !== undefined)) {
      return true;
    }
    return false;
  }

  render() {
    const { rowStyle, colStyle } = basicStyle;
    const { redirect } = this.state;

    let id_documents_pdf = '';
    let license_documents_pdf = '';
    let arl_document_pdf = '';

    if (this.state.identification_documents !== undefined) {
      id_documents_pdf = <PdfDocumentCustom
        image1={this.state.identification_documents[0]}
        image2={this.state.identification_documents[1]}
        title={`Cedula conductor: ${this.state.name}`} />
    }
    if (this.state.license_documents !== undefined) {
      license_documents_pdf = <PdfDocumentCustom
        image1={this.state.license_documents[0]}
        image2={this.state.license_documents[1]}
        title={`Licencia de conducción: ${this.state.name}`} />
    }
    if (this.state.arl_document !== undefined) {
      arl_document_pdf = <PdfDocumentCustom
        image1={this.state.arl_document}
        title={`Planilla Arl conductor: ${this.state.name}`} />
    }

    if (redirect) {
      return <Redirect to='/admin/tickets' />
    }

    return (
      <LayoutWrapper>

        <Row style={rowStyle} gutter={18} justify="start" block>
          <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
            <Row>
              <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                <PageHeader>
                  <h1> Conductor asignado </h1>
                </PageHeader>
              </Col>
            </Row>
            <Row>
              <Card className="cardContent" style={{ marginTop: '50px' }}>
                <Row gutter={10}>
                  <Col span={5} style={{ textAlign: 'center' }}>
                    <Avatar style={{ marginTop: '30px' }} size={160} src={this.state.avatar} />
                    <h3 style={{marginTop: 10}}>{this.state.name}</h3>
                  </Col>
                  <Col span={1}></Col>
                  <Col span={18}>
                    <TitleLabel>Conductor</TitleLabel>
                    <TitleDivider />
                    <Row>
                      <Col span={12}>
                        <Form.Item label="Correo electrónico" style={{ marginBottom: '15px' }}>
                          <div class="ant-form-item-control" style={{ lineHeight: 1 }}>
                            {this.state.email}
                          </div>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Número de identificación" style={{ marginBottom: '15px' }}>
                          <div class="ant-form-item-control" style={{ lineHeight: 1 }}>
                            {this.state.identification}
                          </div>
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row>
                      <Col span={12}>
                        <Form.Item label="Viajes realizados" style={{ marginBottom: '15px' }}>
                          <div class="ant-form-item-control" style={{ lineHeight: 1 }}>
                            {this.state.total_services || 'No ha realizado ningún viaje'}
                          </div>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Kilómetros recorridos" style={{ marginBottom: '15px' }}>
                          <div class="ant-form-item-control" style={{ lineHeight: 1 }}>
                            {this.state.kilometers || 'No ha realizado ningún viaje'}
                          </div>
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row>
                      <div style={{ marginTop: 190 }}>
                        <TitleLabel>Documentos</TitleLabel>
                        <TitleDivider />
                      </div>
                      
                      <Row>

                        <Col span={12}>
                          <Form.Item label="Documento de identidad">
                          {this.pdfHasImages(id_documents_pdf) && <a style={{ marginRight: 20 }} href="#"
                              onClick={() => this.modalClick('documentModal', this.state.documentModal)}>Vista previa</a>}
                            <Modal
                              style={{paddingTop: 20}}
                              closable={true}
                              title="CC conductor"
                              visible={this.state.documentModal}
                              onCancel={() => this.modalClick('documentModal', this.state.documentModal)}
                              cancelText="Cancel"
                              body={id_documents_pdf !== '' && 
                                <PDFViewer style={{width: '100%', height: 700}}>
                                  {id_documents_pdf}
                                </PDFViewer>} />

                            {id_documents_pdf !== '' && <PDFDownloadLink document={id_documents_pdf} fileName={`cc_conductor_${this.state.identification}.pdf`}>
                              {({ loading }) => (loading ? 'Cargando documento...' : 'Descargar')}
                            </PDFDownloadLink>}
                          </Form.Item>
                        </Col>

                        <Col span={12}>
                          <Form.Item label="Licencia de conducción">
                          {this.pdfHasImages(license_documents_pdf) && <a style={{ marginRight: 20 }} href="#"
                              onClick={() => this.modalClick('licenseModal', this.state.licenseModal)}>Vista previa</a>}
                            <Modal
                              style={{paddingTop: 20}}
                              closable={true}
                              title="CC conductor"
                              visible={this.state.licenseModal}
                              onCancel={() => this.modalClick('licenseModal', this.state.licenseModal)}
                              cancelText="Cancel"
                              body={license_documents_pdf !== '' && 
                                <PDFViewer style={{width: '100%', height: 700}}>
                                  {license_documents_pdf}
                                </PDFViewer>} />

                            {license_documents_pdf !== '' && <PDFDownloadLink document={license_documents_pdf} fileName={`licencia_conductor_${this.state.identification}.pdf`}>
                              {({ loading }) => (loading ? 'Cargando documento...' : 'Descargar')}
                            </PDFDownloadLink>}
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row>
                        <Col span={8}>
                          <Form.Item label="Planilla de pagos ARL">
                            {console.log(this.pdfHasImages(arl_document_pdf))}
                          {this.pdfHasImages(arl_document_pdf) && <a style={{ marginRight: 20 }} href="#"
                              onClick={() => this.modalClick('arlModal', this.state.arlModal)}>Vista previa</a>}
                            <Modal
                              style={{paddingTop: 20}}
                              closable={true}
                              title="CC conductor"
                              visible={this.state.arlModal}
                              onCancel={() => this.modalClick('arlModal', this.state.arlModal)}
                              cancelText="Cancel"
                              body={arl_document_pdf !== '' && 
                                <PDFViewer style={{width: '100%', height: 700}}>
                                  {arl_document_pdf}
                                </PDFViewer>} />

                            {arl_document_pdf !== '' && <PDFDownloadLink document={arl_document_pdf} fileName={`arl_conductor_${this.state.identification}.pdf`}>
                              {({ loading }) => (loading ? 'Cargando documento...' : 'Descargar')}
                            </PDFDownloadLink>}
                          </Form.Item>
                        </Col>
                      </Row>
                    </Row>
                  </Col>
                </Row>
              </Card>


              <Row>
                <Col span={5}>
                  <Form.Item wrapperCol={{ span: 24 }}>
                    <PrimaryButton message_id={"general.back"} style={{ width: '100%' }}
                      onClick={() => this.goBack()} />
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
