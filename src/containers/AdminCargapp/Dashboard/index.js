import React, {Component} from 'react';
import LayoutWrapper from '../../../components/utility/layoutWrapper.js';
import {Row, Col, Tabs} from 'antd';
import basicStyle from '../../../settings/basicStyle';
import { View } from '@react-pdf/renderer';
const {TabPane} = Tabs;

export default class Dashboard extends Component {


    constructor(props) {
        super();
        this.state = {
            reload: false
        }
    }

    render() {
        const {rowStyle, colStyle} = basicStyle;
        const {reload} = this.state;

        return (
              <View>
                <img src={require('../../../image/dash_quemado.png')} style={{width: '100%', height: '91vh'}}></img>
              </View>
        );
    }
}
