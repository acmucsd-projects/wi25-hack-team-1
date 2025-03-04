import { Request, Response, NextFunction } from "express";
import { firebaseAuth } from "@services/firebase";

export type LoginRequest = {
  userId?: string;
} & Request;

const verifyAuthToken = async (
  req: LoginRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  const token =
    authHeader && authHeader?.split(" ")[0] === "Bearer"
      ? authHeader.split(" ")[1]
      : null;
  if (!token) {
    res.status(401).json({ error: "Unauthorized: No token provided" });
    return;
  }

  let userInfo;
  try {
    userInfo = await firebaseAuth.verifyIdToken(token);
  } catch (e) {
    res.status(403).json({ error: "Invalid or expired token", e });
    return;
  }

  if (userInfo) {
    req.userId = userInfo.uid;
    next();
    return;
  }

  res.status(403).json({ error: "Invalid or expired token" });
  return;
};

export { verifyAuthToken };
