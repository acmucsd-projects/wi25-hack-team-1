import { validationResult } from "express-validator";
import type { Request, Response, NextFunction } from "express";

/**
 * Middleware that checks express-validator results and sends 400 if validation fails.
 * Works with strict TypeScript by returning `void` explicitly.
 */
function validateRequest(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  return next(); // this tells TS the function always returns void
}

export default validateRequest;
