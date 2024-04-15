// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "mern-estate-bab78.firebaseapp.com",
  projectId: "mern-estate-bab78",
  storageBucket: "mern-estate-bab78.appspot.com",
  messagingSenderId: "1088099791406",
  appId: "1:1088099791406:web:e578c5183438e45e0ba5bf"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);