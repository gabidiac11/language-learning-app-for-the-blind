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
    const seeder = await diContainer.get("Seeder") as Seeder;
    seeder.seedIfNeeded();
  })();
} else {
  log("No seed tried for this environment.");
}

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
  log(`Started ${req.method?.toUpperCase()} /${req.url}`);
  next();
});

const [storiesController] = getControllers(diContainer);

app.get("/api/userStories", async (req, res) => {
  await executeActionAsync(
    { req, res },
    storiesController.getStories.bind(storiesController)
  );
});

app.get("/api/userStories/:id", async (req, res) => {
  await executeActionAsync(
    { req, res },
    storiesController.getStory.bind(storiesController)
  );
});

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
