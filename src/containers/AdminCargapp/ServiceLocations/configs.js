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
import {deleteServiceLocation} from "../../../helpers/api/services";

const deleteFunction = (id) => {
    return function () {
        (deleteServiceLocation(id)
            .then((response) => {
                    window.location.href = window.location.protocol + '//' + window.location.host + '/admin/service_locations/';

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
                window.location.href = window.location.protocol + '//' + window.location.host + '/admin/service_locations/edit/' + object['id'];
            };

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
        width: '12%',
        render: object => renderCell(object, 'TextCell', 'id')
    },
    {
        title: <IntlMessages id="antTable.title.city"/>,
        key: 'city',
        width: '12%',
        render: object => renderCell(object, 'TextCell', 'city')
    },
    {
        title: <IntlMessages id="antTable.title.longitude"/>,
        key: 'longitude',
        width: '12%',
        render: object => renderCell(object, 'TextCell', 'longitude')
    },
    {
        title: <IntlMessages id="antTable.title.latitude"/>,
        key: 'latitude',
        width: '12%',
        render: object => renderCell(object, 'TextCell', 'latitude')
    }, {
        title: <IntlMessages id="antTable.title.service"/>,
        key: 'service',
        width: '12%',
        render: object => renderCell(object, 'TextCell', 'service')
    },
    {
        title: <IntlMessages id="antTable.title.state"/>,
        key: 'active',
        width: '12%',
        render: object => renderCell(object, 'TextCell', 'active', true)
    },
    {
        title: <IntlMessages id="antTable.title.options"/>,
        key: 'option',
        width: '10%',
        render: object => renderCell(object, 'MultipleButtonCell', '')
    }
];
const smallColumns = [columns[1], columns[2], columns[3], columns[4]];
const sortColumns = [
    {...columns[0], sorter: true},
    {...columns[1], sorter: true},
    {...columns[2], sorter: true},
    {...columns[3], sorter: true},
    {...columns[4], sorter: true},
    {...columns[6], sorter: false},
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
