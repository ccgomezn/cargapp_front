import React, { Component } from 'react';
import LayoutWrapper from '../../../components/utility/layoutWrapper.js';
import { tableinfos } from './configs';
import SortView from '../../../components/custom/table/sortView';
import PageHeader from '../../../components/utility/pageHeader';
import IntlMessages from '../../../components/utility/intlMessages';
import { Row, Col } from 'antd';
import basicStyle from '../../../settings/basicStyle';
import PrimaryButton from "../../../components/custom/button/primary";
import axios from "axios";
import httpAddr from "../../../helpers/http_helper"

export default class LoadType extends Component {


  constructor(props) {
    super();
    

  }
  
  componentWillMount() {
    axios.get(httpAddr + `/load_types`)
      .then((response) => {
        
        response.data.map((item) => {
          if (item.active) {
            item.active = 'Activo';
            item.color = '#00BFBF';
          } else {
            item.active = 'Desactivado';
            item.color = '#ff2557';
          }
          return item;
        })
        this.setState({
          load_types: response.data
        });
      }).catch((error) => {
        console.error(error);
      });
  }

  
  redirectAdd(){
    this.props.history.push('/dashboard/admin/load_types_add')

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
                    <IntlMessages id="loadType.title" />

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
                {this.state && this.state.load_types &&
                  <SortView tableInfo={tableinfos[1]} dataList={this.state.load_types} />
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
