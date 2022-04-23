// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import firebase from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
require('firebase/compat/auth');
require('firebase/compat/firestore');
// import firebaseConfig from './firebaseConfig';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyClcYruHFVN9zWDNgXzf1_ad62iGZggYEo",
    authDomain: "hack36-punters.firebaseapp.com",
    projectId: "hack36-punters",
    storageBucket: "hack36-punters.appspot.com",
    messagingSenderId: "458172439390",
    appId: "1:458172439390:web:ccce7f8d3ce2ac4e520dcf",
    measurementId: "G-9DX5F5C7ZK"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

export {auth , firebase};