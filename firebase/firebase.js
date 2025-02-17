// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpfTJKVSab7_t7WFQEqDdLouWcdr4amSM",
  authDomain: "sports-hackathon-1f077.firebaseapp.com",
  projectId: "sports-hackathon-1f077",
  storageBucket: "sports-hackathon-1f077.firebasestorage.app",
  messagingSenderId: "290666820773",
  appId: "1:290666820773:web:85e41a44808afdfc47094c",
  measurementId: "G-5YTY1NFX6C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export {app, auth};