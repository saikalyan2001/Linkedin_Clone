// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9snganKGJ2A5shXKYVF3J_C55L0fPIrA",
  authDomain: "linkedin-clone-d230d.firebaseapp.com",
  databaseURL: "https://linkedin-clone-d230d-default-rtdb.firebaseio.com",
  projectId: "linkedin-clone-d230d",
  storageBucket: "linkedin-clone-d230d.appspot.com",
  messagingSenderId: "270002528238",
  appId: "1:270002528238:web:0a5766461b0c637f6d78ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
export { auth, app, firestore };