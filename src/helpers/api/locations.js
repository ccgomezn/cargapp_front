import {del, get, post, put} from "../httpRequest";
import {httpAddr} from "../http_helper";

export function getCountries() {
    return get(httpAddr + '/countries/', true)
}

export function getActiveCountries() {
    return get(httpAddr + '/countries/active', false)
}

export function getCountry(id) {
    return get(httpAddr + '/countries/' + id, true)
}

export function putCountry(id, data) {
    return put(httpAddr + '/countries/' + id, data, true)
}

export function postCountry(data) {
    return post(httpAddr + '/countries', data, true)
}

export function getStates() {
    return get(httpAddr + '/states/', true)
}

export function getActiveStates() {
    return get(httpAddr + '/states/active', true)
}

export function getCities() {
    return get(httpAddr + '/cities/', true)
}

export function getActiveCities() {
    return get(httpAddr + '/cities/active', true)
}

export function getCity(id) {
    return get(httpAddr + '/cities/' + id, true)
}

export function putCity(id, data) {
    return put(httpAddr + `/cities/` + id, data, true);
}

export function postCity(data) {
    return post(httpAddr + `/cities`, data, true);
}

export function migrateCountries() {
    return get(httpAddr + `/countries/migration`, true);
}

export function getState(id) {
    return get(httpAddr + `/states/` + id, true);

}

export function putState(id, data) {
    return put(httpAddr + `/states/` + id, data, true);
}

export function postState(data) {
    return post(httpAddr + `/states`, data, true);
}

export function deleteCity(id) {
    return del(httpAddr + `/cities/` + id, true)
}

export function deleteCountry(id) {
    return del(httpAddr + `/countries/` + id, true)
}

export function deleteState(id) {
    return del(httpAddr + `/states/` + id, true)
}
