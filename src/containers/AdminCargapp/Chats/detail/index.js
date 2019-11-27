import React, {Component} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import {Row, Col} from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import PrimaryButton from "../../../../components/custom/button/primary"
import TextInputCustom from "../../../../components/custom/input/text";
import {ChatFeed, Message} from 'react-chat-ui'
import firebase from '../../../../components/firestore/Firestore'
import {getRoom} from "../../../../helpers/api/chat";
import {getMineProfile, getMineUser} from "../../../../helpers/api/users";
import axios from "axios"


export default class ChatDetail extends Component {


    constructor(props) {
        super();
        this.state = {
            is_typing: false,
            messages: []
        };
    }

    componentDidMount() {
        const {id} = this.props.match.params;

        axios.all([getRoom(id), getMineProfile()]).then(responses => {
            this.setState({
                name: responses[0].data.name,
                user_id: responses[1].data[0].user.id,
                user_name: responses[1].data[0].profile.firt_name + ' ' + responses[1].data[0].profile.last_name,
            })


        });


        firebase.firestore().collection(id).onSnapshot({
            error: (e) => console.error(e),
            next: (querySnapshot) => {
                console.log(querySnapshot);
                let messages = [];
                querySnapshot.docs.forEach(message => {

                    let id = message.get('user_id').toString() === this.state.user_id.toString()? 0 : message.get('user_id');

                    messages.push(new Message({
                        id: id,
                        senderName: message.get('user_name'),
                        message: message.get('text'),
                        date: message.get('date'),
                    }))
                });

                this.setState({messages})
            },
        });
    }

    handleChange(value, type) {

        this.setState(
            {
                [type]: value
            }
        )
    }

    handleSend() {
        const {id} = this.props.match.params;

        firebase.firestore().collection(id).add({
            date: new Date(),
            text: this.state.message,
            user_id: this.state.user_id,
            user_name: this.state.user_name,
        })
    }


    render() {
        const {rowStyle, colStyle} = basicStyle;
        const {redirect} = this.state;


        return (

            <LayoutWrapper>


                <Row style={rowStyle} gutter={18} justify="start" block>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                <PageHeader>

                                    <h1>
                                        {this.state.name}

                                    </h1>
                                </PageHeader>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <div style={{height: '500px', overflow: 'scroll',}}>
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
                                </div>
                                <div className="Input">
                                    <Row>
                                        <Col span={20}>
                                            <TextInputCustom value={this.state.message}
                                                             placeholder="Escriba su mensaje..."
                                                             style={{style: '80%'}}
                                                             onChange={(e) => this.handleChange(e.target.value, 'message')}
                                                             label_id={'admin.title.message'}/>
                                        </Col>

                                        <Col span={4}>
                                            <PrimaryButton message_id={"general.send"}
                                                           style={{width: '80%', marginLeft: '10%', marginTop: '7px'}}
                                                           onClick={() => this.handleSend()}/>
                                        </Col>
                                    </Row>

                                </div>

                            </Col>


                        </Row>

                    </Col>
                </Row>


            </LayoutWrapper>
        );
    }
}

