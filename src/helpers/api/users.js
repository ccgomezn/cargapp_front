import {del, get, post, put} from "../httpRequest";
import {httpAddr} from "../http_helper";
import axios from "axios";

export function getUsers() {
    return get(httpAddr + `/users`, true);
}

export function getDocumentsOfUser(data) {
    return post(httpAddr + `/documents/find_user/`, data, true);
}

export function getFavoriteRoutesOfUser(data) {
    return post(httpAddr + `/favorite_routes/find_user`, data, true);
}

export function getPaymentsOfUser(data) {
    return post(httpAddr + `/payments/find_user`, data, true);
}

export function getReportsOfUser(data) {
    return post(httpAddr + `/reports/find_user`, data, true);
}

export function getActiveUsers() {
    return get(httpAddr + `/users`, true);
}

export function checkUser(){
    return get(httpAddr + `/users/check`, true);
}

export function getMineUser() {
    return get(httpAddr + `/users/me`, true);
}

export function getMineStatistics() {
  return get(httpAddr + `/users/statistics`, true);
}

export function getDriversFromCompany(company_id) {
    return get(httpAddr + '/company_users/find_company/' + company_id, true)
}

export function postUserCompany(data) {
    return post(httpAddr + '/company_users', data, true);
}

export function postUser(data) {
    return post(httpAddr + `/users`, data, true);
}

export function verifyUser(id, force_creation) {
    return post(httpAddr + `/users/truora_check_user`, {
        user: {
            id: id,
            force_creation: force_creation
        }
    }, true)

}

export function getUserChallenges() {
    return get(httpAddr + `/user_challenges/`, true);
}

export function getActiveUserChallenges() {
    return get(httpAddr + `/user_challenges/active`, true);
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
    return get(httpAddr + `/user_coupons/`, true);
}

export function getActiveUserCoupons() {
    return get(httpAddr + `/user_coupons/active`, true);
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
    return get(httpAddr + `/user_prizes/`, true);
}

export function getActiveUserPrizes() {
    return get(httpAddr + `/user_prizes/active`, true);
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
    return get(httpAddr + `/user_roles/`, true);
}

export function getActiveUserRoles() {
    return get(httpAddr + `/user_roles/active`, true);
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

export function getUserPaymentMethods() {
    return get(httpAddr + `/user_payment_methods/`, true);
}

export function getActiveUserPaymentMethods() {
    return get(httpAddr + `/user_payment_methods/active`, true);
}

export function getUserPaymentMethod(id) {
    return get(httpAddr + `/user_payment_methods/` + id, true);
}

export function putUserPaymentMethod(id, data) {
    return put(httpAddr + '/user_payment_methods/' + id, data, true);
}

export function postUserPaymentMethod(data) {
    return post(httpAddr + `/user_payment_methods`, data, true);
}

export function getActiveUsersOfService() {
    return get(httpAddr + '/service_users/active', true);
}

export function getUsersOfService(service_id) {
    return get(httpAddr + '/service_users/find_service/' + service_id, true);
}

export function getProfileOfUser(user_id){
    return get(httpAddr + '/profiles/find_user/' + user_id, true);
}

export function getUserLocations() {
    return get(httpAddr + `/user_locations/`, true);
}

export function getActiveUserLocations() {
    return get(httpAddr + `/user_locations/active`, true);
}

export function getUserLocation(id) {
    return get(httpAddr + `/user_locations/find_user/` + id, true);
}

export function getUserLocationSpecific(id) {
    return get(httpAddr + `/user_locations/` + id, true);
}

export function putUserLocation(id, data) {
    return put(httpAddr + '/user_locations/' + id, data, true);
}

export function postUserLocation(data) {
    return post(httpAddr + `/user_locations`, data, true);
}

export function deleteUserLocation(id) {
    return del(httpAddr + `/user_locations/` + id, true)
}

export function getUser(id) {
    return get(httpAddr + '/users/' + id, true);
}

export function putUserOfService(id, data,) {
    return put(httpAddr + '/service_users/' + id, data, true);
}

export function postUserOfService(data) {
    return post(httpAddr + '/service_users', data, true);
}

export function acceptUserOfService(user_service_id, user_id, service_id, status_id) {
    return axios.all([put(httpAddr + '/service_users/' + user_service_id, {approved: true}, true),
        put(httpAddr + '/services/' + service_id, {user_driver_id: user_id, statu_id: status_id}, true)])
}

export function verifyEmail(email) {
    return post(httpAddr + '/users/email_verify', {user: {email: email}}, false, false);
}

export function verifyPhoneNumber(number) {
    return post(httpAddr + '/users/phone_verify', {user: {phone_number: number}}, false, false);
}

export function confirmUser(data) {
    return post(httpAddr + '/users/validate_number', data, false)
}

export function resendCode(data) {
    return post(httpAddr + '/users/resend_code', data, false)
}

export function getPermissions() {
    return get(httpAddr + `/permissions/`, true);
}

export function getActivePermissions() {
    return get(httpAddr + `/permissions/active`, true);
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
    return get(httpAddr + `/roles/`, true);
}

export function getActiveRoles() {
    return get(httpAddr + `/roles/active`, true);
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

export function getProfiles() {
    return get(httpAddr + `/profiles/active`, true);
}

export function getActiveProfiles() {
    return get(httpAddr + `/profiles/active`, true);
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

export function deleteProfile(id) {
    return del(httpAddr + `/profiles/` + id, true)
}

export function deleteRole(id) {
    return del(httpAddr + `/roles/` + id, true)
}

export function getFavoriteRoutes() {
    return get(httpAddr + `/favorite_routes/`, true);
}

export function getActiveFavoriteRoutes() {
    return get(httpAddr + `/favorite_routes/active`, true);
}

export function getFavoriteRoute(id) {
    return get(httpAddr + `/favorite_routes/` + id, true);
}

export function putFavoriteRoute(id, data) {
    return put(httpAddr + '/favorite_routes/' + id, data, true);
}

export function postFavoriteRoute(data) {
    return post(httpAddr + `/favorite_routes`, data, true);
}

export function recoverPassword(data){
    return post(httpAddr + `/users/reset_password`, data, false);
}

export function changePassword(data){
    return post(httpAddr + `/users/new_password`, data, false);

}

export function deleteFavoriteRoute(id) {
    return del(httpAddr + `/favorite_routes/` + id, true)
}

export function getMinePermissions(){
    return get(httpAddr + '/permissions/me', true)
}


export function getMineProfile(){
    return get(httpAddr + '/profiles/me', true)
}
