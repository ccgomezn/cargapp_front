function toRadians(degree) {
    return degree * Math.PI / 180.0;
}

function toDegrees(radian) {
    return radian * 180.0 / Math.PI;
}

export function midPointLatLong(lat1, lon1, lat2, lon2) {
    let dLon = toRadians(lon2 - lon1);
    lat1 = toRadians(lat1);
    lat2 = toRadians(lat2);
    lon1 = toRadians(lon1);
    let Bx = Math.cos(lat2) * Math.cos(dLon);
    let By = Math.cos(lat2) * Math.sin(dLon);
    let lat3 = Math.atan2(Math.sin(lat1) + Math.sin(lat2), Math.sqrt((Math.cos(lat1) + Bx) * (Math.cos(lat1) + Bx) + By * By));
    let lon3 = lon1 + Math.atan2(By, Math.cos(lat1) + Bx);
    return {lat: Number(toDegrees(lat3)), lng: Number(toDegrees(lon3))};
}