import {initializeApp} from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDkHR1-c4tBzP9YNhX2Gw1FUBSmHuzKikY",
    authDomain: "instagram-clone-f46bf.firebaseapp.com",
    projectId: "instagram-clone-f46bf",
    storageBucket: "instagram-clone-f46bf.appspot.com",
    messagingSenderId: "853049134242",
    appId: "1:853049134242:web:ac576dc701c0dee17e9bfb"
};
// init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();
const auth = getAuth()

export {db,auth};

