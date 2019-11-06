import React from 'react';
import clone from 'clone';
import IntlMessages from '../../../components/utility/intlMessages';
import {
    DateCell,
    ImageCell,
    LinkCell,
    TextColorCell,
    MultipleButtonCell
} from '../../../components/tables/helperCells';
import {deleteLoadType} from "../../../helpers/api/services";

const deleteFunction = (id) => {
    return function () {
        (deleteLoadType(id)
            .then((response) => {
                    window.location.href = window.location.protocol + '//' + window.location.host + '/admin/load_types/';

            }).catch((error) => {
                console.error(error);
            }));
    }
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
            var text2 = 'Eliminar';
            var type1 = 'default';
            var type2 = 'danger';
            var function1 = function () {
                window.location.href = window.location.protocol + '//' + window.location.host + '/admin/load_types/edit/' + object['id'];
            }

            return MultipleButtonCell(text1, text2, function1, deleteFunction(object['id']), type1, type2)
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
        width: '25%',
        render: object => renderCell(object, 'TextCell', 'id')
    },
    {
        title: "",
        key: 'icon',
        width: '25%',
        render: object => renderCell(object, 'ImageCell', 'icon')
    },
    {
        title: <IntlMessages id="antTable.title.name"/>,
        key: 'name',
        width: '20%',
        render: object => renderCell(object, 'TextCell', 'name')
    },
    {
        title: <IntlMessages id="antTable.title.code"/>,
        key: 'code',
        width: '20%',
        render: object => renderCell(object, 'TextCell', 'code')
    },
    {
        title: <IntlMessages id="antTable.title.description"/>,
        key: 'description',
        width: '20%',
        render: object => renderCell(object, 'TextCell', 'description')
    },
    {
        title: <IntlMessages id="antTable.title.state"/>,
        key: 'active',
        width: '20%',
        render: object => renderCell(object, 'TextCell', 'active', true)
    },
    {
        title: <IntlMessages id="antTable.title.options"/>,
        key: 'option',
        width: '20%',
        render: object => renderCell(object, 'MultipleButtonCell', '')
    },
];
const smallColumns = [columns[1], columns[2], columns[3], columns[4]];
const sortColumns = [
    {...columns[0], sorter: true},
    {...columns[1], sorter: false},
    {...columns[2], sorter: true},
    {...columns[3], sorter: true},
    {...columns[4], sorter: true},
    {...columns[5], sorter: true},
    {...columns[6], sorter: false}

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
export {columns, tableinfos};
