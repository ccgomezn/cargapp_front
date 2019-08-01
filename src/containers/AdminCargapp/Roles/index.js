import React, { Component } from 'react';
import LayoutWrapper from '../../../components/utility/layoutWrapper.js';
import fakeData from './fakeData';
import { tableinfos } from './configs';
import SortView from '../../../components/custom/table/sortView';
import PageHeader from '../../../components/utility/pageHeader';
import IntlMessages from '../../../components/utility/intlMessages';
import { Row, Col } from 'antd';
import basicStyle from '../../../settings/basicStyle';
import PrimaryButton from "../../../components/custom/button/primary";
import axios from "axios";
const dataList = new fakeData(10);
export default class Roles extends Component {


  constructor(props) {
    super();
    

  }
  
  componentWillMount() {
    axios.get(`https://cors-anywhere.herokuapp.com/http://api.cargapp.co/api/v1/roles`)
      .then((response) => {
        
        response.data.map(function (item) {
          if(item.active){
            item.active = 'Activo';
          }else{
            item.active = 'Desactivado';
          }
        })
        this.setState({
          roles: response.data
        });
      }).catch((error) => {
        console.error(error);
      });
  }

  getInitData(){
    console.log("initData");

    if(this.state.roles.length === 0){
      return dataList.getAll();
    }
    return this.state.roles
  }
  redirectAdd(){
    this.props.history.push('/dashboard/admin/roles-add')

  }
  render() {
    const { rowStyle, colStyle } = basicStyle;

    return (
      <LayoutWrapper>
        

        <Row style={rowStyle} gutter={18} justify="start" block>
          <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
            <Row>
              <Col lg={18} md={24} sm={24} xs={24} style={colStyle}>
                <PageHeader>

                  <h1>
                    <IntlMessages id="roles.title" />

                  </h1>
                </PageHeader>
              </Col>
              <Col lg={6} md={24} sm={24} xs={24} style={colStyle}>
                <PrimaryButton 
                  message_id={"general.add"}
                  style={{width: '100%'}}
                  onClick={() => this.redirectAdd()}/>
              </Col>
            </Row>
            <Row>
              <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                {this.state && this.state.roles &&
                  <SortView tableInfo={tableinfos[1]} dataList={this.state.roles} />
                }
              </Col>
            </Row>

          </Col>
        </Row>




      </LayoutWrapper>
    );
  }
}
export { tableinfos, dataList };
