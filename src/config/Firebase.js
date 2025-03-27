import { initializeApp } from "firebase/app";
import {getAuth ,GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyACsfBR4giCWis0QGwUvT0_QfrliXIjHEQ",
  authDomain: "loginwith-be6d8.firebaseapp.com",
  projectId: "loginwith-be6d8",
  storageBucket: "loginwith-be6d8.firebasestorage.app",
  messagingSenderId: "16765472757",
  appId: "1:16765472757:web:32483c8bf389ee67721abc",
  measurementId: "G-JN8X7STMTW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const googleProvider= new GoogleAuthProvider();

export {auth ,googleProvider};