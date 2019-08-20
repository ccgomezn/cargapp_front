import { get, post, put, del } from '../httpRequest';
import { httpAddr } from '../http_helper';

export function getIntegrations() {
  return get(httpAddr + `/cargapp_integrations`, true);
}

export function getUsers() {
  return get(httpAddr + `/users`, true);
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

export function getModel(id) {
  return get(httpAddr + `/cargapp_models/` + id, true)
}

export function putModel(id, data) {
  return put(httpAddr + `/cargapp_models/` + id, data, true)
}

export function postModel(data) {
  return post(httpAddr + `/cargapp_models`, data, true)
}

export function getChallenges() {
  return get(httpAddr + `/challenges`, true);
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

export function getDocumentTypes() {
  return get(httpAddr + `/document_types`, true);
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

export function getCountries() {
  return get(httpAddr + '/countries', true)
}

export function getCountry(id) {
  return get(httpAddr + '/countries/' + id, true)
}

export function getDocuments() {
  return get(httpAddr + '/documents', true)
}

export function getDocument(id) {
  return get(httpAddr + '/documents/' + id, true)
}

export function getStatus() {
  return get(httpAddr + '/status', true)

}

export function putCountry(id, data) {
  return put(httpAddr + '/countries/' + id, data, true)
}

export function postCountry(data) {
  return post(httpAddr + '/countries', data, true)
}

export function getStates() {
  return get(httpAddr + '/states', true)
}

export function getCities() {
  return get(httpAddr + '/cities', true)
}

export function getCity(id) {
  return get(httpAddr + '/cities' + id, true)
}

export function putCity(id, data) {
  return put(httpAddr + `/cities/` + id, data, true);
}

export function postCity(data) {
  return post(httpAddr + `/cities`, data, true);
}

export function getCompanies() {
  return get(httpAddr + '/companies', true)
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

export function getLoadTypes() {
  return get(httpAddr + `/load_types`, true);
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

export function migrateCountries() {
  return get(httpAddr + `/countries/migration`, true);
}

export function getCoupons() {
  return get(httpAddr + `/coupons`, true);
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

export function postDocument(data) {
  return post(httpAddr + `/documents`, data, true);
}

export function putDocument(id, data) {
  return put(httpAddr + `/documents/` + id, data, true);
}

export function getParameters() {
  return get(httpAddr + `/parameters`, true);
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

export function getPermissions() {
  return get(httpAddr + `/permissions`, true);
}
export function getPermission(id) {
  return get(httpAddr + `/permissions/` + id, true);

}

export function putPermission(id, data) {
  return put(httpAddr + `/permissions/` + id, data, true);
}

export function postPermission(data) {
  return post(httpAddr + `/permissions`, data, true);
}

export function getRoles() {
  return get(httpAddr + `/roles`, true);
}
export function getRole(id) {
  return get(httpAddr + `/roles/` + id, true);

}

export function putRole(id, data) {
  return put(httpAddr + `/roles/` + id, data, true);
}

export function postRole(data) {
  return post(httpAddr + `/roles`, data, true);
}

export function getPrizes() {
  return get(httpAddr + `/prizes`, true);
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

export function getProfiles() {
  return get(httpAddr + `/profiles`, true);
}
export function getProfile(id) {
  return get(httpAddr + `/profiles/` + id, true);

}

export function putProfile(id, data) {
  return put(httpAddr + `/profiles/` + id, data, true);
}

export function postProfile(data) {
  return post(httpAddr + `/profiles`, data, true);
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

export function getStatu(id) {
  return get(httpAddr + `/status/` + id, true);

}

export function putStatu(id, data) {
  return put(httpAddr + `/status/` + id, data, true);
}

export function postStatu(data) {
  return post(httpAddr + `/status`, data, true);
}



export function getTickets() {
  return get(httpAddr + `/tickets`, true);
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



export function getUserChallenges() {
  return get(httpAddr + `/user_challenges`, true);
}
export function getUserChallenge(id) {
  return get(httpAddr + `/user_challenges/` + id, true);

}

export function putUserChallenge(id, data) {
  return put(httpAddr + `/user_challenges/` + id, data, true);
}

export function postUserChallenge(data) {
  return post(httpAddr + `/user_challenges`, data, true);
}

export function getUserCoupons() {
  return get(httpAddr + `/user_coupons`, true);
}
export function getUserCoupon(id) {
  return get(httpAddr + `/user_coupons/` + id, true);

}

export function putUserCoupon(id, data) {
  return put(httpAddr + `/user_coupons/` + id, data, true);
}

export function postUserCoupon(data) {
  return post(httpAddr + `/user_coupons`, data, true);
}

export function getUserPrizes() {
  return get(httpAddr + `/user_prizes`, true);
}
export function getUserPrize(id) {
  return get(httpAddr + `/user_prizes/` + id, true);

}

export function putUserPrize(id, data) {
  return put(httpAddr + `/user_prizes/` + id, data, true);
}

export function postUserPrize(data) {
  return post(httpAddr + `/user_prizes`, data, true);
}

export function getUserRoles() {
  return get(httpAddr + `/user_roles`, true);
}
export function getUserRole(id) {
  return get(httpAddr + `/user_roles/` + id, true);

}

export function putUserRole(id, data) {
  return put(httpAddr + `/user_roles/` + id, data, true);
}

export function postUserRole(data) {
  return post(httpAddr + `/user_roles`, data, true);
}

export function getVehicles() {
  return get(httpAddr + `/vehicles`, true);
}
export function getVehicle(id) {
  return get(httpAddr + `/vehicles/` + id, true);

}

export function putVehicle(id, data) {
  return put(httpAddr + `/vehicles/` + id, data, true);
}

export function postVehicle(data) {
  return post(httpAddr + `/vehicles`, data, true);
}

export function getVehicleTypes() {
  return get(httpAddr + `/vehicle_types`, true);
}
export function getVehicleType(id) {
  return get(httpAddr + `/vehicle_types/` + id, true);

}

export function putVehicleType(id, data) {
  return put(httpAddr + `/vehicle_types/` + id, data, true);
}

export function postVehicleType(data) {
  return post(httpAddr + `/vehicle_types`, data, true);
}


export function deleteIntegration(id) {
  return del(httpAddr + `/cargapp_integrations/` + id, true)
}

export function deleteModel(id) {
  return del(httpAddr + `/cargapp_models/` + id, true)
}

export function deleteChallenge(id) {
  return del(httpAddr + `/challenges/` + id, true)
}

export function deleteCity(id) {
  return del(httpAddr + `/cities/` + id, true)
}

export function deleteCompany(id) {
  return del(httpAddr + `/companies/` + id, true)
}
export function deleteCountry(id) {
  return del(httpAddr + `/countries/` + id, true)
}
export function deleteCoupon(id) {
  return del(httpAddr + `/coupons/` + id, true)
}
export function deleteDocument(id) {
  return del(httpAddr + `/documents/` + id, true)
}
export function deleteDocumentType(id) {
  return del(httpAddr + `/document_types/` + id, true)
}
export function deleteLoadType(id) {
  return del(httpAddr + `/load_types/` + id, true)
}
export function deleteParameter(id) {
  return del(httpAddr + `/parameters/` + id, true)
}
export function deletePermission(id) {
  return del(httpAddr + `/permissions/` + id, true)
}
export function deletePrize(id) {
  return del(httpAddr + `/prizes/` + id, true)
}
export function deleteProfile(id) {
  return del(httpAddr + `/profiles/` + id, true)
}
export function deleteRole(id) {
  return del(httpAddr + `/roles/` + id, true)
}
export function deleteState(id) {
  return del(httpAddr + `/states/` + id, true)
}
export function deleteStatu(id) {
  return del(httpAddr + `/status/` + id, true)
}
export function deleteTicket(id) {
  return del(httpAddr + `/tickets/` + id, true)
}
export function deleteUserChallenge(id) {
  return del(httpAddr + `/user_challenges/` + id, true)
}
export function deleteUserPrize(id) {
  return del(httpAddr + `/user_prizes/` + id, true)
}
export function deleteUserRole(id) {
  return del(httpAddr + `/user_roles/` + id, true)
}
export function deleteUserCoupon(id) {
  return del(httpAddr + `/user_coupons/` + id, true)
}
export function deleteVehicle(id) {
  return del(httpAddr + `/vehicles/` + id, true)
}
export function deleteVehicleType(id) {
  return del(httpAddr + `/vehicle_types/` + id, true)
}
export function getPaymentMethods() {
  return get(httpAddr + `/payment_methods`, true);
}
export function getPaymentMethod(id) {
  return get(httpAddr + `/payment_methods/`+id, true);
}
export function putPaymentMethod(id, data) {
  return put(httpAddr + '/payment_methods/'+id, data, true);
}
export function postPaymentMethod(data){
  return post(httpAddr + `/payment_methods`, data, true);
}
export function deletePaymentMethod(id) {
  return del(httpAddr + `/payment_methods/` + id, true)
}