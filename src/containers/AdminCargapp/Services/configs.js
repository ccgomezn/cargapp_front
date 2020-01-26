import React from 'react';
import clone from 'clone';
import IntlMessages from '../../../components/utility/intlMessages';
import {
    ButtonCell,
    DateCell, DoubleButtonCell,
    ImageCell,
    LinkCell,
    TextColorCell,
    TripleButtonCell
} from '../../../components/tables/helperCells';
import { putService} from "../../../helpers/api/services";

const deleteFunction = (id, type) => {
    return function () {
        (putService(id, {active:false})
            .then((response) => {
                window.location.href = window.location.protocol + '//' + window.location.host + '/' + type + '/services/';
            }).catch((error) => {
                console.error(error);
            }));
    }
}

const renderCell = (object, type, key, color = false, link, link_name, type_role, sub_link, boolean_change) => {
  console.log(object);
    const value = object[key];
    let text1 = 'Editar';
    let text2 = 'Ver';
    let text3 = 'Eliminar';
    let type1 = 'default';
    let type2 = 'default';
    let type3 = 'danger';
    
    let function1 = function () {
      window.location.href = window.location.protocol + '//' + window.location.host + '/' + type_role + '/services/edit/' + object['id'];
    };
    let function2 = function () {
        window.location.href = window.location.protocol + '//' + window.location.host + '/' + type_role + '/services/show/' + object['id'];
    };

    switch (type) {
        case 'ImageCell':
            return ImageCell(value);
        case 'DateCell':
            return DateCell(value);
        case 'LinkCell':
            if (boolean_change && object['statu_id'] === 10) {
                return LinkCell('Ver postulados', window.location.protocol + '//' + window.location.host + sub_link + object['id']);
            }
            return LinkCell(link_name, window.location.protocol + '//' + window.location.host + link + value);
        case 'DoubleAndSingleButtonCell':
            if (object['statu_id'] === 10 && object['active'] === 'Activo' ){
              return DoubleButtonCell(text1, text2, function1, function2, type1, type2);
            } else {
              return ButtonCell(text2, function2, type2);
            }
        case 'MultipleAndSingleButtonCell':
            if (object['statu_id'] === 10 && object['active'] === 'Activo' ){
              return TripleButtonCell(text1, text2, text3, function1, function2, deleteFunction(object['id'], type_role), type1, type2, type3);
            } else {
              return ButtonCell(text2, function2, type2);
            }
        case 'MultipleAndDoubleButtonCell':
            if (type_role === 'super_admin') {
              return TripleButtonCell(text1, text2, text3, function1, function2, deleteFunction(object['id'], 'admin'), type1, type2, type3);
            } else if (object['statu_id'] === 10 && object['active'] === 'Activo' ){
                return TripleButtonCell(text1, text2, text3, function1, function2, deleteFunction(object['id'], type_role), type1, type2, type3);
            } else {
              return DoubleButtonCell(text1,text2,function1,function2,type1,type2);
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
        width: '12%',
        render: object => renderCell(object, 'TextCell', 'id')
    },
    { // 1
        title: <IntlMessages id="antTable.title.name"/>,
        key: 'name',
        width: '12%',
        render: object => renderCell(object, 'TextCell', 'name')
    },
    { // 2
        title: <IntlMessages id="antTable.title.origin"/>,
        key: 'origin',
        width: '12%',
        render: object => renderCell(object, 'TextCell', 'origin')
    },
    { // 3
        title: <IntlMessages id="antTable.title.destination"/>,
        key: 'destination',
        width: '12%',
        render: object => renderCell(object, 'TextCell', 'destination')
    },
    { // 4
        title: <IntlMessages id="antTable.title.description"/>,
        key: 'description',
        width: '12%',
        render: object => renderCell(object, 'TextCell', 'description')
    },
    { // 5
        title: <IntlMessages id="antTable.title.state"/>,
        key: 'active',
        width: '12%',
        render: object => renderCell(object, 'TextCell', 'active', true)
    },
    { // 6
        title: <IntlMessages id="antTable.title.seeDocuments"/>,
        key: 'documents',
        width: '12%',
        render: object => renderCell(object, 'LinkCell', 'id', false, '/admin/service_documents/detailed/', 'Ver documentos')
    },
    { // 7
        title: <IntlMessages id="antTable.title.details"/>,
        key: 'details',
        width: '12%',
        render: object => renderCell(object, 'LinkCell', 'id', false, '/admin/services/detail/', 'Detalles', null, '/admin/service_users/', true)
    },
    { // 8
        title: <IntlMessages id="antTable.title.options"/>,
        key: 'option',
        width: '10%',
        render: object => renderCell(object, 'MultipleAndDoubleButtonCell', '', null, null, null, 'admin')
    },
    { // 9
        title: <IntlMessages id="antTable.title.options"/>,
        key: 'option',
        width: '10%',
        render: object => renderCell(object, 'MultipleAndSingleButtonCell', null, null, null, null, 'generator')
    }, 
    { // 10
        title: <IntlMessages id="antTable.title.details"/>,
        key: 'details',
        width: '12%',
        render: object => renderCell(object, 'LinkCell', 'id', false, '/generator/services/detail/', 'Detalles', null, '/generator/service_users/', true)
    }, 
    { // 11
        title: <IntlMessages id="antTable.title.seeDocuments"/>,
        key: 'documents',
        width: '12%',
        render: object => renderCell(object, 'LinkCell', 'id', false, '/generator/service_documents/detailed/', 'Ver documentos')
    },
    { // 12
        title: <IntlMessages id="antTable.title.status"/>,
        key: 'status',
        width: '12%',
        render: object => renderCell(object, 'TextCell', 'status')
    }, 
    { // 13
        title: <IntlMessages id="antTable.title.signUp"/>,
        key: 'status',
        width: '12%',
        render: object => renderCell(object, 'ActionSubscribe', null, null, null, null, 'vehicle_manager')
    },
    { // 14
        title: <IntlMessages id="antTable.title.details"/>,
        key: 'details',
        width: '12%',
        render: object => renderCell(object, 'LinkCell', 'id', false, '/vehicle_manager/services/detail/', 'Detalles', null, '/vehicle_manager/service_users/', false)
    },
    { // 15
      title: <IntlMessages id="antTable.title.options"/>,
      key: 'option',
      width: '10%',
      render: object => renderCell(object, 'MultipleAndDoubleButtonCell', '', null, null, null, 'super_admin')
    },
    { // 16
      title: <IntlMessages id="antTable.title.options"/>,
      key: 'option',
      width: '10%',
      render: object => renderCell(object, 'DoubleAndSingleButtonCell', '', null, null, null, 'admin')
    },
    { // 17
      title: <IntlMessages id="antTable.title.options"/>,
      key: 'option',
      width: '10%',
      render: object => renderCell(object, 'DoubleAndSingleButtonCell', '', null, null, null, 'generator')
    },
];
const smallColumns = [
    {...columns[0], sorter: true},
    {...columns[1], sorter: true},
    {...columns[2], sorter: true},
    {...columns[3], sorter: true},
    {...columns[4], sorter: true},
    {...columns[5], sorter: true},
    {...columns[14], sorter: false}];

const sortColumnsSuperAdmin = [
  {...columns[0], sorter: true},
  {...columns[1], sorter: true},
  {...columns[2], sorter: true},
  {...columns[3], sorter: true},
  {...columns[4], sorter: true},
  {...columns[5], sorter: true},
  {...columns[6], sorter: false},
  {...columns[7], sorter: false},
  {...columns[15], sorter: false},
];

const sortColumnsAdminMultiple = [
    {...columns[0], sorter: true},
    {...columns[1], sorter: true},
    {...columns[2], sorter: true},
    {...columns[3], sorter: true},
    {...columns[4], sorter: true},
    {...columns[5], sorter: true},
    {...columns[6], sorter: false},
    {...columns[7], sorter: false},
    {...columns[8], sorter: false},
];

const sortColumnsAdminDouble = [
  {...columns[0], sorter: true},
  {...columns[1], sorter: true},
  {...columns[2], sorter: true},
  {...columns[3], sorter: true},
  {...columns[4], sorter: true},
  {...columns[5], sorter: true},
  {...columns[6], sorter: false},
  {...columns[7], sorter: false},
  {...columns[8], sorter: false},
];

const sortColumnsGeneratorMultiple = [
    {...columns[0], sorter: true},
    {...columns[1], sorter: true},
    {...columns[2], sorter: true},
    {...columns[3], sorter: true},
    {...columns[4], sorter: true},
    {...columns[12], sorter: true},
    {...columns[5], sorter: true},
    {...columns[10], sorter: false},
    {...columns[11], sorter: false},
    {...columns[9], sorter: false},
];

const sortColumnsGeneratorDouble = [
  {...columns[0], sorter: true},
  {...columns[1], sorter: true},
  {...columns[2], sorter: true},
  {...columns[3], sorter: true},
  {...columns[4], sorter: true},
  {...columns[12], sorter: true},
  {...columns[5], sorter: true},
  {...columns[10], sorter: false},
  {...columns[11], sorter: false},
  {...columns[17], sorter: false},
];

const sortColumnsVehicleManager = [
    {...columns[0], sorter: true},
    {...columns[1], sorter: true},
    {...columns[2], sorter: true},
    {...columns[3], sorter: true},
    {...columns[4], sorter: true},
    {...columns[13], sorter: false},

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
      columns: clone(sortColumnsGeneratorDouble)
    },
];
export {columns, tableinfos};
