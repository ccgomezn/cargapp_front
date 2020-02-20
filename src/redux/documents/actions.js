const actions = {
  TOGGLE_DOCUMENT_MODAL: 'TOGGLE_DOCUMENT_MODAL',

  toggleDocumentModal: (documentId, isImg) => ({
    type: actions.TOGGLE_DOCUMENT_MODAL,
    payload: { documentId: documentId, isImg: isImg },
  }),
};

export default actions;