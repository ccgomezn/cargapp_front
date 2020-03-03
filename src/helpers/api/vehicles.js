import {del, get, post, put} from "../httpRequest";
import {httpAddr} from "../http_helper";

export function getVehicles() {
    return get(httpAddr + `/vehicles/`, true);
}
export function getMineVehicles() {
    return get(httpAddr + `/vehicles/me`, true);
}

export function getActiveVehicles() {
    return get(httpAddr + `/vehicles/active`, true);
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
    return get(httpAddr + `/vehicle_types/`, true);
}

export function getActiveVehicleTypes() {
    return get(httpAddr + `/vehicle_types/active`, true);
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

export function deleteVehicle(id) {
    return del(httpAddr + `/vehicles/` + id, true)
}

export function deleteVehicleType(id) {
    return del(httpAddr + `/vehicle_types/` + id, true)
}
