import { all, takeEvery, put, fork, call } from 'redux-saga/effects';

import { getToken, clearToken, makeAuthorizationHeader } from '../../helpers/utility';
import axios from 'axios';
import actions from './actions';

function loginApi(url, data) {
  return axios.post(
    url,
    data
  );
}

function roleApi(url, token) {
  let header = makeAuthorizationHeader(token)
  return axios.get(
    url,
    {
      headers: header
    }
  );
}

export function* loginRequest() {
  yield takeEvery('LOGIN_REQUEST', function* (data) {
    try {
      let response_token = yield call(loginApi, data.url, data.data);
      let token = response_token.data.access_token;
      let response_role = yield call(roleApi, data.url_role, token);
      let roles = response_role.data.roles;
      let roles_array = [];
      roles.map((role) =>{
        roles_array.push(role.role_id)
        return role
      })
      yield put({
        type: actions.LOGIN_SUCCESS,
        token: token,
        roles: roles_array.toString(),
        profile: 'Profile'
      });
      this.props.history.push("/dashboard")

    } catch (e) {
      yield put({ type: actions.LOGIN_ERROR });
    }
  });
}

export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function* (payload) {
    yield localStorage.setItem('id_token', payload.token);
    yield localStorage.setItem('roles', payload.roles);
  });
}

export function* loginError() {
  yield takeEvery(actions.LOGIN_ERROR, function* () { });
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function* () {
    yield console.log('');
    clearToken();
  });
}
export function* checkAuthorization() {
  yield takeEvery(actions.CHECK_AUTHORIZATION, function* () {
    const token = getToken().get('idToken');
    const roles = getToken().get('roles');
    if (token) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        token,
        roles,
        profile: 'Profile'
      });
    }
  });
}
export default function* rootSaga() {
  yield all([
    fork(checkAuthorization),
    fork(loginRequest),
    fork(loginSuccess),
    fork(loginError),
    fork(logout)
  ]);
}
