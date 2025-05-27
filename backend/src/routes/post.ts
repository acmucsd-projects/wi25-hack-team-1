import express, { NextFunction, Response } from "express";
import { matchedData } from "express-validator";
import { RydeRequest, verifyAuthToken } from "../middleware/auth";
import { Types } from "mongoose";

import Post from "@/models/post";
import User from "@/models/user";
import {
  createPostRules,
  postIdParam,
  updatePostRules,
} from "@/validators/postValidators";
import validateRequest from "@/utils/validateRequest";
import user from "@/models/user";

const router = express.Router();

/* ---------- PUT /api/post/:id (update) ---------- */
router.put(
  "/:id",
  verifyAuthToken,
  postIdParam,
  updatePostRules,
  validateRequest,
  async (
    req: RydeRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;

      // keep only validated fields
      const updates = matchedData(req, { locations: ["body"] });

      const updated = await Post.findOneAndUpdate(
        { _id: id, creator: req.userId }, // Ensure the user is the creator
        { $set: updates },
        { new: true, runValidators: true },
      );

      if (!updated) {
        res
          .status(404)
          .json({ error: "Post not found or you are not the owner" });
        return; // <-- NO Response object returned
      }

      res.json(updated); // ← also not returned, just sent
    } catch (err) {
      next(err);
    }
  },
);

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

      const foundUser = await user
        .findOne({
          uid: req.userId,
        })
        .exec();

      if (!foundUser) {
        res.status(404).json({ error: "User not found" });
      const user = await User.findOne({ uid: req.userId });

      if (!user || !["Male", "Female", "Other"].includes(user.gender)) {
        res.status(400).json({ error: "Invalid" }); // 👈 don't return
        return;
      }

      const post = new Post({
        creator: user._id,
        creatorGender: user.gender,
        flightDay,
        time,
        airport,
        luggage,
        numPassengers,
        passengers: [],
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
        .populate("creator", "name uni email")
        .populate("passengers", "name");

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

/**
 * @api {get} /api/post/
 *
 * Get all posts
 */
router.get(
  "/",
  validateRequest,
  async (req: RydeRequest, res: Response, next: NextFunction) => {
    try {
      const { airport, gender, date, sort } = req.query;

      const filters: Record<string, unknown> = {};

      // Airport
      if (airport) {
        filters.airport = airport;
      }

      // Date = exact day (midnight to midnight)
      if (date) {
        const start = new Date(date as string);
        const end = new Date(start);
        end.setDate(start.getDate() + 1);

        filters.flightDay = {
          $gte: start,
          $lt: end,
        };
      }

      // Gender filter
      if (gender) {
        const genderArray = Array.isArray(gender) ? gender : [gender];
        filters.creatorGender = { $in: genderArray };
      }

      // Build query
      let query = Post.find(filters)
        .populate("creator", "name uni email gender")
        .populate("passengers", "name");

      // Time sort
      if (sort === "asc" || sort === "desc") {
        query = query.sort({
          flightDay: sort === "asc" ? 1 : -1,
          time: sort === "asc" ? 1 : -1,
        });
      }

      const posts = await query.exec();
      res.json(posts);
    } catch (err) {
      console.error("Error fetching filtered posts:", err);
      next(err);
    }
  },
);

/**
 * @api {delete} /api/post/:id
 * Delete a post by ID (creator only)
 * @apiHeader {String} Authorization The user's auth token
 * @apiParam {String} id Post ID
 */
router.delete(
  "/:id",
  verifyAuthToken,
  postIdParam,
  validateRequest,
  async (req: RydeRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const deleted = await Post.findOneAndDelete({
        _id: id,
        creator: req.userId,
      });

      if (!deleted) {
        res
          .status(404)
          .json({ error: "Post not found or you are not the owner" });
        return;
      }

      res.status(204).send(); // No content
    } catch (err) {
      console.error("Error deleting post:", err);
      next(err);
    }
  },
);

export { router as postRouter };
