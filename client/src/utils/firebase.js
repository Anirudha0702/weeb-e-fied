// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "weeb-e-fied-cf8e5.firebaseapp.com",
  projectId: "weeb-e-fied-cf8e5",
  storageBucket: "weeb-e-fied-cf8e5.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MSG_SNDR_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const provider=new GoogleAuthProvider();
const storage = getStorage();
const db = getFirestore()
export {auth,provider,storage,db};