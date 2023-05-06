import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDbJvC-f_CBX0Hl_2IqEAAddfglKDEKW7w",
  authDomain: "lang-learning-for-the-blind.firebaseapp.com",
  projectId: "lang-learning-for-the-blind",
  storageBucket: "lang-learning-for-the-blind.appspot.com",
  messagingSenderId: "510945432371",
  appId: "1:510945432371:web:62de4becd1bc4784f52446"
};

const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

const alertError = (error: unknown) => {
  const message = (() => {
    (error: unknown) => {
      if (error as Error) return (error as Error).message;
      if (error as string) return error as string;
      return "Error has occrured" + error;
    };
  })();

  alert(message);
};

const signInWithGoogle = async () => {
  try {
    await signInWithPopup(firebaseAuth, googleProvider);
  } catch (err: unknown) {
    console.error(err);
    alertError(err);
  }
};

const logInWithEmailAndPassword = async (email:string, password: string) => {
  try {
    await signInWithEmailAndPassword(firebaseAuth, email, password);
  } catch (err) {
    console.error(err);
    alertError(err);
  }
};

const registerWithEmailAndPassword = async (name: string, email: string, password: string) => {
  try {
    await createUserWithEmailAndPassword(firebaseAuth, email, password);
  } catch (err) {
    console.error(err);
    alertError(err);
  }
};

const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(firebaseAuth, email);
    alertError("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alertError(err);
  }
};

const logout = () => {
  signOut(firebaseAuth);
};

export {
  firebaseAuth,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};

export {};