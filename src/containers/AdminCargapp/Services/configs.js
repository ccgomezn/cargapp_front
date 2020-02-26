import React from 'react';
import clone from 'clone';
import IntlMessages from '../../../components/utility/intlMessages';
import {
  ButtonCell,
  DateCell, DoubleButtonCell,
  ImageCell,
  LinkCell,
  TextColorCell,
} from '../../../components/tables/helperCells';
import { putService } from "../../../helpers/api/services";

const deleteFunction = (id, type) => {
  return function () {
    (putService(id, { active: false })
      .then((response) => {
        window.location.href = window.location.protocol + '//' + window.location.host + '/' + type + '/services/';
      }).catch((error) => {
        console.error(error);
      }));
  }
}

const changeStatus = (id, type, statusId) => {
  (putService(id, { statu_id: statusId })
    .then((response) => {
      window.location.href = window.location.protocol + '//' + window.location.host + '/' + type + '/services/';
    }).catch((error) => {
      console.error(error);
    }));
}

const acceptService = (id, type) => {
  let acceptStatus = 10;
  return function () {
    changeStatus(id, type, acceptStatus);
  }
}

const denyService = (id, type) => {
  let denyStatus = 51;
  return function () {
    changeStatus(id, type, denyStatus);
  }
}

const renderCell = (object, type, key, color = false, link, link_name, type_role, sub_link, boolean_change) => {
  const value = object[key];
  let text1 = 'Editar';
  let text2 = 'Aprobar';
  let text3 = 'Eliminar';
  let text4 = 'Rechazar';
  let type1 = 'default';
  let type3 = 'danger';

  let function1 = function () {
    let role = type_role === 'super_admin' ? 'admin' : type_role;
    window.location.href = window.location.protocol + '//' + window.location.host + '/' + role + '/services/edit/' + object['id'];
  };

  switch (type) {
    case 'ImageCell':
      return ImageCell(value);
    case 'DateCell':
      return DateCell(value);
    case 'GeneratorLinkCell':
      return LinkCell(link_name, window.location.protocol + '//' + window.location.host + link + value);
    case 'AdminLinkCell':
      if (boolean_change && object['statu_id'] === 10) {
        return LinkCell('Ver postulados', window.location.protocol + '//' + window.location.host + sub_link + object['id']);
      }
      return LinkCell(link_name, window.location.protocol + '//' + window.location.host + link + value);
    case 'SingleButtonCell':
      if (object['statu_id'] === 10 && object['active'] === 'Activo') {
        return ButtonCell(text1, function1, type1);
      } else {
        return null;
      }
    case 'DoubleButtonCell':
      if (object['statu_id'] === 10 && object['active'] === 'Activo') {
        return DoubleButtonCell(text1, text3, function1, deleteFunction(object['id'], type_role), type1, type3);
      } else {
        return null;
      }
    case 'DoubleAndSingleButtonCell':
      if ((type_role === 'admin' || type_role === 'super_admin') && object['statu_id'] === 49) {
        return DoubleButtonCell(text2, text4, acceptService(object['id'], 'admin'),
                                  denyService(object['id'], 'admin'), type1, type3);
      } else if (type_role === 'super_admin') {
        return DoubleButtonCell(text1, text3, function1, deleteFunction(object['id'], 'admin'), type1, type3);
      } else if (object['statu_id'] === 10 && object['active'] === 'Activo') {
        return DoubleButtonCell(text1, text3, function1, deleteFunction(object['id'], type_role), type1, type3);
      } else {
        return ButtonCell(text1, function1, type1);
      }
    case 'ActionSubscribe':
      let signUpFunction = function () {
        window.location.href = window.location.protocol + '//' + window.location.host + '/' + type_role + '/services/subscribe/' + object['id'];
      };
      return ButtonCell('Postular camioneros', signUpFunction, 'primary');

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
    width: '6%',
    render: object => renderCell(object, 'TextCell', 'id')
  },
  { // 1
    title: <IntlMessages id="antTable.title.name" />,
    key: 'name',
    width: '12%',
    render: object => renderCell(object, 'TextCell', 'name')
  },
  { // 2
    title: <IntlMessages id="antTable.title.origin_destination" />,
    key: 'origin_destination',
    width: '12%',
    render: object => renderCell(object, 'TextCell', 'origin_destination', 'red')
  },
  { // 3
    title: <IntlMessages id="antTable.title.destination" />,
    key: 'destination',
    width: '9%',
    render: object => renderCell(object, 'TextCell', 'destination')
  },
  { // 4
    title: <IntlMessages id="antTable.title.contains" />,
    key: 'description',
    width: '16%',
    render: object => renderCell(object, 'TextCell', 'description')
  },
  { // 5
    title: <IntlMessages id="antTable.title.state" />,
    key: 'active',
    width: '12%',
    render: object => renderCell(object, 'TextCell', 'active', true)
  },
  { // 6
    title: <IntlMessages id="antTable.title.seeDocuments" />,
    key: 'documents',
    width: '12%',
    render: object => renderCell(object, 'AdminLinkCell', 'id', false, '/admin/service_documents/detailed/', 'Ver documentos')
  },
  { // 7
    title: <IntlMessages id="antTable.title.details" />,
    key: 'details',
    width: '12%',
    render: object => renderCell(object, 'AdminLinkCell', 'id', false, '/admin/services/detail/', 'Ver detalles', null, '/admin/service_users/', true)
  },
  { // 8
    title: <IntlMessages id="antTable.title.options" />,
    key: 'option',
    width: '10%',
    render: object => renderCell(object, 'DoubleAndSingleButtonCell', '', null, null, null, 'admin')
  },
  { // 9
    title: <IntlMessages id="antTable.title.options" />,
    key: 'option',
    width: '5%',
    render: object => renderCell(object, 'DoubleButtonCell', null, null, null, null, 'generator')
  },
  { // 10
    title: <IntlMessages id="antTable.title.details" />,
    key: 'details',
    width: '12%',
    render: object => renderCell(object, 'GeneratorLinkCell', 'id', false, '/generator/services/detail/', 'Ver detalles', null, '/generator/service_users/', true)
  },
  { // 11
    title: <IntlMessages id="antTable.title.seeDocuments" />,
    key: 'documents',
    width: '12%',
    render: object => renderCell(object, 'GeneratorLinkCell', 'id', false, '/generator/service_documents/detailed/', 'Ver documentos')
  },
  { // 12
    title: <IntlMessages id="antTable.title.status" />,
    key: 'status',
    width: '12%',
    render: object => renderCell(object, 'TextCell', 'status')
  },
  { // 13
    title: <IntlMessages id="antTable.title.signUp" />,
    key: 'status',
    width: '12%',
    render: object => renderCell(object, 'ActionSubscribe', null, null, null, null, 'vehicle_manager')
  },
  { // 14
    title: <IntlMessages id="antTable.title.details" />,
    key: 'details',
    width: '12%',
    render: object => renderCell(object, 'GeneratorLinkCell', 'id', false, '/vehicle_manager/services/detail/', 'Ver detalles', null, '/vehicle_manager/service_users/', false)
  },
  { // 15
    title: <IntlMessages id="antTable.title.options" />,
    key: 'option',
    width: '5%',
    render: object => renderCell(object, 'DoubleAndSingleButtonCell', '', null, null, null, 'super_admin')
  },
  { // 16
    title: <IntlMessages id="antTable.title.options" />,
    key: 'option',
    width: '5%',
    render: object => renderCell(object, 'SingleButtonCell', '', null, null, null, 'admin')
  },
  { // 17
    title: <IntlMessages id="antTable.title.options" />,
    key: 'option',
    width: '5%',
    render: object => renderCell(object, 'SingleButtonCell', '', null, null, null, 'generator')
  },
  { // 18
    title: <IntlMessages id="antTable.title.date" />,
    key: 'expiration_date',
    width: '8%',
    render: object => renderCell(object, 'TextCell', 'expiration_date')
  },
];
const smallColumns = [
  { ...columns[18], sorter: true },
  { ...columns[2], sorter: true },
  { ...columns[4], sorter: true },
  { ...columns[12], sorter: true, role: 'admin' },
  { ...columns[14], sorter: false }];

const sortColumnsSuperAdmin = [
  { ...columns[0], sorter: true },
  { ...columns[18], sorter: true },
  { ...columns[2], sorter: true },
  { ...columns[4], sorter: true },
  { ...columns[12], sorter: true, role: 'admin' },
  { ...columns[7], sorter: false },
  { ...columns[6], sorter: false },
  { ...columns[15], sorter: false },
];

const sortColumnsAdminMultiple = [
  { ...columns[0], sorter: true },
  { ...columns[18], sorter: true },
  { ...columns[1], sorter: true },
  { ...columns[2], sorter: true },
  { ...columns[4], sorter: true },
  { ...columns[12], sorter: true, role: 'admin' },
  { ...columns[7], sorter: false },
  { ...columns[6], sorter: false },
  { ...columns[8], sorter: false },
];

const sortColumnsAdminDouble = [
  { ...columns[0], sorter: true },
  { ...columns[18], sorter: true },
  { ...columns[2], sorter: true },
  { ...columns[4], sorter: true },
  { ...columns[12], sorter: true, role: 'admin' },
  { ...columns[6], sorter: false },
  { ...columns[7], sorter: false },
  { ...columns[8], sorter: false },
];

const sortColumnsGeneratorMultiple = [
  { ...columns[18], sorter: true },
  { ...columns[2], sorter: true },
  { ...columns[4], sorter: true },
  { ...columns[12], sorter: true, role: 'generator' },
  { ...columns[10], sorter: false },
  { ...columns[11], sorter: false },
  { ...columns[9], sorter: false },
];

const sortColumnsGeneratorSingle = [
  { ...columns[18], sorter: true },
  { ...columns[2], sorter: true },
  { ...columns[4], sorter: true },
  { ...columns[12], sorter: true, role: 'generator' },
  { ...columns[10], sorter: false },
  { ...columns[11], sorter: false },
  { ...columns[17], sorter: false },
];

const sortColumnsVehicleManager = [
  { ...columns[18], sorter: true },
  { ...columns[0], sorter: true },
  { ...columns[2], sorter: true },
  { ...columns[3], sorter: true },
  { ...columns[4], sorter: true },
  { ...columns[12], sorter: true, role: 'vehicleManager' },
  { ...columns[13], sorter: false },

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
    columns: clone(sortColumnsAdminMultiple)
  },
  {
    title: 'Sortable Table',
    value: 'sortView',
    columns: clone(sortColumnsGeneratorMultiple)
  },
  {
    title: 'Sortable View',
    value: 'sortView',
    columns: clone(sortColumnsVehicleManager)
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
  },
  {
    title: 'Sortable Table',
    value: 'sortView',
    columns: clone(sortColumnsSuperAdmin)
  },
  {
    title: 'Sortable Table',
    value: 'sortView',
    columns: clone(sortColumnsAdminDouble)
  },
  {
    title: 'Sortable Table',
    value: 'sortView',
    columns: clone(sortColumnsGeneratorSingle)
  },
];
export { columns, tableinfos };
