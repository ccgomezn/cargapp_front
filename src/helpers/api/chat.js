import {del, get, post, put} from "../httpRequest";
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
