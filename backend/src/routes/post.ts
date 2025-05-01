import express, { NextFunction, Response } from "express";
import { RydeRequest, verifyAuthToken } from "../middleware/auth";
import { matchedData, validationResult } from "express-validator";

import Post from "@/models/post";
import validationErrorParser from "@/utils/validationErrorParser";

const router = express.Router();

router.post(
  "/",
  verifyAuthToken,
  async (req: RydeRequest, res: Response, next: NextFunction) => {
    try {
      const { flightDay, time, airport, luggage, numPassengers } = req.body;

      const post = new Post({
        creatorId: req.userId, // Authenticated user's ID
        flightDay,
        time,
        airport,
        luggage,
        numPassengers,
        passengers: [], // Start with an empty passengers array
      });

      const newPost = await post.save();
      res.status(201).json(newPost);
    } catch (error) {
      next(error);
    }
  },
);

export { router as postRouter };
