import express, { NextFunction, Response } from "express";
import { RydeRequest, verifyAuthToken } from "../middleware/auth";
import { Types } from "mongoose";

import Post from "@/models/post";
import { createPostRules, postIdParam } from "@/validators/postValidators";
import validateRequest from "@/utils/validateRequest";

const router = express.Router();

/**
 * @api {post} /api/post
 * Create a new post
 * @apiHeader {String} Authorization The user's auth token
 * @apiBody {Date} flightDay The date of the flight
 * @apiBody {Date} time The desired time to be at the airport
 * @apiBody {String} airport The airport name or code
 * @apiBody {Object} luggage Luggage details (carryOn and checked)
 * @apiBody {Number} numPassengers Total capacity of the ride
 * @apiSuccess {Object} post The newly created post
 */
router.post(
  "/",
  verifyAuthToken,
  createPostRules,
  validateRequest,
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

/**
 * @api {get} /api/post/:id
 *
 * Get a post by ID
 *
 * @apiHeader {String} Authorization The user's auth token
 * @apiParam {String} id Post ID
 */
router.get(
  "/:id",
  verifyAuthToken,
  postIdParam,
  validateRequest,
  async (req: RydeRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: "Invalid post ID" });
      return;
    }

    try {
      const post = await Post.findById(id)
        .populate("creatorId", "firstName lastName uni email")
        .populate("passengers", "firstName lastName");

      if (!post) {
        res.status(404).json({ error: "Post not found" });
        return;
      }

      res.json(post);
    } catch (err) {
      console.error("Error fetching post:", err);
      next(err);
    }
  },
);

export { router as postRouter };
