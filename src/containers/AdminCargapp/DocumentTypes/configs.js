import React from 'react';
import clone from 'clone';
import IntlMessages from '../../../components/utility/intlMessages';
import {
  DateCell,
  ImageCell,
  LinkCell,
  TextColorCell,
  MultipleButtonCell
} from '../../../components/tables/helperCells';
import {deleteDocumentType} from "../../../helpers/api/internals";

const deleteFunction = (id) => {
  return function(){
    (deleteDocumentType(id)
    .then((response) => {
        window.location.href = window.location.protocol + '//' + window.location.host + '/admin/document_types/';


    }).catch((error) => {
      console.error(error);
    }));
  }
}

const renderCell = (object, type, key, color = false) => {
  const value = object[key];
  switch (type) {
    case 'ImageCell':
      return ImageCell(value);
    case 'DateCell':
      return DateCell(value);
    case 'LinkCell':
      return LinkCell(value);
    case 'MultipleButtonCell':
      var text1 = 'Editar';
      var text2 = 'Eliminar';
      var type1 = 'default';
      var type2 = 'danger';
      var function1 = function(){
        window.location.href = window.location.protocol + '//' + window.location.host + '/admin/document_types/edit/' + object['id'];
      }

      return MultipleButtonCell(text1, text2, function1, deleteFunction(object['id']), type1, type2)
    default:
      var color_val = '';

      if (color) {
        color_val = object['color'];
      }
      return TextColorCell(value, color_val);
  }
};

const columns = [
  { // 0
    title: "Id",
    key: 'id',
    width: '10%',
    render: object => renderCell(object, 'TextCell', 'id')
  },
  { // 1
    title: <IntlMessages id="antTable.title.name" />,
    key: 'name',
    width: '20%',
    render: object => renderCell(object, 'TextCell', 'name')
  },
  { // 2
    title: <IntlMessages id="antTable.title.code" />,
    key: 'code',
    width: '20%',
    render: object => renderCell(object, 'TextCell', 'code')
  },
  { // 3
    title: <IntlMessages id="antTable.title.description" />,
    key: 'description',
    width: '20%',
    render: object => renderCell(object, 'TextCell', 'description')
  },
  { // 4
    title: <IntlMessages id="antTable.title.state" />,
    key: 'active',
    width: '20%',
    render: object => renderCell(object, 'TextCell', 'active', true)
  },
  { // 5
    title: <IntlMessages id="antTable.title.options" />,
    key: 'option',
    width: '20%',
    render: object => renderCell(object, 'MultipleButtonCell', '')
  },
  { // 6
    title: <IntlMessages id="antTable.title.category" />,
    key: 'category',
    width: '20%',
    render: object => renderCell(object, 'TextCell', 'category')
  },
];
const smallColumns = [columns[1],  columns[6], columns[2], columns[3], columns[4]];
const sortColumns = [
  { ...columns[0], sorter: true },
  { ...columns[6], sorter: true },
  { ...columns[1], sorter: true },
  { ...columns[2], sorter: true },
  { ...columns[3], sorter: true },
  { ...columns[5], sorter: false }

];
const editColumns = [
  { ...columns[1], width: 300 },
  { ...columns[2], width: 300 },
  columns[3],
  columns[4]
];
const groupColumns = [
  columns[0],
  {
    title: 'Name',
    children: [columns[1], columns[2]]
  },
  {
    title: 'Address',
    children: [columns[3], columns[4]]
  }
];
const tableinfos = [
  {
    title: 'Simple Table',
    value: 'simple',
    columns: clone(smallColumns)
  },
  {
    title: 'Sortable Table',
    value: 'sortView',
    columns: clone(sortColumns)
  },
  {
    title: 'Search Text',
    value: 'filterView',
    columns: clone(smallColumns)
  },
  {
    title: 'Editable View',
    value: 'editView',
    columns: clone(editColumns)
  },
  {
    title: 'Grouping View',
    value: 'groupView',
    columns: clone(groupColumns)
  },
  {
    title: 'Customized View',
    value: 'customizedView',
    columns: clone(columns)
  }
];
export { columns, tableinfos };
