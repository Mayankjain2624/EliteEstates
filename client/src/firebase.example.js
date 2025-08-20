// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Copy this file to firebase.js and replace with your actual Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.firebasestorage.app",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

/*
SETUP INSTRUCTIONS:
1. Copy this file to firebase.js
2. Go to https://console.firebase.google.com/
3. Create a new project or use existing one
4. Go to Project Settings > General > Your apps
5. Add a web app and copy the configuration
6. Replace the values above with your actual Firebase config
7. Make sure to set up environment variables in your .env file:
   
   VITE_FIREBASE_API_KEY=your_api_key_here
   
   Note: Other values can be hardcoded as they're not sensitive,
   but API key should be in environment variables for security.
*/
