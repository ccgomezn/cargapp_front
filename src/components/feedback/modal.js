import {Modal} from 'antd';
import ModalHolder from './modal.style'
import React, {Component} from "react";
import svgDir from "../../helpers/images_helper";

export default class CustomModal extends Component {
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
                mask={false}
            >
                <style>{`
                    :root {
                      --image: url('`+svgDir+`/oval.svg');
                      --image_detail: url('`+svgDir+`/`+image+`');
                      }
                    `}
                </style>
                <ModalHolder image={'oval'} style={style}>
                    {body}
                </ModalHolder>
            </Modal>
        )
    }
}