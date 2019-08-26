import React from 'react';
import ImageCellView from './imageCell';
import DeleteCell from './deleteCell';
import EditableCell from './editableCell';
import FilterDropdown from './filterDropdown';
import { Button, Popconfirm } from 'antd';

const DateCell = data => <p>{data.toLocaleString()}</p>;
const ImageCell = src => <ImageCellView src={src} />;
const LinkCell = (link, href) => <a href={href ? href : '#'}>{link}</a>;
const TextCell = text => <p>{text}</p>;
const MultipleCell = (text1, text2) => <div><h1>{text1}</h1><h2>{text2}</h2></div>;
const MultipleLinkedCell = (text1, text2, href) => <div style={{ textAlign: 'right' }}><a href={href}>{text1}</a><h2>{text2}</h2></div>;
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

const TripleButtonCell = (text1, text2, text3, function1, function2, function3, type1, type2, type3) => {
    return (
        <div style={{ textAlign: 'right' }}>
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

const TextColorCell = (text, color) => <p style={{color: color}}>{text}</p>;

export {
  DateCell,
  ImageCell,
  LinkCell,
  TextCell,
  EditableCell,
  DeleteCell,
  FilterDropdown,
  MultipleCell,
  MultipleLinkedCell,
  MultipleButtonCell,
  TextColorCell,
  TripleButtonCell
};
