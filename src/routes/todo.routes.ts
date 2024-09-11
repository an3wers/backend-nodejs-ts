import express from "express";
import { HTTPS_STATUSES } from "../helpers/httpStatuses";
import { todosService } from "../services/todos.service";

export const getTodosRoutes = () => {
  const {
    OK_200,
    CREATED_201,
    NOT_FOUND_404,
    BAD_REQUEST_400,
    NO_CONTENT_204,
  } = HTTPS_STATUSES;

  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      const page = Number(req.query.page?.toString()) || 1;
      const limit = Number(req.query.limit?.toString()) || 10;
      const sortBy = (req.query.sortBy as string) || "date";
      const orderBy = (req.query.orderBy as string) || "asc";

      const data = await todosService.getTodos({
        page,
        limit,
        sortBy,
        orderBy,
      });
      res.status(OK_200).json({ data });
    } catch (error) {
      res
        .status(BAD_REQUEST_400)
        .json({ error: JSON.stringify((error as Error).message) });
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const data = await todosService.getTodo(+id);

      if (!data) {
        res.status(NOT_FOUND_404).json({ error: "Not found" });
        return;
      }

      res.status(OK_200).json({ data });
    } catch (error) {
      res
        .status(BAD_REQUEST_400)
        .json({ error: JSON.stringify((error as Error).message) });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const { title } = req.body;
      const data = await todosService.createTodo({ title });
      res.status(CREATED_201).json({ data });
    } catch (error) {
      res
        .status(BAD_REQUEST_400)
        .json({ error: JSON.stringify((error as Error).message) });
    }
  });

  router.patch("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const data = await todosService.completeTodo(+id);

      if (data.matchedCount === 0) {
        res.status(NOT_FOUND_404).json({ error: "Not found" });
        return;
      }

      res.status(OK_200).json({ data });
    } catch (error) {
      res
        .status(BAD_REQUEST_400)
        .json({ error: JSON.stringify((error as Error).message) });
    }
  });
  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const data = await todosService.deleteTodo(+id);

      if (data.deletedCount === 0) {
        res.status(NOT_FOUND_404).json({ error: "Not found" });
        return;
      }

      res.status(NO_CONTENT_204).json({ data });
    } catch (error) {
      res
        .status(BAD_REQUEST_400)
        .json({ error: JSON.stringify((error as Error).message) });
    }
  });

  return router;
};
