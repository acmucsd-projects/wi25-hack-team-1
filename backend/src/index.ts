import "dotenv/config";
import "module-alias/register";
import express, { Express, NextFunction, Request, Response } from "express";

import connectDB from "@/services/database";
import env from "@/utils/validateEnv";
import cors from "cors";
import { userRouter } from "@/routes/user";
import { postRouter } from "@/routes/post";
import { isHttpError } from "http-errors";

const app: Express = express();
const port = env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Define Routes
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

/**
 * Error handler; all errors thrown by server are handled here.
 * Explicit typings required here because TypeScript cannot infer the argument types.
 *
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);

  // 500 is the "internal server error" error code, this will be our fallback
  let statusCode = 500;
  let errorMessage = "An error has occurred.";

  // check is necessary because anything can be thrown, type is not guaranteed
  if (isHttpError(error)) {
    // error.status is unique to the http error class, it allows us to pass status codes with errors
    statusCode = error.status;
    errorMessage = error.message;
  }
  // prefer custom http errors but if they don't exist, fallback to default
  else if (error instanceof Error) {
    errorMessage = error.message;
  }

  res.status(statusCode).json({ error: errorMessage });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);

  connectDB();
});
