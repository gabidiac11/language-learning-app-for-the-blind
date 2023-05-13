export const firebaseConfig = {
  apiKey: process.env.firebase_apiKey,
  authDomain: process.env.firebase_authDomain,
  projectId: process.env.firebase_projectId,
  storageBucket: process.env.firebase_storageBucket,
  messagingSenderId: process.env.firebase_messagingSenderId,
  appId: process.env.firebase_appId,
};

export const dbRootPathKey = process.env.DB_ROOT_PATH;

export const environment = process.env.ENV_NAME;