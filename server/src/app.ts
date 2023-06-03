import dotenv from "dotenv";
dotenv.config(); // TODO: see if this affects the build from react and its variables

import bodyParser from "body-parser";
import path from "path";
import express from "express";
import { Request } from "express";
import fs from "fs";
import { log } from "./logger";
import { executeAuthenticatedAction } from "./ApiSupport/apiActionHelpers";
import getControllers from "./ApiSupport/getControllers";
import Seeder from "./Data/Seed/Seeder";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import createContainer from "./diContainer";
import { acceptedLanguages, Language } from "./Data/ctxTypes/ctx.story.types";
import { lessonLanguageHeader } from "./constants";

if (process.env.ALLOW_SEED === "true") {
  (async () => {
    const seeder = (await createContainer(undefined).get("Seeder")) as Seeder;
    seeder.seedIfNeeded();
  })();
} else {
  log("No seed tried for this environment.");
}

// TODO:
// prioritize what message will pre-recorded for the user, some might not appear to him if the app is working from a good actor
// you can use the fallback text to speech for messages that might not apepar for the user that much if is not activetly messing with the API

// TODO: make json imports for seeding data is done from cloud storage

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded());

app.use(express.static(path.join(__dirname, "../../frontend/build")));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(morgan("tiny"));

app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
    customCss: `
      .swagger-ui .opblock-tag {
        display: block!important;
      }
      .btn.authorize {
        display: none;
      }
      .modal-ux-header h3 {
        visibility: hidden;
      }
      .swagger-ui .auth-wrapper .authorize {
        padding-bottom: 10px;
      }
    `,
    customJs: `/swagger.js`,
    customSiteTitle: "Swagger - API Language Learning App",
  })
);

// ENDPOINTS -> ### Languages
app.get("/api/lesson-languages", async (req, res) => {
  const DI = createContainer("");
  const { lessonLanguagesController: controller } = getControllers(DI);
  const action = () => controller.getLessonLanguages();
  await executeAuthenticatedAction({ req, res, controller, DI }, action);
});

// ENDPOINTS -> ### Stories
app.get("/api/userStories", async (req, res) => {
  const DI = createContainer(lg(req));
  const { userStoriesController: controller } = getControllers(DI);

  const action = () => controller.getStories();
  await executeAuthenticatedAction({ req, res, controller, DI }, action);
});
app.get("/api/userStories/:id", async (req, res) => {
  const DI = createContainer(lg(req));
  const { userStoriesController: controller } = getControllers(DI);

  const [id] = controller.getParams(req, ["id"]);
  const action = () => controller.getStory(id);
  await executeAuthenticatedAction({ req, res, controller, DI }, action);
});

// ENDPOINTS -> ### BLOCKS PROGRESS
app.get("/api/blocks/:blockProgressId", async (req, res) => {
  const DI = createContainer(lg(req));
  const { blocksController: controller } = getControllers(DI);

  const [blockProgressId] = controller.getParams(req, ["blockProgressId"]);
  const action = () => controller.getBlockProgress(blockProgressId);
  await executeAuthenticatedAction({ req, res, controller, DI }, action);
});
app.post("/api/blocks/:blockProgressId/complete-summary", async (req, res) => {
  const DI = createContainer(lg(req));
  const { blocksController: controller } = getControllers(DI);

  const [blockProgressId] = controller.getParams(req, ["blockProgressId"]);
  const action = () => controller.completeSummary(blockProgressId);
  await executeAuthenticatedAction({ req, res, controller, DI }, action);
});

// ENDPOINTS -> ### BLOCK QUIZ
app.post(
  "/api/blocks/:blockProgressId/quiz/request-question",
  async (req, res) => {
    const DI = createContainer(lg(req));
    const { blockQuizController: controller } = getControllers(DI);
    
    const [blockProgressId] = controller.getParams(req, ["blockProgressId"]);
    const action = () => controller.requestQuizQuestion(blockProgressId);
    await executeAuthenticatedAction({ req, res, controller, DI }, action);
  }
);

app.post(
  "/api/blocks/:blockProgressId/quiz/answer-question",
  async (req, res) => {
    const DI = createContainer(lg(req));
    const { blockQuizController: controller } = getControllers(DI);

    const [blockProgressId] = controller.getParams(req, ["blockProgressId"]);
    const action = () =>
      controller.answerQuizQuestion(req.body, blockProgressId);
    await executeAuthenticatedAction({ req, res, controller, DI }, action);
  }
);
app.get(
  "/api/blocks/:blockProgressId/quiz/:quizId/completed",
  async (req, res) => {
    const DI = createContainer(lg(req));
    const { blockQuizController: controller } = getControllers(DI);

    const [blockProgressId, quizId] = controller.getParams(req, [
      "blockProgressId",
      "quizId",
    ]);
    const action = () =>
      controller.getProgressAchievedOfCompletedQuiz(blockProgressId, quizId);
    await executeAuthenticatedAction({ req, res, controller, DI }, action);
  }
);

// ENDPOINTS -> ### EPILOGUE
app.get("/api/epilogues/:epilogueProgressId", async (req, res) => {
  const DI = createContainer(lg(req));
  const { epilogueController: controller } = getControllers(DI);
  
  const [epilogueProgressId] = controller.getParams(req, [
    "epilogueProgressId",
  ]);
  const action = () => controller.getEpilogueProgress(epilogueProgressId);

  await executeAuthenticatedAction({ req, res, controller, DI }, action);
});

app.post(
  "/api/epilogues/:epilogueProgressId/complete-summary",
  async (req, res) => {
    const DI = createContainer(lg(req));
    const { epilogueController: controller } = getControllers(DI);
    
    const [epilogueProgressId] = controller.getParams(req, [
      "epilogueProgressId",
    ]);
    const action = () => controller.completeSummary(epilogueProgressId);

    await executeAuthenticatedAction({ req, res, controller, DI }, action);
  }
);

// ENDPOINTS -> ### EPILOGUE QUIZ
app.post(
  "/api/epilogues/:epilogueProgressId/quiz/request-question",
  async (req, res) => {
    const DI = createContainer(lg(req));
    const { epilogueQuizController: controller } = getControllers(DI);

    const [epilogueProgressId] = controller.getParams(req, [
      "epilogueProgressId",
    ]);
    const action = () => controller.requestQuizQuestion(epilogueProgressId);

    await executeAuthenticatedAction({ req, res, controller, DI }, action);
  }
);
app.post(
  "/api/epilogues/:epilogueProgressId/quiz/answer-question",
  async (req, res) => {
    const DI = createContainer(lg(req));
    const { epilogueQuizController: controller } = getControllers(DI);

    const [epilogueProgressId] = controller.getParams(req, [
      "epilogueProgressId",
    ]);
    const action = () =>
      controller.answerQuizQuestion(req.body, epilogueProgressId);

    await executeAuthenticatedAction({ req, res, controller, DI }, action);
  }
);
app.get(
  "/api/epilogues/:epilogueProgressId/quiz/:quizId/completed",
  async (req, res) => {
    const DI = createContainer(lg(req));
    const { epilogueQuizController: controller } = getControllers(DI);

    const [epilogueProgressId, quizId] = controller.getParams(req, [
      "epilogueProgressId",
      "quizId",
    ]);
    const action = () =>
      controller.getProgressAchievedOfCompletedQuiz(epilogueProgressId, quizId);

    await executeAuthenticatedAction({ req, res, controller, DI }, action);
  }
);

app.get("/api/*", (req, res) => {
  return res.status(404).send({ message: "Route not found." });
});

app.get("/swagger.json", function (req, res) {
  const pathName = path.join(__dirname, "../", "swagger.json");
  if (!fs.existsSync(pathName)) {
    log(`Path to swagger json is not great.`);
    return res.status(404).send({ message: "Route was not found." });
  }
  log(`Path to swagger...`);
  res.sendFile(pathName);
});

app.get("/swagger.js", function (req, res) {
  const pathName = path.join(__dirname, "../", "swagger.js");
  if (!fs.existsSync(pathName)) {
    log(`Path to swagger js is not great.`);
    return res.status(404).send({ message: "Route was not found." });
  }
  log(`Path to swagger js...`);
  res.sendFile(pathName);
});

app.get("/*", function (req, res) {
  const pathName = path.join(__dirname, "../../frontend/build", "index.html");
  if (!fs.existsSync(pathName)) {
    log(`Path to frontend is not great.`);
    return res.status(404).send({ message: "Route was not found." });
  }
  log(`Path to frontend...`);
  res.sendFile(pathName);
});

function lg(req: Request): Language | undefined {
  const value = req.headers[lessonLanguageHeader];
  if (acceptedLanguages.some((a) => a === value)) {
    return value as Language;
  }
  return undefined;
}

const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}!`));

module.exports = app;
