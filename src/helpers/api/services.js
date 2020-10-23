import {del, get, post, put} from "../httpRequest";
import {httpAddr} from "../http_helper";

export function getMineServices() {
    return get(httpAddr + '/services/me', true)
}

export function getServices() {
    return get(httpAddr + `/services/`, true);
}

export function getActiveServices() {
    return get(httpAddr + `/services/active`, true);
}

export function getService(id) {
    return get(httpAddr + `/services/` + id, true);
}

export function putService(id, data) {
    return put(httpAddr + '/services/' + id, data, true);
}

export function postService(data) {
    return post(httpAddr + `/services`, data, true);
}

export function deleteService(id) {
    return del(httpAddr + `/services/` + id, true)
}

export function getServiceDocuments() {
    return get(httpAddr + `/service_documents/`, true);
}

export function getActiveServiceDocuments() {
    return get(httpAddr + `/service_documents/active`, true);
}

export function getServiceDocument(id) {
    return get(httpAddr + `/service_documents/` + id, true);
}

export function putServiceDocument(id, data) {
    return put(httpAddr + '/service_documents/' + id, data, true);
}

export function postServiceDocument(data) {
    return post(httpAddr + `/service_documents`, data, true);
}

export function deleteServiceDocument(id) {
    return del(httpAddr + `/service_documents/` + id, true)
}

export function getServiceLocations() {
    return get(httpAddr + `/service_locations/`, true);
}

export function getActiveServiceLocations() {
    return get(httpAddr + `/service_locations/active`, true);
}

export function getServiceLocation(id) {
    return get(httpAddr + `/service_locations/` + id, true);
}

export function putServiceLocation(id, data) {
    return put(httpAddr + '/service_locations/' + id, data, true);
}

export function postServiceLocation(data) {
    return post(httpAddr + `/service_locations`, data, true);
}

export function deleteServiceLocation(id) {
    return del(httpAddr + `/service_locations/` + id, true)
}

export function getRateServices() {
    return get(httpAddr + `/rate_services/active`, true);
}

export function getActiveRateServices() {
    return get(httpAddr + `/rate_services/active`, true);
}

export function getRateService(id) {
    return get(httpAddr + `/rate_services/` + id, true);
}

export function putRateService(id, data) {
    return put(httpAddr + '/rate_services/' + id, data, true);
}

export function postRateService(data) {
    return post(httpAddr + `/rate_services`, data, true);
}

export function deleteRateService(id) {
    return del(httpAddr + `/rate_services/` + id, true)
}

export function getServicesOfDriver(id) {
    return get(httpAddr + `/services/find_driver/` + id, true);

}

export function getDocumentsOfService(id) {
    return get(httpAddr + `/service_documents/find_service/` + id, true)

}

export function getLoadTypes() {
    return get(httpAddr + `/load_types/`, true);
}

export function getActiveLoadTypes() {
    return get(httpAddr + `/load_types/active`, true);
}

export function getLoadType(id) {
    return get(httpAddr + `/load_types/` + id, true);
}

export function putLoadType(id, data) {
    return put(httpAddr + `/load_types/` + id, data, true);
}

export function postLoadType(data) {
    return post(httpAddr + `/load_types`, data, true);
}

export function deleteLoadType(id) {
    return del(httpAddr + `/load_types/` + id, true)
}
