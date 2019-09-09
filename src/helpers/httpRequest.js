import axios from "axios";
import {makeAuthorizationHeader, getToken} from './utility'
import {store} from '../redux/store';
import {decrypt} from './utility'
import {message} from "antd";

function authError() {
    return {
        type: 'AUTH_ERROR'
    }
}

function getError(response) {
    let error = 'Error en ';
    const keys = Object.keys(response);
    let first = true;
    keys.forEach((key) => {
        if (!first) {
            error += ', ';
        } else {
            first = false;
        }
        error += key;
    });
    if(first) return '';
    return error;
}

function showError(response) {
    let error_data = getError(response);
    message.error("No se puede realizar la acción. " + error_data + ".");
}

export function get(url, secured = false) {
    let headers = {};
    if (secured) {
        headers = makeAuthorizationHeader(decrypt(getToken().get('idToken')))
    }


    return axios.get(url, {headers: headers}).catch((error) => {
        if (error.response &&
            (error.response.status === 401 ||
                (error.response.status === 422 && error.response.data.response === "Does not have permissions"))) {
            store.dispatch(authError());
        } else {
            showError(error.response.data);
        }
        throw error;
    })
}

export function post(url, data, secured = false) {
    let headers = {};

    if (secured) {
        headers = makeAuthorizationHeader(decrypt(getToken().get('idToken')))
    }
    return axios.post(url, data, {headers: headers}).catch((error) => {
        if (error.response && error.status === 401 ||
            (error.response.status === 422 && error.response.data.response === "Does not have permissions")) {
            store.dispatch(authError());
        } else {
            showError(error.response.data);
        }
        throw error;
    })
}

export function put(url, data, secured = false) {
    let headers = {};

    if (secured) {
        headers = makeAuthorizationHeader(decrypt(getToken().get('idToken')))
    }
    return axios.put(url, data, {headers: headers}).catch((error) => {
        if (error.response && error.status === 401 ||
            (error.response.status === 422 && error.response.data.response === "Does not have permissions")) {
            store.dispatch(authError());
        } else {
            showError(error.response.data);
        }
        throw error;
    })
}

export function del(url, secured = false) {
    let headers = {};

    if (secured) {
        headers = makeAuthorizationHeader(decrypt(getToken().get('idToken')))
    }
    return axios.delete(url, {headers: headers, }).catch((error) => {
        if (error.response && error.status === 401 ||
            (error.response.status === 422 && error.response.data.response === "Does not have permissions")) {
            store.dispatch(authError());
        } else {
            showError(error.response.data);
        }
        throw error;
    })
}



