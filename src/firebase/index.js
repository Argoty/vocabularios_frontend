// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VUE_APP_SECRET_KEY_FIREBASE,
  authDomain: "auth-vocabularios.firebaseapp.com",
  projectId: "auth-vocabularios",
  storageBucket: "auth-vocabularios.appspot.com",
  messagingSenderId: "776969463864",
  appId: "1:776969463864:web:68cb1712edfb5799331ecd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { auth };