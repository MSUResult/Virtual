import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyCmgA1tTBzD6s4BrDhfT4Lu_xoLGqtsuyw",
  authDomain: "telegram-clone-yt-95f74.firebaseapp.com",
  projectId: "telegram-clone-yt-95f74",
  storageBucket: "telegram-clone-yt-95f74.firebasestorage.app",
  messagingSenderId: "467335060554",
  appId: "1:467335060554:web:71675c05961f558adf9ab3",

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export {auth,provider}