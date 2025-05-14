import { body } from "express-validator";

const nameValidator = body("name")
  .exists()
  .withMessage("name must exist")
  .isString()
  .withMessage("name must be a string");

const uniValidator = body("uni")
  .optional()
  .isString()
  // Probably some check to make sure it is a valid uni
  .withMessage("uni must be a string");

const emailValidator = body("email")
  .exists()
  .withMessage("email must exist")
  .isEmail()
  .withMessage("email must be a valid email");

const phoneValidator = body("phone")
  .exists()
  .withMessage("phone must exist")
  .isMobilePhone("en-US")
  .withMessage("phone must be a valid phone number");

const genderValidator = body("gender")
  .exists()
  .withMessage("gender must exist")
  .isString()
  .withMessage("gender must be a string");

// establishes a set of rules that the body of the task creation route must follow
export const createUserValidator = [
  nameValidator,
  uniValidator,
  emailValidator,
  phoneValidator,
  genderValidator,
];
