import { NextFunction, Request, Response } from "express";
import { HTTPS_STATUSES } from "../helpers/httpStatuses";
import { usersService } from "../services/users.service";
import { UserDbType } from "../repositories/types";

interface RequestWithUser extends Request {
  user: UserDbType;
}

export const authMiddleware = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    res.status(HTTPS_STATUSES.UNATHORIZED_401);
    return;
  }

  const token = req.headers.authorization.split(" ")[1];

  const user = await usersService.getUserInfo(token);

  if (user) {
    req.user = user;
    next();
  }
  res.status(HTTPS_STATUSES.UNATHORIZED_401);
  return;
};
