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
import {deleteService} from '../../../helpers/api/adminCalls';

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

const renderCell = (object, type, key, color = false, link, link_name, type_role) => {
    const value = object[key];
    switch (type) {
        case 'ImageCell':
            return ImageCell(value);
        case 'DateCell':
            return DateCell(value);
        case 'LinkCell':
            return LinkCell(link_name, window.location.protocol + '//' + window.location.host + link + value);
        case 'MultipleButtonCell':
            var text1 = 'Editar';
            var text2 = 'Ver';
            var text3 = 'Eliminar';
            var type1 = 'default';
            var type2 = 'default';
            var type3 = 'danger';
            var function1 = function () {
                window.location.href = window.location.protocol + '//' + window.location.host + '/'+type_role+'/services/edit/' + object['id'];
            }
            var function2 = function () {
                window.location.href = window.location.protocol + '//' + window.location.host + '/'+type_role+'/services/show/' + object['id'];
            }

            return TripleButtonCell(text1, text2, text3, function1, function2, deleteFunction(object['id'], type_role), type1, type2, type3)
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
        render: object => renderCell(object, 'LinkCell', 'id', false, '/admin/services/detail/', 'Detalles')
    },
    {
        title: <IntlMessages id="antTable.title.options"/>,
        key: 'option',
        width: '10%',
        render: object => renderCell(object, 'MultipleButtonCell', '', null, null, null, 'admin' )
    },
    {
        title: <IntlMessages id="antTable.title.options"/>,
        key: 'option',
        width: '10%',
        render: object => renderCell(object, 'MultipleButtonCell', null, null, null, null, 'generator' )
    },{
        title: <IntlMessages id="antTable.title.details"/>,
        key: 'details',
        width: '12%',
        render: object => renderCell(object, 'LinkCell', 'id', false, '/generator/services/detail/', 'Detalles')
    },{
        title: <IntlMessages id="antTable.title.seeDocuments"/>,
        key: 'documents',
        width: '12%',
        render: object => renderCell(object, 'LinkCell', 'id', false, '/generator/service_documents/detailed/', 'Ver documentos')
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
    {...columns[5], sorter: true},
    {...columns[10], sorter: false},
    {...columns[11], sorter: false},
    {...columns[9], sorter: false},
];
const editColumns = [
    {...columns[1], width: 300},
    {...columns[2], width: 300},
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
export {columns, tableinfos};
