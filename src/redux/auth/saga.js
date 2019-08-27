import {all, takeEvery, put, fork, call} from 'redux-saga/effects';
import {getToken, clearToken, makeAuthorizationHeader} from '../../helpers/utility';
import axios from 'axios';
import actions from './actions';
import {encrypt} from '../../helpers/utility'
import {message} from "antd";

function loginApi(url, data) {
    return axios.post(
        url,
        data
    ).catch((e) => {
        message.error('El usuario no es valido');
    });
}


function refresh(){
    console.log('refresh_token')
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
            let token_encrypted = encrypt(token);
            roles.map((role) => {
                roles_array.push(role.role_id)
                return role
            })
            let roles_encrypted = encrypt(token + roles_array.toString());

            yield put({
                type: actions.LOGIN_SUCCESS,
                token: token_encrypted,
                roles: roles_encrypted,
                profile: 'Profile'
            });
            yield message.success('Login correcto');

        } catch (e) {
            yield put({type: actions.LOGIN_ERROR});
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
    yield takeEvery(actions.LOGIN_ERROR, function* () {
    });

}

export function* logout() {
    yield takeEvery(actions.LOGOUT, function* () {
        yield console.log('');
        clearToken();
    });
}

export function* authError() {
    yield takeEvery(actions.AUTH_ERROR, function* () {
        yield console.log('');
        refresh();
        yield put({type: actions.LOGOUT});

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
        fork(logout),
        fork(authError)
    ]);
}
