import React from 'react';
import clone from 'clone';
import IntlMessages from '../../../../components/utility/intlMessages';
import {
    DateCell, DoubleButtonCell,
    ImageCell,
    LinkCell,
    TextColorCell,
    TripleButtonCell
} from '../../../../components/tables/helperCells';
import {deleteService, putUserOfService} from '../../../../helpers/api/adminCalls';

const putFunction = (id, data) => {
    return function () {

    }
};

const renderCell = (object, type, key) => {
    const value = object[key];
    switch (type) {
        case 'ImageCell':
            return ImageCell(value);
        case 'DateCell':
            return DateCell(value);
        case 'MultipleButtonCell':
            let text1 = 'Aceptar';
            let text2 = 'Rechazar';
            let type1 = 'default';
            let type2 = 'default';
            let id = object['id'];
            return DoubleButtonCell(text1, text2, putFunction(id, {approved: true}), putFunction(id, {approved: false}), type1, type2);
        default:
            return ImageCell(value);
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
    },{
        title: <IntlMessages id="antTable.title.accepted"/>,
        key: 'approved',
        width: '12%',
        render: object => renderCell(object, 'TextCell', 'approved')
    },{
        title: <IntlMessages id="antTable.title.options"/>,
        key: 'options',
        width: '12%',
        render: object => renderCell(object, 'TextCell', 'options')
    },
];
const sortColumns = [
    {...columns[0], sorter: true},
    {...columns[1], sorter: true},
    {...columns[2], sorter: true},
    {...columns[3], sorter: true},
    {...columns[4], sorter: true},
    {...columns[5], sorter: false},
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
        columns: clone(sortColumns)
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
