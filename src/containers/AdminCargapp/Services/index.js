import React, { Component } from 'react';
import LayoutWrapper from '../../../components/utility/layoutWrapper.js';
import { tableinfos } from './configs';
import SortView from '../../../components/custom/table/sortView';
import PageHeader from '../../../components/utility/pageHeader';
import IntlMessages from '../../../components/utility/intlMessages';
import { Row, Col, Form } from 'antd';
import basicStyle from '../../../settings/basicStyle';
import axios from "axios";
import { Redirect } from 'react-router-dom'
import { getVehicle } from "../../../helpers/api/vehicles";
import { getActiveModels, getStatusOfModel } from "../../../helpers/api/internals";
import { getMineUser } from "../../../helpers/api/users";
import PrimaryButton from "../../../components/custom/button/primary"
import SecondaryButton from "../../../components/custom/button/secondary";
import { NormalModal } from '../../../components/documents/modal';
import { store } from "../../../redux/store";
import { Tabs } from 'antd';
import {getActiveServices, 
        getMineServices, 
        getServices, 
        getServicesOfDriver,
        postServiceDocument,
        putService } from "../../../helpers/api/services";


const { TabPane } = Tabs;
export default class Service extends Component {


  constructor(props) {
    super(props);
    this.state = {
      reload: false,
      paymentModal: false,
      actualPaymentDocument: ''
    }
  }

  transformDataToMap(data, key) {
    var dataTransformed = {};
    data.map((item) => {
      dataTransformed[item.id] = item[key];
      return item;
    });

    return dataTransformed
  }

  getActiveServices(data) {
    let data_transformed = [];
    data.forEach((service) => {
      if (service.statu_id !== 10 && service.statu_id !== 11) {
        data_transformed.push(service);
      }
    });
    return data_transformed;
  }

  getServicesPermissions(globalPermissions) {
    let servicePermissions = [];

    if (globalPermissions !== undefined) {
      globalPermissions.forEach(
        function (permissions) {
          let cargapp_model = permissions.cargapp_model;

          if (cargapp_model.name === 'services') {
            servicePermissions.push(permissions.action);
          }
        }
      );
    }
    return servicePermissions;
  }

  sortByTargetKey(array, key, targetKey) {
    array.sort(function(a, b){
      if(a[key] === targetKey) { return -1; }
      if(a[key] > b[key]) { return 1; }
      return 0;
    });
  }

  findByKeyAndValue(array, key, value) {
    let index = array.findIndex(function(element) {
      return element[key] === value;
    });

    return index;
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    const { generator, active_services, vehicle_manager } = this.props;
    const {role_id} = this.props;

    let getServicesFunction = function () {
      return getServices();
    };

    if (id !== null && id !== undefined) {
      getServicesFunction = function () {
        return getServicesOfDriver(
          id
        );
      };
    } else if (generator) {
      getServicesFunction = function () {
        return getMineServices(id);
      }
    } else if (vehicle_manager) {

      getServicesFunction = function () {
        return getActiveServices();
      }
    }
    getActiveModels().then(response => {
      let model_id = '';

      response.data.forEach(model => {
        if (model.code === 'SERVICE') {
          model_id = model.id
        }
      });
      axios.all([getServicesFunction(), getStatusOfModel(model_id), getMineUser()])
        .then((responses) => {
          let role = responses[2].data.roles[0];
          let actualUserId = responses[2].data.user.id;
          let role_id = role.role_id;
          let servicesPermissions = this.getServicesPermissions(role.permissions);

          this.setState({
            user_id: actualUserId,
            role_id: role_id,
            permissions: servicesPermissions
          });

          if (responses[0] !== undefined) {
            let activeServices = [];
            let nonActiveServices = [];
            let status_data = this.transformDataToMap(responses[1].data, 'name');
            responses[0].data.map((item) => {
              if (item.active) {
                // owner bank account missing!!!!
                if (role_id === 24) {
                  getVehicle(item.vehicle_id)
                  .then((response) => {
                    let vehicleData = response.data;
                    item.owner_name = vehicleData.owner_vehicle;
                    item.owner_id = vehicleData.owner_document_id;
                    activeServices.push(item);
                  }).catch((error) => {
                    console.log(error)
                  });
                } else {  
                  activeServices.push(item);
                }
              } else {
                nonActiveServices.push(item);
              }

              if (item.active) {
                item.active = 'Activo';
                item.color = '#00BFBF';
              } else {
                item.active = 'Desactivado';
                item.color = '#ff2557';
              }
              item.status = status_data[item.statu_id];
              item.origin_destination = `${item.origin} - ${item.destination}`;

              return item;
            });
            
            if (vehicle_manager && (id === null || id === undefined)) {
              let realServices = [];
              responses[0].data.forEach(service => {
                if (service.statu_id === 10 && service.active) {
                  realServices.push(service);
                }
              });
              this.setState({
                services: realServices
              });
            } else if (active_services) {
              this.setState({ services: this.getActiveServices(responses[0].data) });
            } else {
              this.setState({ services: activeServices, nonActiveServices: nonActiveServices });
            }
          }
        })
    })
  }

  redirectAdd(generator) {
    if (generator) {
      this.props.history.push('/generator/services/add')
    } else {
      this.props.history.push('/admin/services/add')
    }
  }

  hasPermission(action) {
    let permissions = this.state.permissions;

    if (permissions !== undefined) {
      return (permissions.includes(action) || permissions.includes('all'));
    }
    return false;
  }

  toggleModal() {
    this.setState({ paymentModal: !this.state.paymentModal });
    return {
      type: 'TOGGLE_DOCUMENT_MODAL',
      payload: ''
    }
  }

  handleChange(value, type) {
    this.setState(
      {
        [type]: value
      });
  }

  changeStatus(id, statusId) {
    (putService(id, { statu_id: statusId })
      .then((response) => {
        window.location.href = window.location.protocol + '//' + window.location.host + '/admin' + '/services/';
      }).catch((error) => {
        console.error(error);
      }));
  }

  documentPost(actualServiceId) {
    const paymentDocumentId = 38;
    let formData = new FormData();
    
    if (this.state.actualPaymentDocument) {
      formData.append('service_document[name]', '');
      formData.append('service_document[document_type_id]', paymentDocumentId);
      formData.append('service_document[document]', this.state.actualPaymentDocument, this.state.actualPaymentDocument.name);
      formData.append('service_document[service_id]', actualServiceId);
      formData.append('service_document[user_id]', this.state.user_id);
      formData.append('service_document[active]', true);
    }
    
    postServiceDocument(formData)
      .then(() => {
        let acceptStatus = 50;
        this.setState({ reload: true });
        this.changeStatus(actualServiceId, acceptStatus);
      });
  }

  render() {
    const { rowStyle, colStyle } = basicStyle;
    const { reload } = this.state;
    const { id } = this.props.match.params;
    const { generator, vehicle_manager, active_services } = this.props;
    let hasUpdatePermission = this.hasPermission('update');
    let hasDeletePermission = this.hasPermission('destroy');
    let tableinforeal;
    let paymentModalData = store.getState().Documents;
    let ownerName;
    let ownerId;
    let ownerAccount;
    let actualServiceId;
    
    if (this.state.services) {
      this.sortByTargetKey(this.state.services, 'status', 'En proceso de pago');
    }

    if (this.state.role_id === 24) {
      tableinforeal = tableinfos[6];
    } else if (this.state.role_id === 28 && hasUpdatePermission && hasDeletePermission) {
      tableinforeal = tableinfos[1];
    } else if (this.state.role_id === 28 && hasUpdatePermission) {
      tableinforeal = tableinfos[7];
    } else if (this.state.role_id === 15 && hasUpdatePermission && hasDeletePermission) {
      tableinforeal = tableinfos[2];
    } else if (this.state.role_id === 15 && hasUpdatePermission) {
      tableinforeal = tableinfos[8];
    } else {
      tableinforeal = tableinfos[0];
    }

    let modalServiceId = store.getState().Documents.id;
    if (this.state.services && modalServiceId) {
      actualServiceId = this.findByKeyAndValue(this.state.services, 'id', modalServiceId);
      let actualService = this.state.services[actualServiceId];
      ownerName = actualService.owner_name;
      ownerId = actualService.owner_id;
      ownerAccount = 'Falta esto!';
    }    

    if (reload) {
      if (this.state.role_id === 15) {
        return <Redirect to='/generator/services' />

      } else if (this.state.role_id === 27) {
        return <Redirect to='/vehicle_manager/services' />

      } else {
        return <Redirect to='/admin/services' />
      }
    }

    return (
      <LayoutWrapper>
        <NormalModal
          visible={paymentModalData.documentModalActive}
          style={{width: '100%'}}
          closable={true}
          onCancel={() => store.dispatch(this.toggleModal())}
          title={<h2 style={{textAlign: 'center'}}> Comprobante de pago de saldo </h2>}
          body={
            <div>
              <h3>Información del pago: </h3>
              <ul style={{listStyleType: 'disc', marginLeft: '5%', marginTop: '1%', 
                          fontSize: '1.05rem'}}> 
                <li> Nombre del destinatario: {ownerName}</li>
                <li> Documento del destinatario: {ownerId}</li>
                <li> Cuenta del destinatario: {ownerAccount}</li>
              </ul>

              <Form style={{textAlign: 'center', marginTop: '3%'}}>
                <Form.Item label="Subir comprobante:">
                  <div style={{ position: 'relative', 
                                width: '100%', 
                                paddingLeft: '30%',
                                paddingRight: '30%' }}>
                    <input type="file"
                      required
                      id="contained-button-file"
                      onChange={(e) => this.handleChange(e.target.files[0], 'actualPaymentDocument')}
                      style={{
                        position: 'relative',
                        opacity: 0,
                        zIndex: 1,
                      }} />
                    <label htmlFor="contained-button-file" style={{
                      position: 'absolute',
                      top: '0px',
                      left: '0px',
                      width: '100%',
                      zIndex: 0,
                      marginTop: '3px',
                    }}>
                      <SecondaryButton message_id={'widget.load'}
                        style={{ width: '200px'}} />
                      {this.state.actualPaymentDocument && this.state.actualPaymentDocument.name}
                    </label>
                  </div>
                </Form.Item>

                <Form.Item wrapperCol={{ span: 24 }}>
                  {modalServiceId && <PrimaryButton htmlType={"submit"} message_id={'Pagar'}
                    style={{ width: '200px', marginTop: '20px' }}
                    onClick={() => this.documentPost(modalServiceId)} />}
                </Form.Item>
              </Form>
              
            </div> 
          }/>

        <Row style={rowStyle} gutter={18} justify="start" block>
          <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
            <Row gutter={12}>
              <Col lg={18} md={24} sm={24} xs={24} style={colStyle}>
                <PageHeader>

                  <h1>
                    <IntlMessages id="services.title" />

                  </h1>
                </PageHeader>
              </Col>

              <Col lg={6} md={24} sm={24} xs={24} style={colStyle}>
                {
                  !vehicle_manager && <SecondaryButton
                    message_id={"general.add"}
                    style={{ width: '100%' }}
                    onClick={() => this.redirectAdd(generator)} />
                }

              </Col>
            </Row>
            <Row>
              <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                {!vehicle_manager && !active_services &&
                  <Tabs defaultActiveKey="1">
                    <TabPane tab="Activo" key="1">
                      {this.state && this.state.services &&
                        <SortView tableInfo={tableinforeal} dataList={this.state.services} />
                      }
                    </TabPane>
                    <TabPane tab="Inactivo" key="2">
                      {this.state && this.state.nonActiveServices &&
                        <SortView tableInfo={tableinforeal} dataList={this.state.nonActiveServices} />
                      }
                    </TabPane>

                  </Tabs>

                }
                {(vehicle_manager || active_services) && this.state && this.state.services &&
                  <SortView tableInfo={tableinforeal} dataList={this.state.services} />
                }
              </Col>
            </Row>

          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}
export { tableinfos };
