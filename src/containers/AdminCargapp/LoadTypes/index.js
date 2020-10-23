import React, {Component} from 'react';
import LayoutWrapper from '../../../components/utility/layoutWrapper.js';
import {tableinfos} from './configs';
import SortView from '../../../components/custom/table/sortView';
import PageHeader from '../../../components/utility/pageHeader';
import IntlMessages from '../../../components/utility/intlMessages';
import {Row, Col, Tabs} from 'antd';
import basicStyle from '../../../settings/basicStyle';
import {getLoadTypes} from "../../../helpers/api/services";
import SecondaryButton from "../../../components/custom/button/secondary";
const {TabPane} = Tabs;

export default class LoadType extends Component {


    constructor(props) {
        super();


    }

    componentWillMount() {
        getLoadTypes()
            .then((response) => {
                if (response !== undefined) {
                    response.data.map((item) => {
                        if (item.active) {
                            item.active = 'Activo';
                            item.color = '#00BFBF';
                        } else {
                            item.active = 'Desactivado';
                            item.color = '#ff2557';
                        }
                        return item;
                    });
                    let active = [], inactive = [];
                    response.data.forEach(item => {
                        if(item.active === 'Activo') active.push(item);
                        else inactive.push(item)
                    });
                    this.setState({
                        load_types: response.data, inactive
                    });
                }

            }).catch((error) => {
            console.error(error);
        });
    }


    redirectAdd() {
        this.props.history.push('/admin/load_types/add')

    }

    render() {
        const {rowStyle, colStyle} = basicStyle;

        return (
            <LayoutWrapper>


                <Row style={rowStyle} gutter={18} justify="start" block>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Row>
                            <Col lg={18} md={24} sm={24} xs={24} style={colStyle}>
                                <PageHeader>

                                    <h1>
                                        <IntlMessages id="loadType.title"/>

                                    </h1>
                                </PageHeader>
                            </Col>
                            <Col lg={6} md={24} sm={24} xs={24} style={colStyle}>
                                <SecondaryButton
                                    message_id={"general.add"}
                                    style={{width: '100%'}}
                                    onClick={() => this.redirectAdd()}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                <Tabs defaultActiveKey="1">
                                    <TabPane tab="Activo" key="1">
                                        {this.state && this.state.load_types &&
                                        <SortView tableInfo={tableinfos[1]} dataList={this.state.load_types}/>
                                        }
                                    </TabPane>
                                    <TabPane tab="Inactivo" key="2">
                                        {this.state && this.state.inactive &&
                                        <SortView tableInfo={tableinfos[1]} dataList={this.state.inactive}/>
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
export {tableinfos};
