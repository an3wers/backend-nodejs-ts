import express from "express";
import { getUsersRoutes } from "./routes/user.routes";
import { getTestsRoutes } from "./routes/tests.routes";
import { db } from "./db/db";

export const app = express();

const jsonBody = express.json();
app.use(jsonBody);

const usersRoutes = getUsersRoutes(db);

const testsRoutes = getTestsRoutes(db);

app.use("/users", usersRoutes);
app.use("/__test__", testsRoutes);
