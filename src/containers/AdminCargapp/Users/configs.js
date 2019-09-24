import React from 'react';
import clone from 'clone';
import IntlMessages from '../../../components/utility/intlMessages';
import {
    DateCell,
    ImageCell,
    TextColorCell,
    DropdownCell,
    ButtonCell
} from '../../../components/tables/helperCells';
import {Link} from "react-router-dom";
import Menu from "antd/es/menu";


const renderCell = (object, type, key, color = false, linkText, menu) => {
    const value = object[key];
    switch (type) {
        case 'ImageCell':
            return ImageCell(value);
        case 'DateCell':
            return DateCell(value);
        case 'dropdown':
            return DropdownCell(linkText, menu);
        case 'button':
            let function1 = function () {
                window.location.href = window.location.protocol + '//' + window.location.host + '/admin/users/verify/' + object['id'];
            };
            return ButtonCell('Verificar usuario por Truora', function1, 'primary');
        default:
            let color_val = '';

            if (color) {
                color_val = object['color'];
            }
            return TextColorCell(value, color_val);
    }
};

const menuOptions = (id) => <Menu>
    <Menu.Item key="0">
        <Link to={"/admin/users/documents/" + id}>Documentos</Link>
    </Menu.Item>
    <Menu.Item key="1">
        <Link to={"/admin/users/favorite_routes/" + id}>Rutas favoritas</Link>
    </Menu.Item>
    <Menu.Item key="1">
        <Link to={"/admin/users/payments/" + id}>Pagos</Link>
    </Menu.Item>
    <Menu.Item key="2">
        <Link to={"/admin/users/reports/" + id}>Reportes</Link>
    </Menu.Item>
</Menu>;

const columns = [
        {
            title: "Id",
            key: 'id',
            width: '12%',
            render: object => renderCell(object, 'TextCell', 'id')
        },
        {
            title: <IntlMessages id="antTable.title.email"/>,
            key: 'email',
            width: '12%',
            render: object => renderCell(object, 'TextCell', 'email')
        },
    {
        title: <IntlMessages id="antTable.title.role"/>,
        key: 'role',
        width: '12%',
        render: object => renderCell(object, 'TextCell', 'role')
    },{
        title: <IntlMessages id="antTable.title.identification"/>,
        key: 'identification',
        width: '12%',
        render: object => renderCell(object, 'TextCell', 'identification')
    },{
        title: <IntlMessages id="antTable.title.phone"/>,
        key: 'phone_number',
        width: '12%',
        render: object => renderCell(object, 'TextCell', 'phone_number')
    },
        {
            title: <IntlMessages id="antTable.title.information"/>,
            key: 'information',
            width: '12%',
            render: object => renderCell(object, 'dropdown', 'información general', 'color', 'información adicional', menuOptions(object['id']))
        },
        {
            title: <IntlMessages style={{alignItems:'right'}} id="antTable.title.configuration"/>,
            key: 'verify',
            width: '12%',
            render: object => renderCell(object, 'button')
        }
    ]
;
const smallColumns = [columns[1], columns[2], columns[3], columns[4]];
const sortColumns = [
    {...columns[0], sorter: true},
    {...columns[1], sorter: true},
    {...columns[2], sorter: true},
    {...columns[3], sorter: true},
    {...columns[4], sorter: true},
    {...columns[5], sorter: false},
    {...columns[6], sorter: false},
];
const sortColumnsDriver = [
    {...columns[0], sorter: true},
    {...columns[1], sorter: true},
    {...columns[2], sorter: true},
    {...columns[3], sorter: true},
    {...columns[4], sorter: true},
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
        columns: clone(sortColumnsDriver)
    }
];
export {columns, tableinfos};
