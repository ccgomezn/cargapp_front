import actions from "../app/actions";
import {all, takeEvery, fork} from 'redux-saga/effects';

export function* changeAddLoad() {
    yield takeEvery(actions.LOAD_ADD_CHANGE, function* () {

    });
}

export function* changeRedLoad() {
    yield takeEvery(actions.LOAD_RED_CHANGE, function* () {

    });
}

export default function* rootSaga() {
    yield all([
        fork(changeAddLoad),
        fork(changeRedLoad),
    ]);
}
