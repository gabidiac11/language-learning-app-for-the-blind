// environment: "demo"|"production"
export const environment = process.env.ENV_NAME;

// firebase - auth, realtime db
export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};
export const dbRootPathKey = process.env.DB_ROOT_PATH;

// dialog flow
export const dialogFlowBaseSessionPath = process.env.DIALOGFLOW_SESSION_BASE_PATH;
export const dialogFlowTargetPath = process.env.DIALOGFLOW_TARGET_PAGE;

// audio path
export const audioStorageBasePath = process.env.AUDIO_STORAGE_BASE_STORAGE;

// credentials
export const cloudCredentialsJson = process.env.CLOUD_CREDENTIALS_JSON;
export const cloudCredentailsFilePath = process.env.CLOUD_CREDENTIALS_PATH_TO_JSON;

// seed related:
export const skipSeed = process.env.SKIP_SEED === "true";
export const seedFileCloudBasePath = process.env.SEED_FILE_CLOUD_PATH;
export const seedFileBucket = process.env.SEED_FILE_STORAGE_BUCKET;

// API configs
export const cheatAnswers = process.env.CHEAT === "true";
export const lessonLanguageHeader = "lesson-language";