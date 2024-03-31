// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-app-afcdb.firebaseapp.com",
  projectId: "mern-blog-app-afcdb",
  storageBucket: "mern-blog-app-afcdb.appspot.com",
  messagingSenderId: "983113460435",
  appId: "1:983113460435:web:2c6f2dbf660d152c1fc226",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
