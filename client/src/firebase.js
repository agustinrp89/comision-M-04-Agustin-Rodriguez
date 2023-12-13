// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-proyect-c55ac.firebaseapp.com",
  projectId: "mern-proyect-c55ac",
  storageBucket: "mern-proyect-c55ac.appspot.com",
  messagingSenderId: "660230164517",
  appId: "1:660230164517:web:4e64f7d6aed7dcfa656fcc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);