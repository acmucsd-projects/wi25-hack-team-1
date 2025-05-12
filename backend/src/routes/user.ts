import express, { NextFunction, Response } from "express";
import { RydeRequest, verifyAuthToken } from "../middleware/auth";
import { matchedData, validationResult } from "express-validator";

import User from "@/models/user";
import validationErrorParser from "@/utils/validationErrorParser";
import { createUserValidator } from "@/validators/user";

const router = express.Router();

/**
 * @api {get} /api/user/whoami
 *
 * Get the user's information
 *
 * @apiHeader {String} Authorization The user's auth token
 */
router.get(
  "/whoami",
  verifyAuthToken,
  async (req: RydeRequest, res: Response, next: NextFunction) => {
    try {
      const user = await User.findOne({ uid: req.userId });

      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      res.json(user);
    } catch (e) {
      next();
      console.log(e);
      res.status(400).json({ error: e });
    }
  },
);

/**
 * @api {post} /api/user/
 *
 * Create a new user
 *
 * @apiParam {String} firstName
 * @apiParam {String} lastName
 * @apiParam {String} uni
 * @apiParam {String} email
 * @apiParam {String} phoneNumber
 * @apiParam {String} gender
 * @apiParam {String} photoURL
 */
router.post(
  "/",
  verifyAuthToken,
  createUserValidator,
  async (req: RydeRequest, res: Response, next: NextFunction) => {
    // extract any errors that were found by the validator
    const errors = validationResult(req);

    console.log(req.body);

    try {
      // if there are errors, then this function throws an exception
      validationErrorParser(errors);

      const { firstName, lastName, uni, email, phone, gender, photoURL } =
        matchedData(req);

      const user = new User({
        uid: req.userId,
        firstName: firstName,
        lastName: lastName,
        uni: uni,
        email: email,
        phone: phone,
        gender: gender,
        photoURL: photoURL,
      });

      const newUser = await user.save();

      // 201 means a new resource has been created successfully
      // the newly created task is sent back to the user
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  },
);

export { router as userRouter };
