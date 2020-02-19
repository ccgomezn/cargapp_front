import documentActions from "./actions";

const initState = {
  documentModalActive: false,
  documentId: '',
};

export default function documentReducer(state = initState, action) {
  switch (action.type) {
    case documentActions.TOGGLE_DOCUMENT_MODAL:
      return {
        documentModalActive: !state.documentModalActive,
        documentId: action.payload,
      };
    default:
      return state;
  }
};