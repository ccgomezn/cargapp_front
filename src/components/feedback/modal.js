import {Modal} from 'antd';
import ModalHolder from './modal.style'
import React, {Component} from "react";
import svgDir from "../../helpers/images_helper";

export default class CustomModal extends Component {
    render() {


        const {visible, onOk, oncancel, cancelText, body, style, image} = this.props;
        return (
            <Modal
                visible={visible}
                onOk={onOk}
                onCancel={oncancel}
                cancelText={cancelText}
                closable={false}
                footer={false}
                header={false}
                style={style}
            >
                <style>{`
                    :root {
                      --image: url('`+svgDir+`/oval.svg');
                      --image_detail: url('`+svgDir+`/`+image+`');
                      }
                    `}
                </style>
                <ModalHolder image={'oval'} style={{paddingTop: '20px'}}>

                    {body}
                </ModalHolder>
            </Modal>
        )
    }
}