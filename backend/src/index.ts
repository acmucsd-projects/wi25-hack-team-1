import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./database";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Our Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

connectDB();
