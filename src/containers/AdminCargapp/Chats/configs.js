import React from 'react';
import clone from 'clone';
import IntlMessages from '../../../components/utility/intlMessages';
import {
    DateCell,
    ImageCell,
    LinkCell,
    TextColorCell,
} from '../../../components/tables/helperCells';

const renderCell = (object, type, key, color = false) => {
    let value = object[key];
    switch (type) {
        case 'ImageCell':
            return ImageCell(value);
        case 'DateCell':
            return DateCell(value);
        case 'LinkCell':
            return LinkCell('Ir al chat', 'chats/'+object.id);
        default:
            var color_val = '';

            if (color) {
                color_val = object['color'];
            }
            if(key === 'service'){
                value = value.origin + ' - ' + value.destination;
            }
            console.log(value)
            return TextColorCell(value, color_val);
    }
};

const columns = [
    {
        title: "Id",
        key: 'id',
        width: '10%',
        render: object => renderCell(object, 'TextCell', 'id')
    },
    {
        title: <IntlMessages id="antTable.title.name" />,
        key: 'name',
        width: '12%',
        render: object => renderCell(object, 'TextCell', 'name')
    },
    {
        title: <IntlMessages id="antTable.title.service" />,
        key: 'code',
        width: '12%',
        render: object => renderCell(object, 'TextCell', 'service')
    },
    {
        title: <IntlMessages id="antTable.title.options" />,
        key: 'option',
        width: '10%',
        render: object => renderCell(object, 'LinkCell', '')
    },
];
const smallColumns = [columns[1], columns[2], columns[3], columns[4]];
const sortColumns = [
    { ...columns[0], sorter: true },
    { ...columns[1], sorter: true },
    { ...columns[2], sorter: false },
    { ...columns[3], sorter: false },

];
const editColumns = [
    { ...columns[1], width: 300 },
    { ...columns[2], width: 300 },
    { ...columns[3], width: 300 },
    { ...columns[3], width: 300 },
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
