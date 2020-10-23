import * as firebase from 'firebase';
const config = {
    apiKey: "AIzaSyDmL-0wBZ7H-WiEIzcSCjanMFl5tlvqTvI",
    authDomain: "cargapp-mvp.firebaseapp.com",
    databaseURL: "https://cargapp-mvp.firebaseio.com",
    projectId: "cargapp-mvp",
    storageBucket: "cargapp-mvp.appspot.com",
    messagingSenderId: "949419419550",

};

firebase.initializeApp(config);
export default firebase;
