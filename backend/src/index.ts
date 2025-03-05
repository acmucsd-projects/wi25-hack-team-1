import "dotenv/config";
import "module-alias/register";
import express, { Express, Request, Response } from "express";

import connectDB from "./services/database";
import env from "./utils/validateEnv";
import cors from "cors";
import { userRouter } from "@/routes/user";

const app: Express = express();
const port = env.PORT || 3000;

app.use(cors());

app.use("/api/user", userRouter);

connectDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Some Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
