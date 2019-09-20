import {Map} from 'immutable';
import CryptoJS from "crypto-js";

export function clearToken() {

    localStorage.removeItem('id_token');
    localStorage.removeItem('roles');

}

export function transformInputData(input) {
    return input !== undefined && input.key !== undefined ? input.key : input;
}

export function encrypt(message) {
    console.log(CryptoJS.AES.encrypt(message, 'secret key 123').toString())
    return CryptoJS.AES.encrypt(message, 'secret key 123').toString();
}

export function decrypt(message) {
    var bytes = CryptoJS.AES.decrypt(message, 'secret key 123')
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext;
}

export function getToken() {
    try {
        const idToken = localStorage.getItem('id_token');
        const roles = localStorage.getItem('roles');
        return new Map({idToken, roles});
    } catch (err) {
        clearToken();
        return new Map();
    }
}

export function refreshToken() {

}

export function makeAuthorizationHeader(token) {
    return {
        Authorization: 'Bearer ' + token,
    };
}

export function timeDifference(givenTime) {
    givenTime = new Date(givenTime);
    const milliseconds = new Date().getTime() - givenTime.getTime();
    const numberEnding = number => {
        return number > 1 ? 's' : '';
    };
    const number = num => (num > 9 ? '' + num : '0' + num);
    const getTime = () => {
        let temp = Math.floor(milliseconds / 1000);
        const years = Math.floor(temp / 31536000);
        if (years) {
            const month = number(givenTime.getUTCMonth() + 1);
            const day = number(givenTime.getUTCDate());
            const year = givenTime.getUTCFullYear() % 100;
            return `${day}-${month}-${year}`;
        }
        const days = Math.floor((temp %= 31536000) / 86400);
        if (days) {
            if (days < 28) {
                return days + ' day' + numberEnding(days);
            } else {
                const months = [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec'
                ];
                const month = months[givenTime.getUTCMonth()];
                const day = number(givenTime.getUTCDate());
                return `${day} ${month}`;
            }
        }
        const hours = Math.floor((temp %= 86400) / 3600);
        if (hours) {
            return `${hours} hour${numberEnding(hours)} ago`;
        }
        const minutes = Math.floor((temp %= 3600) / 60);
        if (minutes) {
            return `${minutes} minute${numberEnding(minutes)} ago`;
        }
        return 'a few seconds ago';
    };
    return getTime();
}

export function stringToInt(value, defValue = 0) {
    if (!value) {
        return 0;
    } else if (!isNaN(value)) {
        return parseInt(value, 10);
    }
    return defValue;
}

export function stringToPosetiveInt(value, defValue = 0) {
    const val = stringToInt(value, defValue);
    return val > -1 ? val : defValue;
}
