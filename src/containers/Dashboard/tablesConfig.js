import React from 'react';
import clone from 'clone';
import IntlMessages from '../../components/utility/intlMessages';
import {
  DateCell,
  ImageCell,
  LinkCell,
  TextCell,
  MultipleCell,
  MultipleLinkedCell
} from '../../components/tables/helperCells';

const renderCell = (object, type, key1, key2, href) => {
  const value = object[key1];
  switch (type) {
    case 'ImageCell':
      return ImageCell(value);
    case 'DateCell':
      return DateCell(value);
    case 'LinkCell':
      return LinkCell(value);
    case 'MultipleCell':
      let value2 = object[key2];
      return MultipleCell(value, value2);
    case 'MultipleLinkedCell':
      const value2linked = object[key2];
      const link = object[href];
      return MultipleLinkedCell(value, value2linked, link);
    default:
      return TextCell(value);
    
  }
};

const columnsSimple = [
  {
    title: <IntlMessages id="antTable.title.name" />,
    key: 'nameId',
    width: 100,
    render: object => renderCell(object, 'MultipleCell', 'firstName', 'firstName')
  },
  {
    title: <IntlMessages id="antTable.title.date" />,
    key: 'loadType',
    width: 100,
    render: object => renderCell(object, 'TextCell', 'firstName')
  },
  {
    title: <IntlMessages id="antTable.title.origin" />,
    key: 'initialDate',
    width: 100,
    render: object => renderCell(object, 'TextCell', 'lastName')
  },
  {
    title: <IntlMessages id="antTable.title.destination" />,
    key: 'destiny',
    width: 100,
    render: object => renderCell(object, 'TextCell', 'city')
  },
  {
    title: <IntlMessages id="antTable.title.status"/>,
    key: 'state',
    width: 100,
    align: 'right',
    render: object => renderCell(object, 'MultipleLinkedCell', 'street', 'street', 'street')
  }
];
const smallColumns = [columnsSimple[0], columnsSimple[1], columnsSimple[2], columnsSimple[3], columnsSimple[4]];
const sortColumns = [
  { ...columnsSimple[0], sorter: true },
  { ...columnsSimple[1], sorter: true },
  { ...columnsSimple[2], sorter: true },
  { ...columnsSimple[3], sorter: true },
  { ...columnsSimple[4], sorter: true },
  { ...columnsSimple[5], sorter: false }

];
const editColumns = [
  { ...columnsSimple[1], width: 300 },
  { ...columnsSimple[2], width: 300 },
  columnsSimple[3],
  columnsSimple[4]
];
const groupColumns = [
  columnsSimple[0],
  {
    title: 'Name',
    children: [columnsSimple[1], columnsSimple[2]]
  },
  {
    title: 'Address',
    children: [columnsSimple[3], columnsSimple[4]]
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
    columns: clone(columnsSimple)
  }
];
export { columnsSimple, tableinfos };
