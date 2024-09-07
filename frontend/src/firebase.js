// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBmn-N3PCRn7fmr_4n8m1f6XR_8ver2Ncc",
    authDomain: "online-seat-booking-1b50c.firebaseapp.com",
    projectId: "online-seat-booking-1b50c",
    storageBucket: "online-seat-booking-1b50c.appspot.com",
    messagingSenderId: "314112930391",
    appId: "1:314112930391:web:aefd844968a3855b69a912",
    measurementId: "G-XYKFX8XC65",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
