const actions = {
  TOGGLE_DOCUMENT_MODAL: 'TOGGLE_DOCUMENT_MODAL',

  toggleDocumentModal: (id, isImg) => ({
    type: actions.TOGGLE_DOCUMENT_MODAL,
    payload: { id: id, isImg: isImg },
  }),
};

export default actions;