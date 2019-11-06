import React from 'react';
import clone from 'clone';
import IntlMessages from '../../../components/utility/intlMessages';
import {
  DateCell,
  ImageCell,
  LinkCell,
  TextColorCell,
  TripleButtonCell
} from '../../../components/tables/helperCells';
import {deleteServiceDocument} from "../../../helpers/api/services";

const deleteFunction = (id, type) => {
  return function () {
    (deleteServiceDocument(id)
      .then((response) => {
          window.location.href = window.location.protocol + '//' + window.location.host + '/'+type+'/service_documents/';
      }).catch((error) => {
        console.error(error);
      }));
  }
};

const renderCell = (object, type, key, color = false, role_type, link) => {
  const value = object[key];
  switch (type) {
    case 'ImageCell':
      return ImageCell(value);
    case 'DateCell':
      return DateCell(value);
    case 'LinkCell':
      let href =  window.location.protocol + '//' + window.location.host + '/'+role_type+'/service_documents/show/' + object['id'];

      return LinkCell(link,href);
    case 'MultipleButtonCell':
      var text1 = 'Editar';
      var text2 = 'Ver';
      var text3 = 'Eliminar';
      var type1 = 'default';
      var type2 = 'default';
      var type3 = 'danger';
      var function1 = function () {
        window.location.href = window.location.protocol + '//' + window.location.host + '/'+role_type+'/service_documents/edit/' + object['id'];
      }
      var function2 = function () {
        window.location.href = window.location.protocol + '//' + window.location.host + '/'+role_type+'/service_documents/show/' + object['id'];
      }

      return TripleButtonCell(text1, text2, text3, function1, function2, deleteFunction(object['id'], role_type), type1, type2, type3)
    default:
      var color_val = '';

      if (color) {
        color_val = object['color'];
      }
      return TextColorCell(value, color_val);
  }
};

const columns = [
  {
    title: "Id",
    key: 'id',
    width: '12%',
    render: object => renderCell(object, 'TextCell', 'id')
  },
  {
    title: <IntlMessages id="antTable.title.name" />,
    key: 'name',
    width: '12%',
    render: object => renderCell(object, 'TextCell', 'name')
  },
  {
    title: <IntlMessages id="antTable.title.documentType" />,
    key: 'document_type',
    width: '12%',
    render: object => renderCell(object, 'TextCell', 'document_type')
  },
  {
    title: <IntlMessages id="antTable.title.service" />,
    key: 'service',
    width: '12%',
    render: object => renderCell(object, 'TextCell', 'service')
  },
  {
    title: <IntlMessages id="antTable.title.user" />,
    key: 'user',
    width: '12%',
    render: object => renderCell(object, 'TextCell', 'user')
  },
  {
    title: <IntlMessages id="antTable.title.state" />,
    key: 'active',
    width: '12%',
    render: object => renderCell(object, 'TextCell', 'active', true)
  },
  {
    title: <IntlMessages id="antTable.title.options" />,
    key: 'option',
    width: '10%',
    render: object => renderCell(object, 'MultipleButtonCell', '',null, 'admin')
  },{
    title: <IntlMessages id="antTable.title.options" />,
    key: 'option',
    width: '10%',
    render: object => renderCell(object, 'LinkCell', null, null, 'generator', 'Ver detalle')
  },
];

const smallColumns = [columns[1], columns[2], columns[3], columns[4]];
const sortColumns = [
  { ...columns[0], sorter: true },
  { ...columns[1], sorter: true },
  { ...columns[2], sorter: true },
  { ...columns[3], sorter: true },
  { ...columns[4], sorter: true },
  { ...columns[5], sorter: true },
  { ...columns[6], sorter: false },
];
const sortColumnsGenerator = [
  { ...columns[0], sorter: true },
  { ...columns[1], sorter: true },
  { ...columns[2], sorter: true },
  { ...columns[3], sorter: true },
  { ...columns[4], sorter: true },
  { ...columns[5], sorter: true },
  { ...columns[7], sorter: false },
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
    title: 'Sortable Table',
    value: 'sortView',
    columns: clone(sortColumnsGenerator)
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
