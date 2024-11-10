// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "taskmanger-f85de.firebaseapp.com",
  projectId: "taskmanger-f85de",
  storageBucket: "taskmanger-f85de.firebasestorage.app",
  messagingSenderId: "489192084894",
  appId: "1:489192084894:web:86aa3d3ae3eaf04605f28f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);