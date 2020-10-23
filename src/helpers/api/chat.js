import {get, post} from "../httpRequest";
import {httpAddr} from "../http_helper";

export function getMineRooms() {
    return get(httpAddr + `/room_users/me` , true)
}

export function getActiveChats(){
    return get(httpAddr + `/rooms/active` , true)
}

export function getRoom(id){
    return get(httpAddr + `/rooms/`+id , true)
}

export function createRoom(data){
    return post(httpAddr+'/rooms',data,true,true);
}

export function addPersonToRoom(data){
    return post(httpAddr+'/room_users',data,true,true);
}
