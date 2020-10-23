import documentActions from "./actions";

const initState = {
  documentModalActive: false,
  id: '',
  isImg: false
};

export default function documentReducer(state = initState, action) {
  switch (action.type) {
    case documentActions.TOGGLE_DOCUMENT_MODAL:
      return {
        documentModalActive: !state.documentModalActive,
        id: action.payload.id,
        isImg: action.payload.isImg,
      };
    default:
      return state;
  }
};