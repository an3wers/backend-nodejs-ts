import express, { Request, Response } from "express";
import { HTTPS_STATUSES } from "../helpers/httpStatuses";
import { UserViewModel } from "../models/UserViewModel";
import {
  RequestWithBody,
  RequestWithParams,
  RequestWithParamsAndBody,
  RequestWithQuery,
} from "../types";

import { UserQueryModel } from "../models/GetUsersQueryModel";
import { UserCreateModel } from "../models/UserCreateModel";
import { UserUpdateModel } from "../models/UserUpdateModel";
import { getUserForView } from "../helpers/getUserForView";
import { DBType } from "../db/db";
import UserRepository from "../repositories/user.repository";

/*
  Слой представления (Representation)
*/

// TODO Убрать db из передаваемого параметра
export const getUsersRoutes = (db: DBType) => {
  const router = express.Router();
  const userRepository = new UserRepository();

  router.get(
    "/",
    function (
      req: RequestWithQuery<UserQueryModel>,
      res: Response<UserViewModel[]>
    ) {
      const view = userRepository.findUsers(req.query?.name).map((user) => {
        return getUserForView(user);
      });
      res.json(view);
    }
  );

  router.get(
    "/:id",
    (req: Request<{ id: string }>, res: Response<UserViewModel>) => {
      const foundUser = userRepository.getUser(+req.params.id);

      if (!foundUser) {
        res.sendStatus(HTTPS_STATUSES.NOT_FOUND_404);
        return;
      }
      const view = getUserForView(foundUser);
      res.json(view);
    }
  );

  // Create user
  router.post(
    "/",
    (req: RequestWithBody<UserCreateModel>, res: Response<UserViewModel>) => {
      if (!req.body.name) {
        res.sendStatus(HTTPS_STATUSES.BAD_REQUEST_400);
        return;
      }

      const newUser = userRepository.createUser({
        name: req.body.name,
        age: req.body.age,
      });

      res.status(HTTPS_STATUSES.CREATED_201).json(getUserForView(newUser));
    }
  );

  router.delete(
    "/:id",
    (req: RequestWithParams<{ id: string }>, res: Response) => {
      if (!req.params.id) {
        res.sendStatus(HTTPS_STATUSES.BAD_REQUEST_400);
        return;
      }
      const result = userRepository.deleteUser(+req.params.id);
      if (result) {
        res.sendStatus(HTTPS_STATUSES.NO_CONTENT_204);
      } else {
        res.sendStatus(HTTPS_STATUSES.NOT_FOUND_404);
      }
    }
  );

  // Chenge user props by id
  router.put(
    "/:id",
    (
      req: RequestWithParamsAndBody<{ id: string }, UserUpdateModel>,
      res: Response<UserViewModel>
    ) => {
      const foundUser = db.users.find((item) => item.id === +req.params.id);
      if (!foundUser) {
        res.sendStatus(HTTPS_STATUSES.NOT_FOUND_404);
        return;
      }
      if (!req.body.name || !req.body.age) {
        res.sendStatus(HTTPS_STATUSES.BAD_REQUEST_400);
        return;
      }
      if (req.body.name) {
        foundUser.name = req.body.name;
      }
      if (req.body.age) {
        foundUser.age = req.body.age;
      }
      res.json(getUserForView(foundUser));
    }
  );

  return router;
};
