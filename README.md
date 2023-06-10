# language-learning-app-for-the-blind

## Swagger
[Swagger](https://my-app-service-name-cloud-run-aisxmhvkkq-ew.a.run.app/api/docs/#/)

## Example of .env

````.env 

FIREBASE_API_KEY=`${value}`
FIREBASE_AUTH_DOMAIN=`${value}`
FIREBASE_PROJECT_ID=`${value}`
FIREBASE_DATABASE_URL=`${value}`
FIREBASE_STORAGE_BUCKET=`${value}`
FIREBASE_MESSAGING_SENDER_ID=`${value}`
FIREBASE_APP_ID=`${value}`

ENV_NAME=demo|prod

SKIP_SEED=true|false
DB_ROOT_PATH=`${value}`

PORT=`${value}`

CHEAT=true|false // will show something next to the correct answer

DIALOGFLOW_SESSION_BASE_PATH=`projects/${projectId}/locations/${location}/agent/environments/${dialogFlowEnvironmentId}`

// should have access text-to-speech, storage, dialogflow
CLOUD_CREDENTIALS_JSON=""

````