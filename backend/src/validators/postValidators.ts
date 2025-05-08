import { body, param } from "express-validator";
import { Types } from "mongoose";

/**
 * Validation rules for creating or updating a post.
 * Ensures all required fields exist, are non-empty, and have the correct types.
 */
export const createPostRules = [
  body("flightDay")
    .exists({ checkFalsy: true })
    .withMessage("flightDay is required")
    .isISO8601()
    .withMessage("flightDay must be a valid ISO date")
    .toDate(),

  body("time")
    .exists({ checkFalsy: true })
    .withMessage("time is required")
    .isISO8601()
    .withMessage("time must be a valid ISO date")
    .toDate(),

  body("airport")
    .exists({ checkFalsy: true })
    .withMessage("airport is required")
    .isString()
    .withMessage("airport must be a string")
    .trim()
    .notEmpty()
    .withMessage("airport cannot be empty"),

  body("luggage.carryOn")
    .exists()
    .withMessage("carryOn is required")
    .isInt({ min: 0 })
    .withMessage("carryOn must be a non-negative integer"),

  body("luggage.checked")
    .exists()
    .withMessage("checked is required")
    .isInt({ min: 0 })
    .withMessage("checked must be a non-negative integer"),

  body("numPassengers")
    .exists()
    .withMessage("numPassengers is required")
    .isInt({ min: 1 })
    .withMessage("numPassengers must be at least 1"),
];

/**
 * Validation rule for ensuring `:id` route param is a valid MongoDB ObjectId.
 */
export const postIdParam = [
  param("id")
    .custom((value) => Types.ObjectId.isValid(value))
    .withMessage("Invalid post ID format"),
];
