import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./database";
import env from "./utils/validateEnv";
import cors = require("cors");

dotenv.config();

const app: Express = express();
const port = env.PORT || 3000;

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Some Server");
});

connectDB();

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
