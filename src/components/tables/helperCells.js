import React from 'react';
import ImageCellView from './imageCell';
import DeleteCell from './deleteCell';
import EditableCell from './editableCell';
import FilterDropdown from './filterDropdown';

const DateCell = data => <p>{data.toLocaleString()}</p>;
const ImageCell = src => <ImageCellView src={src} />;
const LinkCell = (link, href) => <a href={href ? href : '#'}>{link}</a>;
const TextCell = text => <p>{text}</p>;
const MultipleCell = (text1, text2) => <div><h1>{text1}</h1><h2>{text2}</h2></div>;
const MultipleLinkedCell = (text1, text2, href) => <div style={{ textAlign: 'right' }}><a href={href}>{text1}</a><h2>{text2}</h2></div>;

export {
  DateCell,
  ImageCell,
  LinkCell,
  TextCell,
  EditableCell,
  DeleteCell,
  FilterDropdown,
  MultipleCell,
  MultipleLinkedCell
};
