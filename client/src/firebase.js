// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ajinkya-dev.firebaseapp.com",
  projectId: "ajinkya-dev",
  storageBucket: "ajinkya-dev.appspot.com",
  messagingSenderId: "55687985602",
  appId: "1:55687985602:web:b4988befe616e4441ffe5b",
  measurementId: "G-VBL9REESCX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);