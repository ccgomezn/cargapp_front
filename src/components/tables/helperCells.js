import React from 'react';
import ImageCellView from './imageCell';
import DeleteCell from './deleteCell';
import EditableCell from './editableCell';
import FilterDropdown from './filterDropdown';
import { Button, Popconfirm } from 'antd';
import Icon from "antd/es/icon";
import Dropdown from "antd/es/dropdown";
import { PDFDownloadLink } from '@react-pdf/renderer';

const DateCell = data => <p>{data.toLocaleString()}</p>;
const ImageCell = src => <ImageCellView src={src} />;
const LinkCell = (link, href) => <a href={href ? href : '#'}>{link}</a>;
const OnClickCell = (link, onClick) => <a href={'#'} onClick={onClick}>{link}</a>;
const TextCell = text => <p>{text}</p>;
const DoubleTextCell = (text1, text2) => <p>{text1} - {text2}</p>;
const MultipleCell = (text1, text2) => <div><h1>{text1}</h1><h2>{text2}</h2></div>;
const MultipleLinkedCell = (text1, text2, href) => <div style={{ textAlign: 'right' }}><a href={href}>{text1}</a>
  <h2>{text2}</h2></div>;

const DownloadPdfCell = (document, documentName) => {
  return (
    <PDFDownloadLink document={document} fileName={`${documentName}.pdf`}>
      {({ loading }) => (loading ? 'Cargando documento...' : 'Descargar documento')}
    </PDFDownloadLink>
  );
}

const DownloadFileCell = (link, href, fileName) => {
  return(
    <a download={fileName} href={href ? href : '#'} target="_blank">{link}</a>
  );
}

const MultipleButtonCell = (text1, text2, function1, function2, type1, type2) => {
  return (
    <div style={{ textAlign: 'right' }}>
      <Button type={type1} onClick={function1}>
        {text1}
      </Button>
      <Popconfirm
        title="Esta seguro?"
        onConfirm={function2}
        okText="Si"
        cancelText="No"
      >
        <Button type={type2}>
          {text2}
        </Button>
      </Popconfirm>

    </div>

  )
};


const ButtonCell = (text1, function1, type1) => {
  return (
    <div>
      <Button type={type1} onClick={function1}>
        {text1}
      </Button>
    </div>

  )
};

const TripleButtonCell = (text1, text2, text3, function1, function2, function3, type1, type2, type3) => {
  return (
    <div style={{ textAlign: 'left' }}>
      <Button type={type1} onClick={function1}>
        {text1}
      </Button>
      <Button type={type2} onClick={function2}>
        {text2}
      </Button>
      <Popconfirm
        title="Esta seguro?"
        onConfirm={function3}
        okText="Si"
        cancelText="No"
      >
        <Button type={type3}>
          {text3}
        </Button>
      </Popconfirm>

    </div>

  )
};


const DoubleButtonCell = (text1, text2, function1, function2, type1, type2) => {
  return (
    <div style={{ textAlign: 'left' }}>
      <Button type={type1} onClick={function1}>
        {text1}
      </Button>
      <Button type={type2} onClick={function2}>
        {text2}
      </Button>
    </div>

  )
};

const TextColorCell = (text, color) => <p style={{ color: color }}>{text}</p>;
const DropdownCell = (text, menu, href) => <Dropdown overlay={menu} trigger={['click']}>
  <a className="ant-dropdown-link " href={href ? href : '#'}>
    {text} <Icon type="down" />
  </a>
</Dropdown>;


export {
  DateCell,
  ImageCell,
  LinkCell,
  TextCell,
  DoubleTextCell,
  EditableCell,
  DeleteCell,
  FilterDropdown,
  MultipleCell,
  MultipleLinkedCell,
  MultipleButtonCell,
  TextColorCell,
  TripleButtonCell,
  DropdownCell,
  ButtonCell,
  DoubleButtonCell,
  DownloadPdfCell,
  DownloadFileCell,
  OnClickCell
};
