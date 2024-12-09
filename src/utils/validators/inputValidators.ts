import { body } from "express-validator";

export const nameValidator = body("name")
  .trim()
  .notEmpty()
  .isLength({ min: 3, max: 30 });

export const ageValidator = body("age").trim().notEmpty().isNumeric();
