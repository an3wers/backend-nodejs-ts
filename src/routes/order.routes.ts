import express from "express";
import orderRespository from "../repositories/order.respository";
import { HTTPS_STATUSES } from "../helpers/httpStatuses";

export const getOrdersRoutes = () => {
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      const data = await orderRespository.getAll();
      res.status(HTTPS_STATUSES.OK_200).json({ data: data.rows });
    } catch (error) {
      res.sendStatus(HTTPS_STATUSES.BAD_REQUEST_400);
    }
  });

  return router;
};
