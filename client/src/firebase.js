import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBxuesDWsnrmEamP1fqA5Zs4JRzyK3lKFQ",
  authDomain: "react-auth-c05d6.firebaseapp.com",
  projectId: "react-auth-c05d6",
  storageBucket: "react-auth-c05d6.appspot.com",
  messagingSenderId: "564478801426",
  appId: "1:564478801426:web:4d5e0ef67310b7c7350acb",
  measurementId: "G-P6JSXNCJZ3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export default app;
