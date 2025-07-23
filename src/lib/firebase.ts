// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "careercompass-nw36k",
  "appId": "1:121332615278:web:03d044c08099b2be143e7f",
  "storageBucket": "careercompass-nw36k.firebasestorage.app",
  "apiKey": "AIzaSyDRAU1r_ztieWwlCDJNRHoO632nIYKA5YU",
  "authDomain": "careercompass-nw36k.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "121332615278"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
