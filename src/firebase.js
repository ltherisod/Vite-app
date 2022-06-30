import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyCl3O8UPFyLwRQWFaCI-cvpnfv_saiA_Ts",
  authDomain: "vite-app-22.firebaseapp.com",
  projectId: "vite-app-22",
  storageBucket: "vite-app-22.appspot.com",
  messagingSenderId: "387352972294",
  appId: "1:387352972294:web:93f42d3da5a153f65e4787"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export {auth}