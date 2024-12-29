// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-408bf.firebaseapp.com",
  projectId: "real-estate-408bf",
  storageBucket: "real-estate-408bf.firebasestorage.app",
  messagingSenderId: "501971077271",
  appId: "1:501971077271:web:9ed9c0c592977adf1101d2"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);