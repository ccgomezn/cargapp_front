import React from 'react';
import clone from 'clone';
import IntlMessages from '../../components/utility/intlMessages';
import {
  DateCell,
  ImageCell,
  LinkCell,
  TextCell
} from '../../components/tables/helperCells';

const renderCell = (object, type, key) => {
  const value = object[key];
  switch (type) {
    case 'ImageCell':
      return ImageCell(value);
    case 'DateCell':
      return DateCell(value);
    case 'LinkCell':
      return LinkCell(value);
    default:
      return TextCell(value);
  }
};

const columns = [
  {
    title: <IntlMessages id="antTable.title.nameId" />,
    key: 'nameId',
    width: 100,
    render: object => renderCell(object, 'TextCell', 'firstName')
  },
  {
    title: <IntlMessages id="antTable.title.counterOffer" />,
    key: 'loadType',
    width: 100,
    render: object => renderCell(object, 'TextCell', 'firstName')
  },
  {
    title: <IntlMessages id="antTable.title.value" />,
    key: 'initialDate',
    width: 100,
    render: object => renderCell(object, 'TextCell', 'lastName')
  },
  {
    title: <IntlMessages id="antTable.title.calification" />,
    key: 'destiny',
    width: 100,
    render: object => renderCell(object, 'TextCell', 'city')
  },
  {
    title: <IntlMessages id="antTable.title.truckstate" />,
    key: 'state',
    width: 100,
    render: object => renderCell(object, 'TextCell', 'street')
  },
  {
    key: 'options',
    width: 100,
    render: object => renderCell(object, 'TextCell', 'street')
  }
];
const smallColumns = [columns[1], columns[2], columns[3], columns[4]];
const sortColumns = [
  { ...columns[0], sorter: true },
  { ...columns[1], sorter: true },
  { ...columns[2], sorter: true },
  { ...columns[3], sorter: true },
  { ...columns[4], sorter: true },
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
