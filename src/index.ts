import express, { Request, Response } from "express";
import { UserQueryModel } from "./models/GetUsersQueryModel";
import { UserCreateModel } from "./models/UserCreateModel";
import { UserUpdateModel } from "./models/UserUpdateModel";
import { UserViewModel } from "./models/UserViewModel";
import {
  RequestWithBody,
  RequestWithParams,
  RequestWithParamsAndBody,
  RequestWithQuery,
} from "./types";

export const app = express();
const port = process.env.POSRT || 3002;

const jsonBody = express.json();
app.use(jsonBody);

type UserType = {
  id: number;
  name: string;
  age: number;
};

const getUserForView = (user: UserType): UserViewModel => {
  return {
    id: user.id,
    name: user.name
  }
}

const HTTPS_STATUSES = {
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204: 204,
  BAD_REQUEST_400: 400,
  NOT_FOUND_404: 404,
};

const db: { users: UserType[] } = {
  users: [
    { id: 1, name: "Eric", age: 32 },
    { id: 2, name: "Jhon", age: 27 },
    { id: 3, name: "Sam", age: 22 },
  ],
};

app.get(
  "/users",
  function (
    req: RequestWithQuery<UserQueryModel>,
    res: Response<UserViewModel[]>
  ) {
    let users = db.users;
    if (req.query.name) {
      users = db.users.filter((item) => item.name.indexOf(req.query.name) > -1);
    }
    res.json(
      users.map((user) => {
        return getUserForView(user)
      })
    );
  }
);

app.get(
  "/users/:id",
  (req: Request<{ id: string }>, res: Response<UserViewModel>) => {
    const foundUser = db.users.find((item) => item.id === +req.params.id);

    if (!foundUser) {
      res.sendStatus(HTTPS_STATUSES.NOT_FOUND_404);
      return;
    }
    res.json(getUserForView(foundUser));
  }
);

// Create user
app.post(
  "/users",
  (req: RequestWithBody<UserCreateModel>, res: Response<UserViewModel>) => {
    if (!req.body.name) {
      res.sendStatus(HTTPS_STATUSES.BAD_REQUEST_400);
      return;
    }
    const newUser = {
      id: +new Date(),
      name: req.body.name,
      age: req.body.age,
    };
    db.users.push(newUser);
    res.status(HTTPS_STATUSES.CREATED_201).json(getUserForView(newUser));
  }
);

app.delete("/users/:id", (req: RequestWithParams<{ id: string }>, res) => {
  if (!req.params.id) {
    res.sendStatus(HTTPS_STATUSES.BAD_REQUEST_400);
    return;
  }
  db.users = db.users.filter((item) => item.id !== +req.params.id);
  res.sendStatus(HTTPS_STATUSES.NO_CONTENT_204);
});

app.put(
  "/users/:id",
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

app.delete("/__test__/data", (req, res) => {
  db.users = [];
  res.sendStatus(HTTPS_STATUSES.NO_CONTENT_204);
});

app.listen(port, function () {
  console.log(`App listening on port ${port}!`);
});
