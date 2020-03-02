import {Modal} from 'antd';
import React, {Component} from "react";
import InnerImageZoom from 'react-inner-image-zoom';

class NormalModal extends Component {
    render() {
        const {visible, onOk, onCancel, cancelText, body, style, closable=false, title} = this.props;
        return (
            <Modal
                visible={visible}
                onOk={onOk}
                onCancel={onCancel}
                cancelText={cancelText}
                closable={closable}
                footer={false}
                header={false}
                style={style}
                title={title}
                >
                {body}
            </Modal>
        )
    }
}

class ImageModal extends Component {
    render() {
        const {visible, onOk, onCancel, cancelText, body, style, image, closable=false} = this.props;
        return (
            <Modal
                visible={visible}
                onOk={onOk}
                onCancel={onCancel}
                cancelText={cancelText}
                closable={closable}
                footer={false}
                header={false}
                style={style}
                >
                <InnerImageZoom 
                        src={image} 
                        zoomSrc={image}/>
            </Modal>
        )
    }
}

export {
    NormalModal,
    ImageModal
}