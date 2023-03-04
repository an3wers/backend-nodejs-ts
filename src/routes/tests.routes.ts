import express, { Request, Response } from "express";
import { DBType } from "../db/db";
import { HTTPS_STATUSES } from "../helpers/httpStatuses";

export const getTestsRoutes = (db: DBType) => {
  const router = express.Router()

  // testing
  router.delete("/data", (req: Request, res: Response) => {
    db.users = [];
    res.sendStatus(HTTPS_STATUSES.NO_CONTENT_204);
  });

  return router
};
