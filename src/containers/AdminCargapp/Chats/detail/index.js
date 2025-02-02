import React, { Component } from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import { Row, Col, Card, Icon } from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import PrimaryButton from "../../../../components/custom/button/primary"
import TextInputCustom from "../../../../components/custom/input/text";
import { ChatFeed, Message } from 'react-chat-ui'
import firebase from '../../../../components/firestore/Firestore'
import { getActiveChats, getMineRooms, getRoom } from "../../../../helpers/api/chat";
import { getMineProfile, getMineUser, getProfileOfUser } from "../../../../helpers/api/users";
import axios from "axios"
import { animateScroll } from "react-scroll";
import List from "antd/es/list";
import { getActiveServices } from "../../../../helpers/api/services";
import Skeleton from "antd/es/skeleton";
import Avatar from "antd/es/avatar";
import Divider from "antd/es/divider";


export default class ChatDetail extends Component {
  messagesEndRef = React.createRef()


  constructor(props) {
    super();
    this.state = {
      is_typing: false,
      chatModified: false,
      messages: []
    };
  }

  scrollToBottom = () => {
    animateScroll.scrollToBottom({
      containerId: "chat-container"
    });
  };

  async componentDidMount() {
    axios.all([getMineRooms(), getActiveChats(), getActiveServices(), getMineUser()])
    .then(responses => {
      let role = responses[3].data.roles[0];
      let role_id = role.role_id;
      let services = this.transformDataToMap(responses[2].data, 'id');
      let chat_ids = [];

      responses[0].data.forEach(chat => {
        chat_ids.push(chat.room_id);
      });

      let real_chats = [];
      responses[1].data.forEach(async chat => {
        if (chat_ids.includes(chat.id)) {
          chat.service = services[chat.service_id];

          if (chat.service != undefined) {
            chat.driver_id = chat.service.user_driver_id;
            
            let profile = await getProfileOfUser(chat.driver_id);
            profile = profile.data;
            chat.driver_avatar = profile.avatar;
            chat.driver_name = `${profile.firt_name} ${profile.last_name}`;

            real_chats.push(chat);
            this.setState({chatModified: true});
          }
        }
      });

      this.setState({
        real_chats: real_chats,
        role_id: role_id,
      })
    })
  }

  enableChat(uid) {
    uid = uid.toString();
    if (this.state.unsubscribe !== null && this.state.unsubscribe !== undefined) {
      this.state.unsubscribe();
    }
    axios.all([getRoom(uid), getMineProfile()]).then(responses => {
      this.setState({
        name: responses[0].data.name,
        user_id: responses[1].data[0].user.id,
        user_name: responses[1].data[0].profile.firt_name + ' ' + responses[1].data[0].profile.last_name,
      });
    });
    const unsubscribe = firebase.firestore().collection('chat_' + uid).onSnapshot({
      error: (e) => console.error(e),
      next: (querySnapshot) => {
        let messages = [];
        let docs = querySnapshot.docs;
        docs = docs.sort(function (a, b) {
          a = a.get('created_at').toDate();
          b = b.get('created_at').toDate();
          return b > a ? -1 : b < a ? 1 : 0;
        });
        docs.forEach(message => {

          let id = message.get('user_id').toString() === this.state.user_id.toString() ? 0 : message.get('user_id');

          messages.push(new Message({
            id: id,
            senderName: message.get('user_name') + ' (' + message.get('created_at').toDate().toLocaleDateString("es-ES", {
              hour: "2-digit",
              minute: "2-digit",
            }) + ')',
            message: message.get('message'),
            date: message.get('created_at'),
          }))
        });

        this.setState({ messages })
        this.scrollToBottom();

      },
    });

    this.setState({ unsubscribe })
    this.setState({ uid })
  }

  transformDataToMap(data, key) {
    let dataTransformed = {};
    data.forEach(data => {
      dataTransformed[data[key]] = data;
    });

    return dataTransformed
  }

  handleChange(value, type) {
    this.setState(
      {
        [type]: value
      }
    )
  }

  handleSend() {
    const { uid } = this.state;
    
    if ((this.state.message) && (this.state.message.trim() !== '')) {
      firebase.firestore().collection('chat_' + uid).add({
        created_at: new Date(),
        message: this.state.message,
        user_id: this.state.user_id,
        user_name: this.state.user_name,
        message_type: 'text'
      });
      this.setState({
        message: ''
      });
    }
  }


  render() {
    const { rowStyle, colStyle } = basicStyle;
    let canMessage = this.state.role_id === 15;
    
    return (
      <LayoutWrapper>
        <Row style={rowStyle} gutter={18} justify="start" block>
          <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
            <Row>
              <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                <PageHeader>

                  <h1>
                    {this.state.name ? this.state.name : 'Tus chats'}
                  </h1>
                </PageHeader>
              </Col>
            </Row>
            <Row>
              <Card style={{ marginTop: '50px' }}>
                <Col span={6} style={{ height: '500px', overflow: 'auto', }}>
                  {this.state.real_chats && <List
                    className="demo-loadmore-list"
                    itemLayout="horizontal"
                    dataSource={this.state.real_chats}
                    renderItem={item => (
                      <Skeleton avatar loading={false} active>
                        <List.Item.Meta
                          avatar={ 
                            <Avatar
                              src={item.driver_avatar}
                              icon='user'
                              size='large'
                               />
                          }
                          title={<a href={'#chat'} style={item.id.toString() === this.state.uid ? { color: 'rgb(0, 132, 255)' } : {}} onClick={() => this.enableChat(item.id)}>
                            {item.service.origin + ' - ' + item.service.destination}</a>}
                          description={item.driver_name}
                        />
                        <Divider />
                      </Skeleton>
                    )}
                  />}

                </Col>
                <Col span={1}></Col>
                <Col span={17}>
                  <div id="chat-container" style={{
                    height: '500px',
                    overflow: 'auto',
                    paddingLeft: '20px',
                    paddingRight: '20px'
                  }}>
                    <ChatFeed
                      messages={this.state.messages} // Boolean: list of message objects
                      isTyping={this.state.is_typing} // Boolean: is the recipient typing
                      showSenderName // show the name of the user who sent the message
                      bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
                      // JSON: Custom bubble styles
                      bubbleStyles={
                        {
                          text: {
                            fontSize: 20
                          },
                          chatbubble: {
                            borderRadius: 70,
                            padding: 10
                          }
                        }
                      }
                    />
                    <div ref={this.messagesEndRef} />
                  </div>

                  {this.state.name && canMessage && <div className="Input">
                    <Row>
                        <Col span={20}>
                            <TextInputCustom value={this.state.message}
                                              placeholder="Escriba su mensaje..."
                                              style={{style: '80%'}}
                                              required
                                              onChange={(e) => this.handleChange(e.target.value, 'message')}
                                              label_id={'admin.title.message'}/>
                        </Col>

                        <Col span={4}>
                            <PrimaryButton message_id={"general.send"}
                                            style={{
                                                width: '80%',
                                                marginLeft: '10%',
                                                marginTop: '7px'
                                            }}
                                            onClick={() => this.handleSend()}/>
                        </Col>
                    </Row>
                  </div>}
                </Col>

              </Card>
            </Row>
          </Col>
        </Row>


      </LayoutWrapper>
    );
  }
}

