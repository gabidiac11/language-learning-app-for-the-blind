import dotenv from "dotenv";
dotenv.config(); // TODO: see if this affects the build from react and its variables

import bodyParser from "body-parser";
import path from "path";
import express from "express";
import fs from "fs";
import diContainer from "./diContainer";
import { log } from "./logger";
import { executeAuthenticatedAction } from "./ApiSupport/apiActionHelpers";
import getControllers from "./ApiSupport/getControllers";
import Seeder from "./Data/Seed/Seeder";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

if (process.env.ALLOW_SEED === "true") {
  (async () => {
    const seeder = (await diContainer.get("Seeder")) as Seeder;
    seeder.seedIfNeeded();
  })();
} else {
  log("No seed tried for this environment.");
}

/**
 * TODO:
 * - adaugat swagger
 * - explicatii swagger
 * - actualizat documentatia
 */

// TODO:
// prioritize what message will pre-recorded for the user, some might not appear to him if the app is working from a good actor
// you can use the fallback text to speech for messages that might not apepar for the user that much if is not activetly messing with the API

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
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
    customCss: `
      .swagger-ui .opblock-tag {
        display: block!important;
      }
    `,
    customSiteTitle: "Swagger - API Language Learning App"
  })
);

// TODO: move endpoints to a file
const [
  storiesControllerFactory,
  blocksControllerFactory,
  blockQuizControllerFactory,
  epilogueControllerFactory,
  epilogueQuizServiceFactory,
] = getControllers(diContainer);

// ENDPOINTS -> ### Stories
app.get("/api/userStories", async (req, res) => {
  const controller = storiesControllerFactory.create();
  const action = () => controller.getStories();
  await executeAuthenticatedAction({ req, res, controller }, action);
});
app.get("/api/userStories/:id", async (req, res) => {
  const controller = storiesControllerFactory.create();
  const [id] = controller.getParams(req, ["id"]);
  const action = () => controller.getStory(id);
  await executeAuthenticatedAction({ req, res, controller }, action);
});

// ENDPOINTS -> ### BLOCKS PROGRESS
app.get("/api/blocks/:blockProgressId", async (req, res) => {
  const controller = blocksControllerFactory.create();
  const [blockProgressId] = controller.getParams(req, ["blockProgressId"]);
  const action = () =>
    controller.getBlockProgress(blockProgressId);
  await executeAuthenticatedAction({ req, res, controller }, action);
});
app.post("/api/blocks/:blockProgressId/complete-summary", async (req, res) => {
  const controller = blocksControllerFactory.create();
  const [blockProgressId] = controller.getParams(req, ["blockProgressId"]);
  const action = () =>
    controller.completeSummary(blockProgressId);
  await executeAuthenticatedAction({ req, res, controller }, action);
});

// ENDPOINTS -> ### BLOCK QUIZ
app.post("/api/blocks/:blockProgressId/quiz/request-question", async (req, res) => {
  const controller = blockQuizControllerFactory.create();
  const [blockProgressId] = controller.getParams(req, ["blockProgressId"]);
  const action = () =>
    controller.requestQuizQuestion(
      blockProgressId
    );
  await executeAuthenticatedAction({ req, res, controller }, action);
});

app.post("/api/blocks/:blockProgressId/quiz/answer-question", async (req, res) => {
  const controller = blockQuizControllerFactory.create();
  const [blockProgressId] = controller.getParams(req, ["blockProgressId"]);
  const action = () =>
    controller.answerQuizQuestion(
      req.body,
      blockProgressId
    );
  await executeAuthenticatedAction({ req, res, controller }, action);
});
app.get(
  "/api/blocks/:blockProgressId/quiz/:quizId/completed",
  async (req, res) => {
    const controller = blockQuizControllerFactory.create();
    const [blockProgressId, quizId] = controller.getParams(req, [
      "blockProgressId",
      "quizId",
    ]);
    const action = () =>
      controller.getProgressAchievedOfCompletedQuiz(
        blockProgressId,
        quizId
      );
    await executeAuthenticatedAction({ req, res, controller }, action);
  }
);

// ENDPOINTS -> ### EPILOGUE
app.get("/api/epilogues/:epilogueProgressId", async (req, res) => {
  const controller = epilogueControllerFactory.create();
  const [epilogueProgressId] = controller.getParams(req, [
    "epilogueProgressId",
  ]);
  const action = () =>
    controller.getEpilogueProgress(epilogueProgressId);

  await executeAuthenticatedAction({ req, res, controller }, action);
});

app.post(
  "/api/epilogues/:epilogueProgressId/complete-summary",
  async (req, res) => {
    const controller = epilogueControllerFactory.create();
    const [epilogueProgressId] = controller.getParams(req, [
      "epilogueProgressId",
    ]);
    const action = () =>
      controller.completeSummary(epilogueProgressId);

    await executeAuthenticatedAction({ req, res, controller }, action);
  }
);

// ENDPOINTS -> ### EPILOGUE QUIZ
app.post("/api/epilogues/:epilogueProgressId/quiz/request-question", async (req, res) => {
  const controller = epilogueQuizServiceFactory.create();
  const [epilogueProgressId] = controller.getParams(req, [
    "epilogueProgressId",
  ]);
  const action = () =>
    controller.requestQuizQuestion(
      epilogueProgressId
    );

  await executeAuthenticatedAction({ req, res, controller }, action);
});
app.post("/api/epilogues/:epilogueProgressId/quiz/answer-question", async (req, res) => {
  const controller = epilogueQuizServiceFactory.create();
  const [epilogueProgressId] = controller.getParams(req, [
    "epilogueProgressId",
  ]);
  const action = () =>
    controller.answerQuizQuestion(
      req.body,
      epilogueProgressId
    );

  await executeAuthenticatedAction({ req, res, controller }, action);
});
app.get(
  "/api/epilogues/:epilogueProgressId/quiz/:quizId/completed",
  async (req, res) => {
    const controller = epilogueQuizServiceFactory.create();
    const [epilogueProgressId, quizId] = controller.getParams(req, [
      "epilogueProgressId",
      "quizId",
    ]);
    const action = () =>
      controller.getProgressAchievedOfCompletedQuiz(
        epilogueProgressId,
        quizId
      );

    await executeAuthenticatedAction({ req, res, controller }, action);
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

app.get("/*", function (req, res) {
  const pathName = path.join(__dirname, "../../frontend/build", "index.html");
  if (!fs.existsSync(pathName)) {
    log(`Path to frontend is not great.`);
    return res.status(404).send({ message: "Route was not found." });
  }
  log(`Path to frontend...`);
  res.sendFile(pathName);
});

const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}!`));

module.exports = app;
