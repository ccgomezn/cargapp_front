import React from 'react';
import clone from 'clone';
import IntlMessages from '../../../../components/utility/intlMessages';
import {
    ButtonCell,
    DateCell,
    ImageCell,
    LinkCell,
    TextColorCell,
} from '../../../../components/tables/helperCells';
import {postUserOfService} from "../../../../helpers/api/adminCalls";
import { message } from 'antd';


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
        case 'ActionSubscribe':
            let signUpFunction = function(){
                postUserOfService({service_user: {
                        user_id: object['id'],
                        active: true,
                        service_id: object['service_id']
                    }}).then((response) => {
                    message.success('Camionero agendado');
                    window.location.reload();
                })
            };
            return ButtonCell('Postularse', signUpFunction, 'Default');
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
        title: <IntlMessages id="antTable.title.firstName"/>,
        key: 'first_name',
        width: '12%',
        render: object => renderCell(object, 'TextCell', 'first_name')
    },
    {
        title: <IntlMessages id="antTable.title.lastName"/>,
        key: 'last_name',
        width: '12%',
        render: object => renderCell(object, 'TextCell', 'last_name')
    },
    {
        title: <IntlMessages id="antTable.title.email"/>,
        key: 'email',
        width: '12%',
        render: object => renderCell(object, 'TextCell', 'email')
    },{
        title: <IntlMessages id="antTable.title.book"/>,
        key: 'book',
        width: '12%',
        render: object => renderCell(object, 'ActionSubscribe', null, null, null, null,'vehicle_manager')
    },
];
const sortColumns = [
    {...columns[0], sorter: true},
    {...columns[1], sorter: true},
    {...columns[2], sorter: true},
    {...columns[3], sorter: true},
    {...columns[4], sorter: false},
];


const tableinfos = [
    {
        title: 'Simple Table',
        value: 'simple',
        columns: clone(sortColumns)
    }
];
export {columns, tableinfos};
