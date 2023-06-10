# language-learning-app-for-the-blind

## Swagger
[Swagger](https://my-app-service-name-cloud-run-aisxmhvkkq-ew.a.run.app/api/docs/#/)

## Example of .env

````.env 
ENV_NAME=demo|prod

FIREBASE_API_KEY=**value**
FIREBASE_AUTH_DOMAIN=**value**
FIREBASE_PROJECT_ID=**value**
FIREBASE_DATABASE_URL=**value**
FIREBASE_STORAGE_BUCKET=**value**
FIREBASE_MESSAGING_SENDER_ID=**value**
FIREBASE_APP_ID=**value**

<!-- root path from Firebase Realtime db (the idea is to restrict writing/reading outside of the root) -->
DB_ROOT_PATH=**value**

SKIP_SEED=true|false
SEED_FILE_CLOUD_PATH=**value**
SEED_FILE_BUCKET=**value**

AUDIO_STORAGE_BASE_STORAGE=**value**

DIALOGFLOW_SESSION_BASE_PATH=projects/${project}/locations/${localtion}/agents/${agentId}/environments/${environmentId}
DIALOGFLOW_TARGET_PAGE=projects/${project}/locations/${localtion}/agents/${agentId}/flows/${flowId}/pages/${pageName}

<!-- should have access text to speech, cloud storage bucket, dialogflow, speech to text -->
CLOUD_CREDENTIALS_JSON=

<!-- It's meant for development -->
CLOUD_CREDENTIALS_PATH_TO_JSON=C:\\Users\\${user}\\...\\${fileName}.json

PORT=5001

<!-- will show something next to the correct answer -->
CHEAT=true|false
````