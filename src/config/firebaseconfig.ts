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
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyABcFbiwq9PKIB9sZhakx59xoP-OcDec0w",
  authDomain: "storage-950db.firebaseapp.com",
  projectId: "storage-950db",
  storageBucket: "storage-950db.appspot.com",
  messagingSenderId: "912014457887",
  appId: "1:912014457887:web:c54f2df0500ecc2609e92a",
  measurementId: "G-F19D8VJW2R",
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

const storage = getStorage(app);

export {
  auth,
  provider,
  githubProvider,
  storage,
  signUpWithEmailPassword,
  signInWithEmailPassword,
  logout,
};
