import express, { NextFunction, Response } from "express";
import { RydeRequest, verifyAuthToken } from "../middleware/auth";
import User from "../models/user";
import validationErrorParser from "@/utils/validationErrorParser";
import { validationResult } from "express-validator";

const router = express.Router();

router.get(
  "/whoami",
  verifyAuthToken,
  async (req: RydeRequest, res: Response, next: NextFunction) => {
    try {
      const user = await User.findOne({ firebaseUid: req.userId });
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.json(user);
      return;
    } catch (e) {
      next();
      console.log(e);
      res.status(400).json({ error: e });
      return;
    }
  },
);

router.post(
  "/",
  verifyAuthToken,
  async (req: RydeRequest, res: Response, next: NextFunction) => {
    // extract any errors that were found by the validator
    const errors = validationResult(req);
    const { name, uni, email, phoneNumber, gender } = req.body;

    try {
      // if there are errors, then this function throws an exception
      validationErrorParser(errors);

      const user = await User.create({
        name: name,
        uni: uni,
        email: email,
        phoneNumber: phoneNumber,
        gender: gender,
        uid: req.userId,
      });

      // 201 means a new resource has been created successfully
      // the newly created task is sent back to the user
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  },
);

export { router as userRouter };
