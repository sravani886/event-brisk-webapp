import http from "http";
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import logger from "./util/logger";
import config from "./config";
import Middlewares from "./api/middlewares";
import Authentication from "./api/authentication";

import UserRouter from "./user/router";
import VenueRouter from "./venue/router";
import EventRouter from "./event/router";

import { VenueModel } from "./venue/models";
import middlewares from "./api/middlewares";
if (!process.env.JWT_SECRET) {
  const err = new Error("No JWT_SECRET in env variable");
  logger.warn(err.message);
}

const app = express();

console.log(config.mongoose.uri);
mongoose
  .connect(config.mongoose.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.error(err));

mongoose.Promise = global.Promise;

// App Setup
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3000"],
  })
);
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false }));

app.get("/ping", (req, res) => res.send("pong"));
app.get("/", (req, res) => res.json({ source: "http://localhost:3000" }));
app.post("/signup", Authentication.signup);
app.post("/signin", Authentication.signin);
app.get("/auth-ping", Middlewares.loginRequired, (req, res) =>
  res.send("connected")
);

app.use("/user", Middlewares.loginRequired, UserRouter);
app.use("/venue", Middlewares.loginRequired, VenueRouter);
app.use("/event", middlewares.loginRequired, EventRouter);

app.use("/ba-dum-tss", (req, res) => {
  const venue = VenueModel.find({}, (err, venues) => {
    if (err || !venues)
      return res.status(401).send(err || { err: "Nothing Found" });
    if (venues) return res.json(venues);
  });
});

app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(422).json(err.message);
});

// Server Setup
const port = process.env.PORT || 8000;
http.createServer(app).listen(port, () => {
  logger.info(`Server listening on: ${port}`);
});
