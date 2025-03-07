import { Result, ValidationError } from "express-validator";
import createHttpError from "http-errors";

/**
 * Parses through errors thrown by validator (if any exist). Error messages are
 * added to a string and that string is used as the error message for the HTTP
 * error.
 *
 * @param errors the validation result provided by express validator middleware
 */
const validationErrorParser = (errors: Result<ValidationError>) => {
  if (!errors.isEmpty()) {
    // trim removes the trailing space created in the for loop
    throw createHttpError(400, errors.array()[0].msg.trim());
  }
};

export default validationErrorParser;
