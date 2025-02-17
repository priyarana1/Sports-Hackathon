import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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
export const auth = getAuth(app);