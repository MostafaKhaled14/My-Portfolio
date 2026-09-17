import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAXx43PWE33UjWkO4DG_rgu-ZFuh8m-TLQ",
  authDomain: "my-portfolio-82534.firebaseapp.com",
  projectId: "my-portfolio-82534",
  storageBucket: "my-portfolio-82534.firebasestorage.app",
  messagingSenderId: "271753425112",
  appId: "1:271753425112:web:d50c672813bd2d035167ad",
  measurementId: "G-NDXBHPVP7N",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
