// firebaseConfig.js
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDTj4Vx4a4ogBqG-ZXy5l-fbfLUrHdNSnk",
  authDomain: "trial-39758.firebaseapp.com",
  projectId: "trial-39758",
  storageBucket: "trial-39758.appspot.com",
  messagingSenderId: "873553202382",
  appId: "1:873553202382:web:21ab1ac1a8fd1d50e3149f",
  measurementId: "G-9PMK3JQ005",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const signUpWithEmailPassword = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User signed up:", userCredential.user);
    return userCredential.user;
  } catch (error: any) {
    console.error("Error signing up:", error.message);
    throw error;
  }
};

const signInWithEmailPassword = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User signed in:", userCredential.user);
    return userCredential.user;
  } catch (error: any) {
    console.error("Error signing in:", error.message);
    throw error;
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error: any) {
    console.error("Error signing out:", error.message);
    throw error;
  }
};

export {
  auth,
  provider,
  githubProvider,
  signUpWithEmailPassword,
  signInWithEmailPassword,
  logout,
};
