import express, { request, response, NextFunction } from "express";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log(process.env.NAME);
  res.status(200).json({
    message: "OK",
  });
});

app.use((req, res, next) => {
  const error = new Error("Not found");
  next(error);
});

app.use((req, res, next) => {
  console.log(req.errored);
});

app.listen(port);
