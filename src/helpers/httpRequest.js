import axios from "axios";
import {makeAuthorizationHeader, getToken} from './utility'
import {store} from '../redux/store';
import {decrypt} from './utility'
import {message} from "antd";

function auth_error() {
    return {
        type: 'AUTH_ERROR'
    }
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
            store.dispatch(auth_error());
        } else {
            message.error("No se puede realizar la acción");


        }
    })
}

export function post(url, data, secured = false) {
    let headers = {};

    if (secured) {
        headers = makeAuthorizationHeader(decrypt(getToken().get('idToken')))
    }
    return axios.post(url, data, {headers: headers}).catch((error) => {
        if (error.response && error.status === 401) {
            store.dispatch(auth_error());

        } else {
            message.error("No se puede realizar la acción");


        }
    })
}

export function put(url, data, secured = false) {
    let headers = {};

    if (secured) {
        headers = makeAuthorizationHeader(decrypt(getToken().get('idToken')))
    }
    return axios.put(url, data, {headers: headers}).catch((error) => {
        if (error.response && error.status === 401) {
            store.dispatch(auth_error());

        } else {
            message.error("No se puede realizar la acción");

        }
    })
}

export function del(url, secured = false) {
    let headers = {};

    if (secured) {
        headers = makeAuthorizationHeader(decrypt(getToken().get('idToken')))
    }
    return axios.delete(url, {headers: headers}).catch((error) => {
        if (error.response && error.status === 401) {
            store.dispatch(auth_error());

        } else {
            message.error("No se puede realizar la acción");

        }
    })
}



