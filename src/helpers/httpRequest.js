import axios from "axios";
import { makeAuthorizationHeader, getToken } from './utility'

  export function get(url, secured) {
    let headers = {}
    if (secured) {
      headers = makeAuthorizationHeader(getToken().get('idToken'))
    }


    return axios.get(url, { headers: headers })
  }

  export function post(url, data, secured) {
    let headers = {}

    if (secured) {
      headers = makeAuthorizationHeader(getToken().get('idToken'))
    }
    return axios.post(url, data, { headers: headers })
  }

  export function put(url, data, secured) {
    let headers = {}

    if (secured) {
      headers = makeAuthorizationHeader(getToken().get('idToken'))
    }
    return axios.put(url, data, { headers: headers })
  }



