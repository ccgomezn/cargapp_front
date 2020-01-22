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
import {deleteCoupon} from "../../../helpers/api/internals";
import {getCompanies} from "../../../helpers/api/companies";

const deleteFunction = (id) => {
  return function () {
    (deleteCoupon(id)
      .then((response) => {
          window.location.href = window.location.protocol + '//' + window.location.host + '/admin/coupons/';

      }).catch((error) => {
        console.error(error);
      }));
  }
}

const companies_list = () => {
  let companies_list;
  getCompanies().then(function(companies) {
    companies_list = companies;
  });
  return companies_list;
};

const transformDataToMap = (data, key) => {
  var dataTransformed = {};
  data.map((item) => {
      dataTransformed[item.id] = item[key];
      return item;
  });

  return dataTransformed
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
      var function1 = function () {
        window.location.href = window.location.protocol + '//' + window.location.host + '/admin/coupons/edit/' + object['id'];
      }
      var function2 = function () {
        window.location.href = window.location.protocol + '//' + window.location.host + '/admin/coupons/show/' + object['id'];
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
    width: '12%',
    render: object => renderCell(object, 'TextCell', 'id')
  },
  {
    title: <IntlMessages id="antTable.title.name" />,
    key: 'name',
    width: '12%',
    render: object => renderCell(object, 'TextCell', 'name')
  }
  ,
  {
    title: <IntlMessages id="antTable.title.code" />,
    key: 'code',
    width: '12%',
    render: object => renderCell(object, 'TextCell', 'code')
  },
  {
    title: <IntlMessages id="antTable.title.description" />,
    key: 'description',
    width: '12%',
    render: object => renderCell(object, 'TextCell', 'description')
  },
  {
    title: <IntlMessages id="antTable.title.value" />,
    key: 'value',
    width: '12%',
    render: object => renderCell(object, 'TextCell', 'value')
  },
  {
    title: <IntlMessages id="antTable.title.company" />,
    key: 'company',
    width: '12%',
    render: object => renderCell(object, 'TextCell', 'company')
  },
  {
    title: <IntlMessages id="antTable.title.coupon_category" />,
    key: 'category',
    width: '12%',
    render: object => renderCell(object, 'TextCell', 'category')
  },
  {
    title: <IntlMessages id="antTable.title.options" />,
    key: 'option',
    width: '10%',
    render: object => renderCell(object, 'MultipleButtonCell', '')
  },
];
const smallColumns = [columns[1], columns[2], columns[3], columns[4], columns[5]];
const sortColumns = [
  { ...columns[0], sorter: true },
  { ...columns[1], sorter: true },
  { ...columns[2], sorter: true },
  { ...columns[3], sorter: true },
  { ...columns[4], sorter: true },
  { ...columns[5], sorter: true },
  { ...columns[6], sorter: true },
  { ...columns[7], sorter: false },


];
const editColumns = [
  { ...columns[1], width: 300 },
  { ...columns[2], width: 300 },
  columns[3],
  columns[4],
  columns[5],
  columns[6],
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
