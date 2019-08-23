import React, {Component} from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps"

import {compose, withProps} from "recompose"
import MapControl from "./map_control"
import {Button, Popover} from "antd"
import {Row, Col} from 'antd';
import Input from "../../components/uielements/input";
import IntlMessages from '../../components/utility/intlMessages';
import PopWrapper from './map.style'

require('dotenv').config();

const google = window.google = window.google ? window.google : {};

const MyMapComponent = compose(
    withProps(props => {
        return {
            googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=" + process.env.REACT_APP_GOOLE_MAPS_API_KEY,
            loadingElement: <div style={{height: `100%`}}/>,
            containerElement: <div style={{height: props.height}}/>,
            mapElement: <div style={{height: `100%`}}/>,
        }
    }),
    withScriptjs,
    withGoogleMap
)((props) => {
        return (
            <GoogleMap
                defaultZoom={6}
                center={{lat: props.center.lat, lng: props.center.lng}}
                defaultCenter={{lat: props.center.lat, lng: props.center.lng}}
                defaultOptions={{
                    // these following 7 options turn certain controls off see link below
                    streetViewControl: false,
                    scaleControl: false,
                    mapTypeControl: false,
                    panControl: false,
                    zoomControl: false,
                    rotateControl: false,
                    fullscreenControl: false
                }}
            >
                {props.markers && props.markers.map(marker => (
                    <Marker
                        {...marker}
                    />
                ))}


                <MapControl style={{position: 'relative'}} id="area" position={google.maps.ControlPosition.RIGHT_BOTTOM}>
                    {props.isFreight &&

                    <Popover
                        style={{position: 'relative', display: 'inline-block'}}
                        getPopupContainer={() => document.getElementById('area')}
                        content={
                            <PopWrapper>

                                <Row gutter={24}>
                                    <Col lg={12} md={12} sm={12} xs={12}>
                                        <div className="filter">

                                            <div className="content">
                                                <div className="isoInputWrapper">
                                                    <label>
                                                        <IntlMessages id="trackings.loadplace"/>
                                                    </label>
                                                    <Input size="large" placeholder="Lugar de cargue"/>
                                                </div>
                                                <div className="isoInputWrapper">
                                                    <label>
                                                        <IntlMessages id="trackings.loadweight"/>
                                                    </label>
                                                    <Input size="large" placeholder="Peso de la carga"/>
                                                </div>
                                                <div className="isoInputWrapper">
                                                    <label>
                                                        <IntlMessages id="trackings.freightoffer"/>
                                                    </label>
                                                    <Input size="large" placeholder="Oferta del flete"/>
                                                </div>

                                            </div>
                                        </div>

                                    </Col>
                                    <Col lg={12} md={12} sm={12} xs={12}>
                                        <div className="filter">

                                            <div className="content">
                                                <div className="isoInputWrapper">
                                                    <label>
                                                        <IntlMessages id="trackings.unloadplace"/>
                                                    </label>
                                                    <Input size="large" placeholder="Lugar de descargue"/>
                                                </div>
                                                <div className="isoInputWrapper">
                                                    <label>
                                                        <IntlMessages id="trackings.loadType"/>
                                                    </label>
                                                    <Input size="large" placeholder="Tipo de carga"/>
                                                </div>
                                                <div className="isoInputWrapper">
                                                    <label>
                                                        <IntlMessages id="trackings.initialDate"/>
                                                    </label>
                                                    <Input size="large" placeholder="Fecha de recogida"/>
                                                </div>

                                            </div>
                                        </div>

                                    </Col>
                                </Row>


                            </PopWrapper>

                        }
                        trigger="click"
                        placement="leftBottom"
                    >
                        <Button style={{
                            height: 60,
                            width: 60,
                            margin: 10,
                            backgroundColor: 'rgba(51,95,246)',
                            borderColor: 'rgba(51,95,246)'
                        }}
                                type="primary"
                                shape="circle"
                                icon="plus"/>
                    </Popover>

                    }

                </MapControl>

            </GoogleMap>
        )

    }
);

export class MapContainer extends Component {


    render() {
        return (
            <MyMapComponent
                isFreight={this.props.isFreight}
                height={this.props.style.height}
                markers={this.props.markers}
                center={this.props.center}
            />
        )
    }

}

export default MapContainer;