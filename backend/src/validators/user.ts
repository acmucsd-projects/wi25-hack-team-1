import { body } from "express-validator";

const firstNameValidator = body("firstName")
  .exists()
  .withMessage("firstName must exist")
  .isString()
  .withMessage("firstName must be a string");

const lastNameValidator = body("lastName")
  .exists()
  .withMessage("lastName must exist")
  .isString()
  .withMessage("lastName must be a string");

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
  firstNameValidator,
  lastNameValidator,
  uniValidator,
  emailValidator,
  phoneValidator,
  genderValidator,
];
