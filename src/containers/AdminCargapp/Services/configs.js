import React from 'react';
import clone from 'clone';
import IntlMessages from '../../../components/utility/intlMessages';
import {
    ButtonCell,
    DateCell,
    ImageCell,
    LinkCell,
    TextColorCell,
    TripleButtonCell
} from '../../../components/tables/helperCells';
import {deleteService} from "../../../helpers/api/services";

const deleteFunction = (id, type) => {
    return function () {
        (deleteService(id)
            .then((response) => {
                window.location.href = window.location.protocol + '//' + window.location.host + '/' + type + '/services/';
            }).catch((error) => {
                console.error(error);
            }));
    }
}

const renderCell = (object, type, key, color = false, link, link_name, type_role, sub_link, boolean_change) => {
    const value = object[key];
    switch (type) {
        case 'ImageCell':
            return ImageCell(value);
        case 'DateCell':
            return DateCell(value);
        case 'LinkCell':
            if(boolean_change && object['statu_id'] === 10){
                return LinkCell('Ver postulados', window.location.protocol + '//' + window.location.host + sub_link + object['id']);
            }
            return LinkCell(link_name, window.location.protocol + '//' + window.location.host + link + value);
        case 'MultipleButtonCell':
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

            return TripleButtonCell(text1, text2, text3, function1, function2, deleteFunction(object['id'], type_role), type1, type2, type3);
        case 'ActionSubscribe':
            let signUpFunction = function(){
                window.location.href = window.location.protocol + '//' + window.location.host + '/' + type_role + '/services/subscribe/' + object['id'];
            };
            return ButtonCell('Postular camioneros', signUpFunction, 'Default');
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
        title: <IntlMessages id="antTable.title.name"/>,
        key: 'name',
        width: '12%',
        render: object => renderCell(object, 'TextCell', 'name')
    },
    {
        title: <IntlMessages id="antTable.title.origin"/>,
        key: 'origin',
        width: '12%',
        render: object => renderCell(object, 'TextCell', 'origin')
    },
    {
        title: <IntlMessages id="antTable.title.destination"/>,
        key: 'destination',
        width: '12%',
        render: object => renderCell(object, 'TextCell', 'destination')
    },
    {
        title: <IntlMessages id="antTable.title.description"/>,
        key: 'start_date',
        width: '12%',
        render: object => renderCell(object, 'TextCell', 'description')
    },
    {
        title: <IntlMessages id="antTable.title.state"/>,
        key: 'active',
        width: '12%',
        render: object => renderCell(object, 'TextCell', 'active', true)
    },
    {
        title: <IntlMessages id="antTable.title.seeDocuments"/>,
        key: 'documents',
        width: '12%',
        render: object => renderCell(object, 'LinkCell', 'id', false, '/admin/service_documents/detailed/', 'Ver documentos')
    },
    {
        title: <IntlMessages id="antTable.title.details"/>,
        key: 'details',
        width: '12%',
        render: object => renderCell(object, 'LinkCell', 'id', false, '/admin/services/detail/', 'Detalles', null, '/admin/service_users/', true)
    },
    {
        title: <IntlMessages id="antTable.title.options"/>,
        key: 'option',
        width: '10%',
        render: object => renderCell(object, 'MultipleButtonCell', '', null, null, null, 'admin')
    },
    {
        title: <IntlMessages id="antTable.title.options"/>,
        key: 'option',
        width: '10%',
        render: object => renderCell(object, 'MultipleButtonCell', null, null, null, null, 'generator')
    }, {
        title: <IntlMessages id="antTable.title.details"/>,
        key: 'details',
        width: '12%',
        render: object => renderCell(object, 'LinkCell', 'id', false, '/generator/services/detail/', 'Detalles', null, '/generator/service_users/', true)
    }, {
        title: <IntlMessages id="antTable.title.seeDocuments"/>,
        key: 'documents',
        width: '12%',
        render: object => renderCell(object, 'LinkCell', 'id', false, '/generator/service_documents/detailed/', 'Ver documentos')
    },
    {
        title: <IntlMessages id="antTable.title.status"/>,
        key: 'status',
        width: '12%',
        render: object => renderCell(object, 'TextCell', 'status')
    },{
        title: <IntlMessages id="antTable.title.signUp"/>,
        key: 'status',
        width: '12%',
        render: object => renderCell(object, 'ActionSubscribe', null, null, null, null,'vehicle_manager')
    },
];
const smallColumns = [columns[1], columns[2], columns[3], columns[4]];
const sortColumns = [
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

const sortColumnsGenerator = [
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

const sortColumnsVehicleManager = [
    {...columns[0], sorter: true},
    {...columns[1], sorter: true},
    {...columns[2], sorter: true},
    {...columns[3], sorter: true},
    {...columns[4], sorter: true},
    {...columns[12], sorter: true},
    {...columns[5], sorter: true},
    {...columns[13], sorter: true},

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
    }
];
export {columns, tableinfos};
