import React from 'react';
import clone from 'clone';
import IntlMessages from '../../../../components/utility/intlMessages';
import {
    DateCell, DoubleButtonCell,
    ImageCell,
    TextColorCell,
} from '../../../../components/tables/helperCells';
import {acceptUserOfService, putUserOfService} from "../../../../helpers/api/users";

const putFunction = (id, data) => {
    return function () {
        putUserOfService(id, data).then((response) => {
            window.location.reload();
        }).catch((error) => {
            console.error(error);
        });
    }
};

const acceptFunction = (id, user_id, service_id, type) => {
    return function () {
        acceptUserOfService(id, user_id, service_id).then((response) => {
            window.location.href = window.location.protocol + '//' + window.location.host + '/'+type+'/services/';
        }).catch((error) => {
            console.error(error);
        });
    }
};

const renderCell = (object, type, key, color, typeUser) => {
    const value = object[key];
    switch (type) {
        case 'ImageCell':
            return ImageCell(value);
        case 'DateCell':
            return DateCell(value);
        case 'MultipleButtonCell':
            let text1 = 'Aceptar';
            let text2 = 'Rechazar';
            let type1 = 'primary';
            let type2 = 'danger';
            let id = object['id'];
            if (object['approved'] !== 'En proceso') {
                return TextColorCell('No se pueden realizar acciones', '');
            }
            return DoubleButtonCell(text1, text2, acceptFunction(id, object['user_id'], object['service_id'], typeUser), putFunction(id, {approved: false}), type1, type2);
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
        title: <IntlMessages id="antTable.title.user"/>,
        key: 'user',
        width: '12%',
        render: object => renderCell(object, 'TextCell', 'user')
    },
    {
        title: <IntlMessages id="antTable.title.document"/>,
        key: 'document',
        width: '12%',
        render: object => renderCell(object, 'TextCell', 'document')
    },
    {
        title: <IntlMessages id="antTable.title.score"/>,
        key: 'score',
        width: '12%',
        render: object => renderCell(object, 'TextCell', 'score')
    }, {
        title: <IntlMessages id="antTable.title.accepted"/>,
        key: 'approved',
        width: '12%',
        render: object => renderCell(object, 'TextCell', 'approved', true, 'generator')
    }, {
        title: <IntlMessages id="antTable.title.options"/>,
        key: 'options',
        width: '12%',
        render: object => renderCell(object, 'MultipleButtonCell', 'approved',null ,'generator')
    },{
        title: <IntlMessages id="antTable.title.options"/>,
        key: 'options',
        width: '12%',
        render: object => renderCell(object, 'MultipleButtonCell', 'approved', null,'admin')
    }
];
const sortColumns = [
    {...columns[0], sorter: true},
    {...columns[1], sorter: true},
    {...columns[2], sorter: true},
    {...columns[3], sorter: true},
    {...columns[4], sorter: true},
    {...columns[5], sorter: false},
];

const sortColumnsAdmin = [
    {...columns[0], sorter: true},
    {...columns[1], sorter: true},
    {...columns[2], sorter: true},
    {...columns[3], sorter: true},
    {...columns[4], sorter: true},
    {...columns[6], sorter: false},
]

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
        columns: clone(sortColumns)
    },
    {
        title: 'Sortable Table',
        value: 'sortView',
        columns: clone(sortColumnsAdmin)
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
