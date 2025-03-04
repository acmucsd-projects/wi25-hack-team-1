import express, { NextFunction, Response } from "express";

import { LoginRequest, verifyAuthToken } from "../middleware/auth";
import User from "../models/user";

const router = express.Router();

router.get(
  "/api/whoami",
  verifyAuthToken,
  async (req: LoginRequest, res: Response, next: NextFunction) => {
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

export { router as userRouter };
