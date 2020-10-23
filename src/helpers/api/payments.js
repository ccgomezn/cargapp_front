import {del, get, post, put} from "../httpRequest";
import {httpAddr} from "../http_helper";

export function getMineBankAccount() {
    return get(httpAddr + '/bank_account/me', true)

}

export function getPaymentMethods() {
    return get(httpAddr + `/payment_methods/`, true);
}

export function getActivePaymentMethods() {
    return get(httpAddr + `/payment_methods/active`, true);
}

export function getPaymentMethod(id) {
    return get(httpAddr + `/payment_methods/` + id, true);
}

export function putPaymentMethod(id, data) {
    return put(httpAddr + '/payment_methods/' + id, data, true);
}

export function postPaymentMethod(data) {
    return post(httpAddr + `/payment_methods`, data, true);
}

export function deletePaymentMethod(id) {
    return del(httpAddr + `/payment_methods/` + id, true)
}

export function deleteUserPaymentMethod(id) {
    return del(httpAddr + `/user_payment_methods/` + id, true)
}

export function getBankAccounts() {
    return get(httpAddr + `/bank_accounts/`, true);
}

export function getActiveBankAccounts() {
    return get(httpAddr + `/bank_accounts/active`, true);
}

export function getBankAccount(id) {
    return get(httpAddr + `/bank_accounts/` + id, true);
}

export function putBankAccount(id, data) {
    return put(httpAddr + '/bank_accounts/' + id, data, true);
}

export function postBankAccount(data) {
    return post(httpAddr + `/bank_accounts`, data, true);
}

export function deleteBankAccount(id) {
    return del(httpAddr + `/bank_accounts/` + id, true)
}

export function getCargappPayments() {
    return get(httpAddr + `/cargapp_payments/`, true);
}

export function getActiveCargappPayments() {
    return get(httpAddr + `/cargapp_payments/active`, true);
}

export function getCargappPayment(id) {
    return get(httpAddr + `/cargapp_payments/` + id, true);
}

export function putCargappPayment(id, data) {
    return put(httpAddr + '/cargapp_payments/' + id, data, true);
}

export function postCargappPayment(data) {
    return post(httpAddr + `/cargapp_payments`, data, true);
}

export function deleteCargappPayment(id) {
    return del(httpAddr + `/cargapp_payments/` + id, true)
}

export function getPayments() {
    return get(httpAddr + `/payments/`, true);
}

export function getActivePayments() {
    return get(httpAddr + `/payments/active`, true);
}

export function getPayment(id) {
    return get(httpAddr + `/payments/` + id, true);
}

export function putPayment(id, data) {
    return put(httpAddr + '/payments/' + id, data, true);
}

export function postPayment(data) {
    return post(httpAddr + `/payments`, data, true);
}

export function deletePayment(id) {
    return del(httpAddr + `/payments/` + id, true)
}
