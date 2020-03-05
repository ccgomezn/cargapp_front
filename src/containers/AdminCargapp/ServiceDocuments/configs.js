import React from 'react';
import clone from 'clone';
import IntlMessages from '../../../components/utility/intlMessages';
import {
  DateCell,
  ImageCell,
  OnClickCell,
  TextColorCell,
  DoubleButtonCell,
  DownloadPdfCell,
  DownloadFileCell,
  ButtonCell,
} from '../../../components/tables/helperCells';
import {deleteServiceDocument, putServiceDocument} from "../../../helpers/api/services";
import PdfDocumentCustom from "../../../components/documents/pdf";
import {store} from "../../../redux/store";

const deleteFunction = (id, type) => {
  return function () {
    (deleteServiceDocument(id)
      .then((response) => {
          window.location.href = window.location.protocol + '//' + window.location.host + '/'+type+'/service_documents/';
      }).catch((error) => {
        console.error(error);
      }));
  }
};

const inactiveDocument = (id, type, serviceId) => {
  return function () {
    (putServiceDocument(id, {active:false})
      .then((response) => {
        window.location.href = window.location.protocol + '//' + window.location.host 
                                  + '/' + type + '/service_documents/detailed/' + serviceId;
      }).catch((error) => {
        console.error(error);
      }));
  }
};

const imgToPdf = (img1, title) => {
  return(
    <PdfDocumentCustom
        image1={img1}
        title={title} />
  );
}

const toggleModal = (documentId, isImg) => {
  return {
      type: 'TOGGLE_DOCUMENT_MODAL',
      payload: { isImg: isImg, id: documentId }
  }
}

const modalFunction = (documentId, isImg) => {
  return function () {
    store.dispatch(toggleModal(documentId, isImg));
  }
}

const renderCell = (object, type, key, color = false, role_type, link) => {
  let value = object[key];  
  let userRole = object['user_role'];
  var text1 = 'Editar';
  var text2 = 'Eliminar';
  var type1 = 'default';
  var type2 = 'danger';
  let fileType = '';
  switch (type) {
    case 'ImageCell':
      return ImageCell(value);
    case 'DateCell':
      return DateCell(value);
    case 'DownloadCell':
      let documentName = object['document_type']['name'];
      let document = object['document'];
      fileType = object['document'].split('.').pop();

      if (fileType !== 'pdf') {
        document = imgToPdf(object['document'], documentName);
        return DownloadPdfCell(document, documentName);
      } 
      return DownloadFileCell('Descargar documento', document, documentName);
    case 'OnClickCell':
      fileType = object['document'].split('.').pop();
      if (fileType !== 'pdf') {
        return OnClickCell(link, modalFunction(object['id'], true));
      } else {
        return OnClickCell(link, modalFunction(object['id'], false));
      }
    case 'ButtonCell':
      let documentTypeId = object['document_type']['id'];
      if ((documentTypeId >= 18 && documentTypeId <= 22) && (userRole === 'Generador de carga')) {
        return ButtonCell(text2, inactiveDocument(object['id'], role_type, object['service_id']), type2)
      }
      return '';
    case 'DoubleButtonCell':
      var function1 = function () {
        window.location.href = window.location.protocol + '//' + window.location.host + '/'+role_type+'/service_documents/edit/' + object['id'];
      }

      return DoubleButtonCell(text1, text2, function1, deleteFunction(object['id'], role_type), type1, type2)
    default:
      var color_val = '';

      if (color) {
        color_val = object['color'];
      }
      return TextColorCell(value, color_val);
  }
};

const columns = [
  { // 0
    title: "Id",
    key: 'id',
    width: '12%',
    render: object => renderCell(object, 'TextCell', 'id')
  },
  { // 1
    title: <IntlMessages id="antTable.title.name" />,
    key: 'name',
    width: '12%',
    render: object => renderCell(object, 'TextCell', 'name')
  },
  { // 2
    title: <IntlMessages id="antTable.title.documentType" />,
    key: 'document_type.name',
    width: '12%',
    render: object => renderCell(object, 'TextCell', 'document_type.name')
  },
  { // 3
    title: <IntlMessages id="antTable.title.service" />,
    key: 'service',
    width: '12%',
    render: object => renderCell(object, 'TextCell', 'service')
  },
  { // 4
    title: <IntlMessages id="antTable.title.user" />,
    key: 'user_role',
    width: '12%',
    render: object => renderCell(object, 'TextCell', 'user_role')
  },
  { // 5
    title: <IntlMessages id="antTable.title.state" />,
    key: 'active',
    width: '12%',
    render: object => renderCell(object, 'TextCell', 'active', true)
  },
  { // 6
    title: <IntlMessages id="antTable.title.options" />,
    key: 'option',
    width: '10%',
    render: object => renderCell(object, 'DoubleButtonCell', '',null, 'admin')
  },
  { // 7
    title: <IntlMessages id="antTable.title.options" />,
    key: 'option',
    width: '8%',
    render: object => renderCell(object, 'OnClickCell', null, null, 'generator', 'Ver documento')
  },
  { // 8
    title: <IntlMessages id="antTable.title.last_update" />,
    key: 'last_update',
    width: '10%',
    render: object => renderCell(object, 'TextCell', 'last_update')
  },
  { // 9
    title: <IntlMessages id="antTable.title.options" />,
    key: 'option',
    width: '8%',
    render: object => renderCell(object, 'OnClickCell', null, null, 'admin', 'Ver documento')
  },
  { // 10
    title: <IntlMessages id="antTable.title.options" />,
    key: 'option',
    width: '8%',
    render: object => renderCell(object, 'DownloadCell', null, null)
  },
  { // 11
    title: <IntlMessages id="antTable.title.options" />,
    key: 'option',
    width: '10%',
    render: object => renderCell(object, 'ButtonCell', '',null, 'generator')
  },
];

const smallColumns = [columns[1], columns[2], columns[3], columns[4]];
const sortColumns = [
  { ...columns[8], sorter: true },
  { ...columns[4], sorter: true },
  { ...columns[2], sorter: true },
  { ...columns[9], sorter: false },
  { ...columns[10], sorter: false },
  { ...columns[6], sorter: false },
];
const sortColumnsGenerator = [
  { ...columns[8], sorter: true, width: '16%' },
  { ...columns[4], sorter: true, width: '16%' },
  { ...columns[2], sorter: true, width: '16%' },
  { ...columns[7], sorter: false },
  { ...columns[10], sorter: false },
  { ...columns[11], sorter: false },
];
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
export { columns, tableinfos };
