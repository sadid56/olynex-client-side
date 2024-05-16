// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbKJLguDjlLWj58kiBWIzg2Vi3H0ashe0",
  authDomain: "olynex-9ff2d.firebaseapp.com",
  projectId: "olynex-9ff2d",
  storageBucket: "olynex-9ff2d.appspot.com",
  messagingSenderId: "324718816926",
  appId: "1:324718816926:web:5f41f9f38161a230d2958f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;