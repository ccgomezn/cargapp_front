import { all, takeEvery, fork } from 'redux-saga/effects';
import actions from './actions';

export function* toggleModal() {
  yield takeEvery(actions.TOGGLE_DOCUMENT_MODAL, function*() {});
}

export default function* rootSaga() {
  yield all([fork(toggleModal)]);
}
