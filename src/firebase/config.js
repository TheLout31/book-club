
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD7djxAWqSFmKX7BVj4YsskKTuY6HJ2_eQ",
  authDomain: "book-club-12d3d.firebaseapp.com",
  projectId: "book-club-12d3d",
  storageBucket: "book-club-12d3d.firebasestorage.app",
  messagingSenderId: "380144287169",
  appId: "1:380144287169:web:d2a8556afb9a9775e48340",
  measurementId: "G-BPGMGQ0NKX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
