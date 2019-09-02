import React from 'react';
import clone from 'clone';
import IntlMessages from '../../../components/utility/intlMessages';
import {
  DateCell,
  ImageCell,
  LinkCell,
  TextColorCell
} from '../../../components/tables/helperCells';



const renderCell = (object, type, key, color = false) => {
  const value = object[key];
  switch (type) {
    case 'ImageCell':
      return ImageCell(value);
    case 'DateCell':
      return DateCell(value);
    case 'LinkCell':
      return LinkCell(value);
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
    title: <IntlMessages id="antTable.title.email" />,
    key: 'email',
    width: '12%',
    render: object => renderCell(object, 'TextCell', 'email')
  },
  {
    title: <IntlMessages id="antTable.title.role" />,
    key: 'role',
    width: '12%',
    render: object => renderCell(object, 'TextCell', 'role')
  }
];
const smallColumns = [columns[1], columns[2], columns[3], columns[4]];
const sortColumns = [
  { ...columns[0], sorter: true },
  { ...columns[1], sorter: true },
  { ...columns[2], sorter: true },

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
