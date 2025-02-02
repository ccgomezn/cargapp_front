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
import {deletePermission} from "../../../helpers/api/internals";

const deleteFunction = (id) => {
  return function(){
    (deletePermission(id)
    .then((response) => {
        window.location.href = window.location.protocol + '//' + window.location.host + '/admin/permissions/';

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
      var text2 = 'Ver';
      var text3 = 'Eliminar';
      var type1 = 'default';
      var type2 = 'default';
      var type3 = 'danger';
      var function1 = function(){
        window.location.href = window.location.protocol + '//' + window.location.host + '/admin/permissions/edit/' + object['id'];
      }
      var function2 = function () {
        window.location.href = window.location.protocol + '//' + window.location.host + '/admin/permissions/show/' + object['id'];
      }

      return TripleButtonCell(text1, text2, text3, function1, function2, deleteFunction(object['id']), type1, type2, type3)
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
    width: '25%',
    render: object => renderCell(object, 'TextCell', 'id')
  },
  {
    title: <IntlMessages id="antTable.title.role" />,
    key: 'role',
    width: '20%',
    render: object => renderCell(object, 'TextCell', 'role')
  },
  {
    title: <IntlMessages id="antTable.title.action" />,
    key: 'action',
    width: '20%',
    render: object => renderCell(object, 'TextCell', 'action')
  },
  {
    title: <IntlMessages id="antTable.title.model" />,
    key: 'model',
    width: '20%',
    render: object => renderCell(object, 'TextCell', 'model')
  },
  {
    title: <IntlMessages id="antTable.title.state" />,
    key: 'active',
    width: '20%',
    render: object => renderCell(object, 'TextCell', 'active', true)
  },
  {
    title: <IntlMessages id="antTable.title.options" />,
    key: 'option',
    width: '20%',
    render: object => renderCell(object, 'MultipleButtonCell', '')
  },
];
const sortColumns = [
  { ...columns[0], sorter: true },
  { ...columns[1], sorter: true },
  { ...columns[2], sorter: true },
  { ...columns[3], sorter: true },
  { ...columns[5], sorter: false }

];

const tableinfos = [
  {
    title: 'Simple Table',
    value: 'simple',
    columns: clone(sortColumns)
  },
  {
    title: 'Sortable Table',
    value: 'sortView',
    columns: clone(sortColumns)
  }
];
export { columns, tableinfos };
