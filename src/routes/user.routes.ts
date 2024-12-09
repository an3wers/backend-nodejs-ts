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
import { userRepository } from "../repositories/user.repository";
import { inputValidationMiddleware } from "../middleware/inputValidation.middleware";
import { ageValidator, nameValidator } from "../utils/validators/inputValidators";
import { usersService } from "../services/users.service";

/*
  Слой представления (Representation)
*/

export const getUsersRoutes = () => {
  const router = express.Router();

  router.get("/", function (req: RequestWithQuery<UserQueryModel>, res: Response<UserViewModel[]>) {
    const view = userRepository.findUsers(req.query?.name).map((user) => {
      return getUserForView(user);
    });
    res.json(view);
  });

  router.get("/:id", (req: Request<{ id: string }>, res: Response<UserViewModel>) => {
    const foundUser = userRepository.getUser(+req.params.id);

    if (!foundUser) {
      res.sendStatus(HTTPS_STATUSES.NOT_FOUND_404);
      return;
    }
    const view = getUserForView(foundUser);
    res.json(view);
  });

  // TODO: Поправить валидацию
  router.post(
    "/create",
    // nameValidator,
    // ageValidator,
    inputValidationMiddleware,
    async (req: RequestWithBody<UserCreateModel>, res: Response<UserViewModel>) => {
      await usersService.createUser({
        email: req.body.email,
        login: req.body.login,
        password: req.body.password,
      });

      res.status(HTTPS_STATUSES.CREATED_201).json();
    },
  );

  router.post("/login", inputValidationMiddleware, async (req: Request, res: Response) => {
    // TODO: Добавить реализацию

    const user = await usersService.checkCredentials({
      login: req.body.login,
      password: req.body.password,
    });

    if (user === null) {
      res.status(HTTPS_STATUSES.UNATHORIZED_401);
      return;
    }

    const userToken = await usersService.loginUser(user);

    res.status(HTTPS_STATUSES.OK_200).json(userToken);
  });

  router.delete("/:id", (req: RequestWithParams<{ id: string }>, res: Response) => {
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
  });

  // Chenge user props by id
  router.put(
    "/:id",
    (
      req: RequestWithParamsAndBody<{ id: string }, UserUpdateModel>,
      res: Response<UserViewModel>,
    ) => {
      if (!req.body.name || !req.body.age) {
        res.sendStatus(HTTPS_STATUSES.BAD_REQUEST_400);
        return;
      }

      const data = {
        id: +req.params.id,
        name: req.body.name,
        age: req.body.age,
      };
      const foundUser = userRepository.changeUser(data);

      if (!foundUser) {
        res.sendStatus(HTTPS_STATUSES.NOT_FOUND_404);
        return;
      }

      res.json(getUserForView(foundUser));
    },
  );

  return router;
};
