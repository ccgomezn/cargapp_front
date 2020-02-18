const actions = {
  TOGGLE_DOCUMENT_MODAL: 'TOGGLE_DOCUMENT_MODAL',

  toggleDocumentModal: (data) => ({
    type: actions.TOGGLE_DOCUMENT_MODAL,
    payload: { data },
  }),
};

export default actions;