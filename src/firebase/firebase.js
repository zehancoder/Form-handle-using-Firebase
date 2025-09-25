import { initializeApp } from "firebase/app";
import { useContext } from "react";
import userContext from "../context/context";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCTNm4aYS1wkQ_PPAezNyy4BWRmj0bWsV4",
  authDomain: "contextform-b3316.firebaseapp.com",
  projectId: "contextform-b3316",
  storageBucket: "contextform-b3316.firebasestorage.app",
  messagingSenderId: "545654775109",
  appId: "1:545654775109:web:3b92c13f6bfed7931f722c",
  measurementId: "G-W0MTDL8CZL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (name, email, password, setSignUpMsg) => {
  
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    setSignUpMsg("Successfuly SignUP")
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    if(error.code === "auth/email-already-in-use"){
      setSignUpMsg("This user is already exist");
    }else{
      setSignUpMsg("Enter valid E-mail or Password")
    }
    
  }
};

const Login = async (email, password,setSignUpMsg) => {
  try {
   
    await signInWithEmailAndPassword(auth, email, password);
    
     setSignUpMsg("Successfuly Login")
  } catch (error) {
    
   setSignUpMsg("Login Failed");
  }
};

const Logout = async () => {
  signOut(auth);

};

export { auth, db, signUp, Login, Logout };
