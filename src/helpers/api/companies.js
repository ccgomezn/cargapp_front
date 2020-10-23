import {del, get, post, put} from "../httpRequest";
import {httpAddr} from "../http_helper";

export function getMineCompanies() {
    return get(httpAddr + '/company_users/me', true);
}

export function getCompanies() {
    return get(httpAddr + '/companies/', true)
}

export function getActiveCompanies() {
    return get(httpAddr + '/companies/active', true)
}

export function getCompany(id) {
    return get(httpAddr + '/companies/' + id, true)
}

export function putCompany(id, data) {
    return put(httpAddr + `/companies/` + id, data, true);
}

export function postCompany(data) {
    return post(httpAddr + `/companies`, data, true);
}

export function deleteCompany(id) {
    return del(httpAddr + `/companies/` + id, true)
}
