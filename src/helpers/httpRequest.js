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

function updateAddLoad() {
    return {
        type: 'LOAD_ADD_CHANGE'
    }
}

function updateRedLoad() {
    return {
        type: 'LOAD_RED_CHANGE'
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
    if (first) return '';
    return error;
}

function showError(response) {
    let error_data = getError(response);
    message.error("No se puede realizar la acción. " + error_data + ".");
}

function catchError(error) {
    if (error.response &&
        (error.response.status === 401 ||
            (error.response.status === 422 && error.response.data.response === "Does not have permissions"))) {
        store.dispatch(authError());
    } else if (error.response.status !== 500 && error.response.status !== 404) {
        showError(error.response.data);
    } else {
        message.error('No se puede realizar la acción.')
    }
}

export function get(url, secured = false, loading = true) {
    let headers = {};
    if (secured) {
        headers = makeAuthorizationHeader(decrypt(getToken().get('idToken')))
    }
    if(loading)  store.dispatch(updateAddLoad());

    return axios.get(url, {headers: headers}).then((response) => {
        if(loading) store.dispatch(updateRedLoad());
        return response;
    }).catch((error) => {
        if(loading) store.dispatch(updateRedLoad());
        catchError(error);
        throw error;
    })
}

export function post(url, data, secured = false, loading = true) {
    let headers = {};

    if (secured) {
        headers = makeAuthorizationHeader(decrypt(getToken().get('idToken')))
    }

    if(loading) store.dispatch(updateAddLoad());
    return axios.post(url, data, {headers: headers}).then((response) => {
        if(loading) store.dispatch(updateRedLoad());
        return response;
    }).catch((error) => {
        if(loading) store.dispatch(updateRedLoad());
        if (error.response.status !== 302) {
            catchError(error);
            throw error;
        }
        return error.response;
    })
}

export function put(url, data, secured = false, loading = true) {
    let headers = {};

    if (secured) {
        headers = makeAuthorizationHeader(decrypt(getToken().get('idToken')))
    }
    if(loading) store.dispatch(updateAddLoad());
    return axios.put(url, data, {headers: headers}).then((response)=>{
        if(loading) store.dispatch(updateRedLoad());
        return response;
    }).catch((error) => {
        if(loading) store.dispatch(updateRedLoad());
        catchError(error);
        throw error;
    })
}

export function getWithHeader(url, header, loading = true){
    if(loading) store.dispatch(updateAddLoad());

    return axios.get(url, {headers: header}).then((response)=>{
        if(loading) store.dispatch(updateRedLoad());
        return response;
    }).catch((error) => {
        if(loading) store.dispatch(updateRedLoad());
        catchError(error);
        throw error;
    })
}

export function del(url, secured = false, loading = true) {
    let headers = {};

    if (secured) {
        headers = makeAuthorizationHeader(decrypt(getToken().get('idToken')))
    }
    if(loading) store.dispatch(updateAddLoad());
    return axios.delete(url, {headers: headers,}).then((response)=>{
        if(loading) store.dispatch(updateRedLoad());
        return response;
    }).catch((error) => {
        if(loading) store.dispatch(updateRedLoad());
        catchError(error);
        throw error;
    })
}



