import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { HTTPS_STATUSES } from "../helpers/httpStatuses";

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const result = validationResult(req);
      if (!result.isEmpty()) {
       return res
          .status(HTTPS_STATUSES.BAD_REQUEST_400)
          .json({ errors: result.array() });
      } else {
        next()
      }
} 
