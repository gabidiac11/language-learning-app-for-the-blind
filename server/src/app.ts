require("dotenv").config();

import bodyParser from "body-parser";
import path from "path";
import express, { Response, Request } from "express";
import fs from "fs";
import diContainer from "./diContainer";
import Seeder from "./Data/Seed/Seeder";
import { log } from "./logger";
import { config } from "dotenv";
import Result from "./Controllers/Result";
import UserStoriesController from "./Controllers/StoriesController";
import Authenticator from "./BusinessLogic/AuthenticatorMiddleware";
import { UserStory } from "./Data/ctx.userStory.types";

// TODO: uncomment
// (async () => {
//   /**
//    * @type {Seeder}
//    */
//   const seeder = await diContainer.get("Seeder");
//   seeder.seedIfNeeded();
// })();

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded());

app.use(
  express.static(
    path.join(__dirname, "../../front-end-lang-learning-app-for-the-blind/build")
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

const storiesController = diContainer.get(
  UserStoriesController.name
) as UserStoriesController;
const authenticator = diContainer.get(Authenticator.name) as Authenticator;

app.get("/api/userStories", async (req, res) => {
  const authResult = await authenticator.isAuth(req);
  if (authResult.isError()) {
    return processResultOfT(authResult, req, res);
  }
  const result = await storiesController.getStories(authResult.data);
  return processResultOfT<UserStory[]>(result, req, res);
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
    return res.status(404).send({ message: "Route not found." });
  }
  res.sendFile(pathName);
});

const port = process.env.ENV_NAME === "demo" ? 5001 : process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}!`));


function processResultOfT<T>(result: Result<T>, req: Request, res: Response) {
  let statusCode = 0;
  let data: any;

  if (result.isError()) {
    statusCode = result.statusCode ?? 400;
    data = result.errors
      ? { messages: result.errors }
      : { messages: ["Something went wrong."] };
  } else {
    statusCode = result.statusCode ?? 200;
    data = result.data ?? {};
  }

  log(
    `Finished [${statusCode}] at [${req.url}] with result ${JSON.stringify(
      data
    ).slice(0, 100)}`
  );
  return res.status(statusCode).send(data);
}

module.exports = app;
