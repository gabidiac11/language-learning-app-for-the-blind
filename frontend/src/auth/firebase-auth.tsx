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

const firebaseConfig = {
  apiKey: "AIzaSyDkQWaydiRpZB6936g85VBRngp9RzwG2lM",
  authDomain: "big-depth-387415.firebaseapp.com",
  projectId: "big-depth-387415",
  storageBucket: "big-depth-387415.appspot.com",
  messagingSenderId: "402112207048",
  appId: "1:402112207048:web:70338535c0715dba522dfd"
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