import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "@services/database";
import env from "@utils/validateEnv";
import cors from "cors";

const app: Express = express();
const port = env.PORT || 3000;

app.use(cors());

connectDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Some Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
