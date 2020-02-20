import documentActions from "./actions";

const initState = {
  documentModalActive: false,
  documentId: '',
  isImg: false
};

export default function documentReducer(state = initState, action) {
  switch (action.type) {
    case documentActions.TOGGLE_DOCUMENT_MODAL:
      return {
        documentModalActive: !state.documentModalActive,
        documentId: action.payload.documentId,
        isImg: action.payload.isImg,
      };
    default:
      return state;
  }
};