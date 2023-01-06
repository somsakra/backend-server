import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import userRoutes from "./routes/user";

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.use(morgan("dev"));

app.use("/user", userRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Not found");
  next(error);
});

app.use((error: Error, req: Request, res: Response) => {
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(port);
