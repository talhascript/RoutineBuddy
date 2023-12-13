// Import the functions you need from the SDKs you need

import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWiAU08tfI-EiUA7rikyHtaOdVZo35hBE",
  authDomain: "routinebuddy-66814.firebaseapp.com",
  projectId: "routinebuddy-66814",
  storageBucket: "routinebuddy-66814.appspot.com",
  messagingSenderId: "230685480941",
  appId: "1:230685480941:web:0f783c4c094e9488ec79e4",
  measurementId: "G-QCY47M7227"
};

// Initialize Firebase
const app = getApps().length ? getApps() : initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);


export { app, auth, db };
