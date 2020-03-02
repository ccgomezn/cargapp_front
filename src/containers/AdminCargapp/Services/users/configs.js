import React from 'react';
import clone from 'clone';
import IntlMessages from '../../../../components/utility/intlMessages';
import {
  DateCell, DoubleButtonCell,
  ImageCell,
  TextColorCell,
  LinkCell, ButtonCell
} from '../../../../components/tables/helperCells';
import { acceptUserOfService, getMineUser, getUsersOfService, putUserOfService } from "../../../../helpers/api/users";
import axios from 'axios';
import { addPersonToRoom, createRoom } from "../../../../helpers/api/chat";
import { getService } from "../../../../helpers/api/services";

const putFunction = (id, service_id) => {
  return function () {
    putUserOfService(id, { service_user: { approved: false } }).then((response) => {
      window.location.reload();

    }).catch((error) => {
      console.error(error);
    });
  }
};

const acceptFunction = (id, user_id, service_id, type) => {
<<<<<<< Updated upstream
    return function () {
        acceptUserOfService(id, user_id, service_id).then((response_service) => {
            axios.all([getMineUser(), getService(service_id)]).then(responses => {
                createRoom({
                    service_id: service_id,
                    user_id: responses[0].data.user.id,
                    name: responses[1].data.name,
                    note: '',
                    active: true
                }).then(response_room => {
                    axios.all([addPersonToRoom({
                        user_id: user_id,
                        room_id: response_room.data.id,
                        service_id: service_id,
                        active: true
                    }), addPersonToRoom({
                        user_id: responses[0].data.user.id,
                        room_id: response_room.data.id,
                        service_id: service_id,
                        active: true
                    }),]).then(() => {
                        let calls = [];
                        getUsersOfService(service_id).then(response => {
                            response.data.forEach(row => {
                                if (row.service_user.id !== id) {
                                    calls.push(putUserOfService(row.service_user.id, {service_user: {approved: false}})
                                    )
                                }
                            });


                            axios.all(calls).then(() => {

                                window.location.href = window.location.protocol + '//' + window.location.host + '/' + type + '/services/';

                            })
                        });
                    })
                });
=======
  let assignedDriverStatus = 16;
  return function () {
    acceptUserOfService(id, user_id, service_id, assignedDriverStatus).then((response_service) => {
      axios.all([getMineUser(), getService(service_id)]).then(responses => {
        let serviceGeneratorId = responses[1].data.user_id;
        createRoom({
          service_id: service_id,
          user_id: responses[0].data.user.id,
          name: responses[1].data.name,
          note: '',
          active: true
        }).then(response_room => {
          axios.all([addPersonToRoom({
            user_id: user_id,
            room_id: response_room.data.id,
            service_id: service_id,
            active: true
          }), addPersonToRoom({
            user_id: serviceGeneratorId,
            room_id: response_room.data.id,
            service_id: service_id,
            active: true
          }), addPersonToRoom({
            user_id: responses[0].data.user.id,
            room_id: response_room.data.id,
            service_id: service_id,
            active: true
          }),]).then(() => {
            let calls = [];
            getUsersOfService(service_id).then(response => {
              response.data.forEach(row => {
                if (row.service_user.id !== id) {
                  calls.push(putUserOfService(row.service_user.id, { service_user: { approved: false } })
                  )
                }
              });


              axios.all(calls).then(() => {

                window.location.href = window.location.protocol + '//' + window.location.host + '/' + type + '/services/';

              })
>>>>>>> Stashed changes
            });
          })
        });
      });


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
    case 'linkCell':
      return LinkCell('asd', '/1234');
    case 'MultipleButtonCell':
      let text1 = 'Aceptar';
      let text2 = 'Rechazar';
      let type1 = 'primary';
      let type2 = 'danger';
      let id = object['id'];
      if (object['approved'] !== 'En proceso') {
        return TextColorCell('No se pueden realizar acciones', '');
      }
      return DoubleButtonCell(text1, text2, acceptFunction(id, object['user_id'], 
                              object['service_id'], typeUser), putFunction(id, object['service_id']), type1, type2);
    case 'ButtonCell':
      let seeProfile = function () {
        window.location.href = window.location.protocol + '//' + window.location.host + '/' + typeUser + '/users/show_detail/' + object.user_id + '/' + object.service_id;
      };
      return ButtonCell('Ver perfil', seeProfile, 'secondary');
    default:
      let color_val = '';

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
    title: <IntlMessages id="antTable.title.user" />,
    key: 'user',
    width: '12%',
    render: object => renderCell(object, 'linkCell', 'user')
  },
  {
    title: <IntlMessages id="antTable.title.document" />,
    key: 'document',
    width: '12%',
    render: object => renderCell(object, 'TextCell', 'document')
  },
  {
    title: <IntlMessages id="antTable.title.score" />,
    key: 'score',
    width: '12%',
    render: object => renderCell(object, 'TextCell', 'score')
  }, {
    title: <IntlMessages id="antTable.title.accepted" />,
    key: 'approved',
    width: '12%',
    render: object => renderCell(object, 'TextCell', 'approved', true, 'generator')
  }, {
    title: <IntlMessages id="antTable.title.options" />,
    key: 'options',
    width: '12%',
    render: object => renderCell(object, 'MultipleButtonCell', 'approved', null, 'generator')
  }, {
    title: <IntlMessages id="antTable.title.options" />,
    key: 'options',
    width: '12%',
    render: object => renderCell(object, 'MultipleButtonCell', 'approved', null, 'admin')
  }, {
    title: <IntlMessages id="antTable.title.seeProfile" />,
    key: 'options',
    width: '12%',
    render: object => renderCell(object, 'ButtonCell', 'approved', null, 'generator')
  }
];
const sortColumns = [
  { ...columns[0], sorter: true },
  { ...columns[1], sorter: true },
  { ...columns[3], sorter: true },
  { ...columns[4], sorter: true },
  { ...columns[5], sorter: false },
  { ...columns[7], sorter: false },

];

const sortColumnsAdmin = [
  { ...columns[0], sorter: true },
  { ...columns[1], sorter: true },
  { ...columns[2], sorter: true },
  { ...columns[3], sorter: true },
  { ...columns[4], sorter: true },
  { ...columns[6], sorter: false },
]

const editColumns = [
  { ...columns[1], width: 300 },
  { ...columns[2], width: 300 },
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
export { columns, tableinfos };
