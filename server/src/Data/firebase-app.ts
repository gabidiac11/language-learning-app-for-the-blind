import { initializeApp } from "@firebase/app";
import admin from "firebase-admin";

import { firebaseConfig } from "../constants";


const firebaseApp = initializeApp(firebaseConfig);

admin.initializeApp(firebaseConfig);

export { firebaseApp };
