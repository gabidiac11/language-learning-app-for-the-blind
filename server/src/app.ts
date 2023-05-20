import dotenv = require("dotenv");
dotenv.config(); // TODO: see if this affects the build from react and its variables

import bodyParser from "body-parser";
import path from "path";
import express from "express";
import fs from "fs";
import diContainer from "./diContainer";
import { log } from "./logger";
import { executeActionAsync } from "./ApiSupport/apiActionHelpers";
import getControllers from "./ApiSupport/getControllers";
import Seeder from "./Data/Seed/Seeder";

if (process.env.ALLOW_SEED === "true") {
  (async () => {
    const seeder = (await diContainer.get("Seeder")) as Seeder;
    seeder.seedIfNeeded();
  })();
} else {
  log("No seed tried for this environment.");
}

// TODO:
// prioritize what message will pre-recorded for the user, some might not appear to him if the app is working from a good actor
// you can use the fallback text to speech for messages that might not apepar for the user that much if is not activetly messing with the API

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded());

app.use(
  express.static(
    path.join(
      __dirname,
      "../../front-end-lang-learning-app-for-the-blind/build"
    )
  )
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api/*", (req, res, next) => {
  log(`Started ${req.method?.toUpperCase()} ${req.originalUrl}`);
  next();
});

const [
  storiesControllerFactory,
  blocksControllerFactory,
  blockQuizControllerFactory,
  epilogueControllerFactory,
] = getControllers(diContainer);

// ENDPOINTS -> ### Stories
app.get("/api/userStories", async (req, res) => {
  const controller = storiesControllerFactory.create();
  await executeActionAsync(
    { req, res },
    controller.getStories.bind(controller)
  );
});
app.get("/api/userStories/:id", async (req, res) => {
  const controller = storiesControllerFactory.create();
  await executeActionAsync({ req, res }, controller.getStory.bind(controller));
});

// ENDPOINTS -> ### BLOCKS PROGRESS
app.get("/api/blocks/:blockProgressId", async (req, res) => {
  const controller = blocksControllerFactory.create();
  await executeActionAsync(
    { req, res },
    controller.getBlockProgress.bind(controller)
  );
});
app.post("/api/blocks/:blockProgressId/complete-summary", async (req, res) => {
  const controller = blocksControllerFactory.create();
  await executeActionAsync(
    { req, res },
    controller.completeSummary.bind(controller)
  );
});

// ENDPOINTS -> ### BLOCK QUIZ
app.post("/api/blocks/:blockProgressId/quiz", async (req, res) => {
  const controller = blockQuizControllerFactory.create();
  await executeActionAsync(
    { req, res },
    controller.getQuizQuestionAndAnswerPrevious.bind(controller)
  );
});
app.get(
  "/api/blocks/:blockProgressId/quiz/:quizId/completed",
  async (req, res) => {
    const controller = blockQuizControllerFactory.create();
    await executeActionAsync(
      { req, res },
      controller.getProgressAchievedOfCompletedQuiz.bind(controller)
    );
  }
);

// ENDPOINTS -> ### EPILOGUE
app.get(
  "/api/epilogues/:epilogueProgressId",
  async (req, res) => {
    const controller = epilogueControllerFactory.create();
    await executeActionAsync(
      { req, res },
      controller.getEpilogueProgress.bind(controller)
    );
  }
);

app.get("/api/*", (req, res) => {
  return res.status(404).send({ message: "Route not found." });
});

app.get("/*", function (req, res) {
  const pathName = path.join(
    __dirname,
    "../../front-end-lang-learning-app-for-the-blind/build",
    "index.html"
  );
  if (!fs.existsSync(pathName)) {
    log(`Path to frontend is not great.`);
    return res.status(404).send({ message: "Route not found." });
  }
  log(`Path to frontend...`);
  res.sendFile(pathName);
});

const port = process.env.ENV_NAME === "demo" ? 5001 : process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}!`));

module.exports = app;
