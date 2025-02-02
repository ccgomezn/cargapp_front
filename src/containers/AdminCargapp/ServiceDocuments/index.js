import React, { Component } from 'react';
import LayoutWrapper from '../../../components/utility/layoutWrapper.js';
import { tableinfos } from './configs';
import SortView from '../../../components/custom/table/sortView';
import PageHeader from '../../../components/utility/pageHeader';
import IntlMessages from '../../../components/utility/intlMessages';
import { Row, Col, Tabs } from 'antd';
import basicStyle from '../../../settings/basicStyle';
import axios from "axios";
import { Redirect } from 'react-router-dom'
import { getActiveUserRoles } from "../../../helpers/api/users";
import {
  getActiveServiceDocuments,
  getActiveServices,
  getDocumentsOfService,
  getMineServices
} from "../../../helpers/api/services";
import SecondaryButton from "../../../components/custom/button/secondary";
import { ImageModal } from '../../../components/documents/modal';
import Modal from '../../../components/feedback/modal';
import { store } from "../../../redux/store";
import './style.css';
const { TabPane } = Tabs;

export default class ServiceDocument extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reload: false,
      documentModal: false
    }
  }

  transformDataToMap(data, newKey, keyValue) {
    var dataTransformed = {};
    data.map((item) => {
      dataTransformed[item[newKey]] = item[keyValue];
      return item;
    });

    return dataTransformed
  }

  getGeneratorDocuments(docList) {
    let generatorDocuments = [];

    docList.forEach(document => {
      if (document.document_type_id !== 37 && document.document_type_id !== 38) {
        generatorDocuments.push(document);
      }
    });
    return generatorDocuments;
  }

  // change data here!!!!!
  componentDidMount() {
    let id = this.props.match.params.id;
    let getDocumentsFunction = function () {
      return getActiveServiceDocuments();
    };
    let getServicesFunction = function () {
      return getActiveServices();
    };
    if (id !== null && id !== undefined) {
      getDocumentsFunction = function () {
        return getDocumentsOfService(id);
      };
      getServicesFunction = function () {
        return getMineServices();
      };
    }
    axios.all([getDocumentsFunction(), getActiveUserRoles(), getServicesFunction()])
      .then((responses) => {
        if (responses[0] !== undefined) {
          let roles_data = this.transformDataToMap(responses[1].data, 'user_id', 'role_id');
          let service_data = this.transformDataToMap(responses[2].data, 'id', 'name');
          let active = [], inactive = [];
          let docList = this.props.generator ? 
                          this.getGeneratorDocuments(responses[0].data) : responses[0].data;

          docList.map((item) => {
            if (roles_data[item.user_id] === 11) {
              item.user_role = 'Camionero';
            } else if (roles_data[item.user_id] === 15) {
              item.user_role = 'Generador de carga';
            } else {
              item.user_role = 'Cargapp admin';
            }
            item.service = service_data[item.service_id];
            if (item.active) {
              item.active = 'Activo';
              item.color = '#00BFBF';
              active.push(item);
            } else {
              item.active = 'Desactivado';
              item.color = '#ff2557';
              inactive.push(item);
            }

            let formatedDatetime = item.updated_at.split('T').join(', ').split('.')[0];
            item.last_update = formatedDatetime;

            return item;
          });
          this.setState({
            service_documents: active, inactive
          });
        }
      })
  }

  redirectAdd() {
    let { id } = this.props.match.params;
    id = id ? id : '';
    if (this.props.generator) {
      this.props.history.push('/generator/service_documents/add/' + id)
    } else {
      this.props.history.push('/admin/service_documents/add/' + id)
    }
  }

  toggleModal() {
    this.setState({ documentModal: !this.state.documentModal });
    return {
      type: 'TOGGLE_DOCUMENT_MODAL',
      payload: ''
    }
  }

  render() {
    const { rowStyle, colStyle } = basicStyle;
    const { reload } = this.state;
    const { generator } = this.props;
    let tableInfos = generator ? tableinfos[2] : tableinfos[1];
    if (reload) {
      if (this.props.generator) {
        return <Redirect to='/generator/service_documents' />

      } else {
        return <Redirect to='/admin/service_documents' />

      }
    }
    let documentModalData = store.getState().Documents;
    let isImgModal = store.getState().Documents.isImg;
    
    return (
      <LayoutWrapper>
        {isImgModal && 
          <ImageModal
            style={{ paddingTop: 20}}
            closable={true}
            visible={documentModalData.documentModalActive}
            onCancel={() => store.dispatch(this.toggleModal())}
            cancelText="Cancel"
            image={this.state.service_documents && documentModalData.id &&
              this.state.service_documents
                .find(doc => doc.id === documentModalData.id)
                  .document}
        />}
        {!isImgModal && 
          <Modal
          visible={documentModalData.documentModalActive}
          style={{width: '100%'}}
          closable={true}
          onCancel={() => store.dispatch(this.toggleModal())}
          body={
            this.state.service_documents && documentModalData.id &&
              <iframe 
                style={{width: '100%', height: 650}}
                src={this.state.service_documents
                  .find(doc => doc.id === documentModalData.id)
                    .document}/>}
          />}
        <Row style={rowStyle} gutter={18} justify="start" block>
          <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
            <Row gutter={12}>
              <Col lg={18} md={24} sm={24} xs={24} style={colStyle}>
                <PageHeader>

                  <h1>
                    <IntlMessages id="serviceDocuments.title" />

                  </h1>
                </PageHeader>
              </Col>

              <Col lg={6} md={24} sm={24} xs={24} style={colStyle}>
                <SecondaryButton
                  message_id={"documents.add"}
                  style={{ width: '100%' }}
                  onClick={() => this.redirectAdd()} />
              </Col>
            </Row>
            <Row>
              <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                <Tabs defaultActiveKey="1">
                  <TabPane tab="Activo" key="1">
                    {this.state && this.state.service_documents &&
                      <SortView tableInfo={tableInfos} dataList={this.state.service_documents} />
                    }
                  </TabPane>
                  <TabPane tab="Inactivo" key="2">
                    {this.state && this.state.inactive &&
                      <SortView tableInfo={tableInfos} dataList={this.state.inactive} />
                    }
                  </TabPane>

                </Tabs>

              </Col>
            </Row>

          </Col>
        </Row>


      </LayoutWrapper>
    );
  }
}
export { tableinfos };
