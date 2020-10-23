import React, { Component } from 'react';
import LayoutWrapper from '../../../components/utility/layoutWrapper.js';
import { tableinfos } from './configs';
import SortView from '../../../components/custom/table/sortView';
import PageHeader from '../../../components/utility/pageHeader';
import IntlMessages from '../../../components/utility/intlMessages';
import { Row, Col } from 'antd';
import basicStyle from '../../../settings/basicStyle';
import axios from "axios";

import { getActiveChats, getMineRooms } from "../../../helpers/api/chat";
import { getActiveServices } from "../../../helpers/api/services";

export default class Chat extends Component {


  constructor(props) {
    super();
    this.state = {
    }

  }

  transformDataToMap(data, key) {
    let dataTransformed = {};

    data.forEach(data => {
      dataTransformed[data[key]] = data;
    });

    return dataTransformed
  }

  componentWillMount() {
    axios.all([getMineRooms(), getActiveChats(), getActiveServices()])
      .then(responses => {
        let services = this.transformDataToMap(responses[2].data, 'id');
        let chat_ids = [];
        responses[0].data.forEach(chat => {
          chat_ids.push(chat.room_id);
        });

        let real_chats = [];
        responses[1].data.forEach(chat => {
          if (chat_ids.includes(chat.id)) {
            chat.service = services[chat.service_id];

            if (chat.service != undefined) {
              real_chats.push(chat);
            }
          }
        });

        this.setState({
          real_chats: real_chats
        });
      })
  }

  render() {
    const { rowStyle, colStyle } = basicStyle;

    return (
      <LayoutWrapper>
        <Row style={rowStyle} gutter={18} justify="start" block>
          <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
            <Row gutter={12}>
              <Col lg={18} md={24} sm={24} xs={24} style={colStyle}>
                <PageHeader>

                  <h1>
                    <IntlMessages id="chats.title" />

                  </h1>
                </PageHeader>
              </Col>
            </Row>

            <Row>
              <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                {this.state.real_chats && <SortView tableInfo={tableinfos[1]} dataList={this.state.real_chats} />}
              </Col>
            </Row>

          </Col>
        </Row>


      </LayoutWrapper>
    );
  }
}
