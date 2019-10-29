import {del, get, post, put} from "../httpRequest";
import {httpAddr} from "../http_helper";

export function getIntegrations() {
    return get(httpAddr + `/cargapp_integrations/`, true);
}

export function getActiveIntegrations() {
    return get(httpAddr + `/cargapp_integrations/active`, true);
}

export function getIntegration(id) {
    return get(httpAddr + `/cargapp_integrations/` + id, true)
}

export function getMyIntegration() {
    return get(httpAddr + `/cargapp_integrations/me`, true);
}

export function putIntegration(id, data) {
    return put(httpAddr + `/cargapp_integrations/` + id, data, true)
}

export function postIntegration(data) {
    return post(httpAddr + `/cargapp_integrations`, data, true)
}

export function getModels() {
    return get(httpAddr + `/cargapp_models`, true)
}

export function getActiveModels() {
    return get(httpAddr + `/cargapp_models/active`, true)
}

export function getModel(id) {
    return get(httpAddr + `/cargapp_models/` + id, true)
}

export function putModel(id, data) {
    return put(httpAddr + `/cargapp_models/` + id, data, true)
}

export function postModel(data) {
    return post(httpAddr + `/cargapp_models`, data, true)
}

export function getDocumentTypes() {
    return get(httpAddr + `/document_types/`, true);
}

export function getActiveDocumentTypes() {
    return get(httpAddr + `/document_types/active`, true);
}

export function getDocumentType(id) {
    return get(httpAddr + `/document_types/` + id, true);
}

export function putDocumentType(id, data) {
    return put(httpAddr + `/document_types/` + id, data, true);
}

export function postDocumentType(data) {
    return post(httpAddr + `/document_types`, data, true);
}

export function getDocuments() {
    return get(httpAddr + '/documents/', true)
}

export function getActiveDocuments() {
    return get(httpAddr + '/documents/active', true)
}

export function getDocument(id) {
    return get(httpAddr + '/documents/' + id, true)
}

export function getStatus() {
    return get(httpAddr + '/status/', true)

}

export function getActiveStatus() {
    return get(httpAddr + '/status/active', true)

}

export function getParameters() {
    return get(httpAddr + `/parameters/`, true);
}

export function getActiveParameters() {
    return get(httpAddr + `/parameters/active`, true);
}

export function getParameter(id) {
    return get(httpAddr + `/parameters/` + id, true);

}

export function putParameter(id, data) {
    return put(httpAddr + `/parameters/` + id, data, true);
}

export function postParameter(data) {
    return post(httpAddr + `/parameters`, data, true);
}

export function getStatu(id) {
    return get(httpAddr + `/status/` + id, true);

}

export function putStatu(id, data) {
    return put(httpAddr + `/status/` + id, data, true);
}

export function postStatu(data) {
    return post(httpAddr + `/status`, data, true);
}

export function deleteIntegration(id) {
    return del(httpAddr + `/cargapp_integrations/` + id, true)
}

export function deleteModel(id) {
    return del(httpAddr + `/cargapp_models/` + id, true)
}

export function deleteDocument(id) {
    return del(httpAddr + `/documents/` + id, true)
}

export function deleteDocumentType(id) {
    return del(httpAddr + `/document_types/` + id, true)
}

export function deleteParameter(id) {
    return del(httpAddr + `/parameters/` + id, true)
}

export function deletePermission(id) {
    return del(httpAddr + `/permissions/` + id, true)
}

export function deleteStatu(id) {
    return del(httpAddr + `/status/` + id, true)
}

export function getCargappAds() {
    return get(httpAddr + `/cargapp_ads/`, true);
}

export function getActiveCargappAds() {
    return get(httpAddr + `/cargapp_ads/active`, true);
}

export function getCargappAd(id) {
    return get(httpAddr + `/cargapp_ads/` + id, true);
}

export function putCargappAd(id, data) {
    return put(httpAddr + '/cargapp_ads/' + id, data, true);
}

export function postCargappAd(data) {
    return post(httpAddr + `/cargapp_ads`, data, true);
}

export function deleteCargappAd(id) {
    return del(httpAddr + `/cargapp_ads/` + id, true)
}

export function getStatusOfModel(model) {
    return get(httpAddr + '/status/find_model/' + model, true);
}

export function getChallenges() {
    return get(httpAddr + `/challenges`, true);
}

export function getActiveChallenges() {
    return get(httpAddr + `/challenges/active`, true);
}

export function getChallenge(id) {
    return get(httpAddr + `/challenges/` + id, true);
}

export function putChallenge(id, data) {
    return put(httpAddr + `/challenges/` + id, data, true);
}

export function postChallenge(data) {
    return post(httpAddr + `/challenges`, data, true);
}

export function getCoupons() {
    return get(httpAddr + `/coupons/`, true);
}

export function getActiveCoupons() {
    return get(httpAddr + `/coupons/active`, true);
}

export function getCoupon(id) {
    return get(httpAddr + `/coupons/` + id, true);
}

export function putCoupon(id, data) {
    return put(httpAddr + `/coupons/` + id, data, true);
}

export function postCoupon(data) {
    return post(httpAddr + `/coupons`, data, true);
}

export function getTickets() {
    return get(httpAddr + `/tickets/`, true);
}

export function getActiveTickets() {
    return get(httpAddr + `/tickets/active`, true);
}

export function getTicket(id) {
    return get(httpAddr + `/tickets/` + id, true);

}

export function putTicket(id, data) {
    return put(httpAddr + `/tickets/` + id, data, true);
}

export function postTicket(data) {
    return post(httpAddr + `/tickets`, data, true);
}

export function deleteChallenge(id) {
    return del(httpAddr + `/challenges/` + id, true)
}

export function deleteTicket(id) {
    return del(httpAddr + `/tickets/` + id, true)
}

export function getReports() {
    return get(httpAddr + `/reports/`, true);
}

export function getActiveReports() {
    return get(httpAddr + `/reports/active`, true);
}

export function getReport(id) {
    return get(httpAddr + `/reports/` + id, true);
}

export function putReport(id, data) {
    return put(httpAddr + '/reports/' + id, data, true);
}

export function postReport(data) {
    return post(httpAddr + `/reports`, data, true);
}

export function deleteReport(id) {
    return del(httpAddr + `/reports/` + id, true)
}

export function findParameters(code) {
    return get(httpAddr + `/parameters/find/` + code, true);
}

export function getPrizes() {
    return get(httpAddr + `/prizes/`, true);
}

export function getActivePrizes() {
    return get(httpAddr + `/prizes/active`, true);
}

export function getPrize(id) {
    return get(httpAddr + `/prizes/` + id, true);

}

export function putPrize(id, data) {
    return put(httpAddr + `/prizes/` + id, data, true);
}

export function postPrize(data) {
    return post(httpAddr + `/prizes`, data, true);
}

export function deleteCoupon(id) {
    return del(httpAddr + `/coupons/` + id, true)
}

export function deletePrize(id) {
    return del(httpAddr + `/prizes/` + id, true)
}

export function postDocument(data) {
    return post(httpAddr + `/documents`, data, true);
}

export function putDocument(id, data) {
    return put(httpAddr + `/documents/` + id, data, true);
}
