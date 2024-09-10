import express from "express";
import { getUsersRoutes } from "./routes/user.routes";
// import { getTestsRoutes } from "./routes/tests.routes";
import { getOrdersRoutes } from "./routes/order.routes";
// import { db } from "./db/db";

import { getTodosRoutes } from "./routes/todo.routes";

export const app = express();

const jsonBody = express.json();

app.use(jsonBody);

// Старт базы данных перенес в index.ts
// mongoose connection

// mongoose
//   .connect(process.env.MONGODB_URI as string, {})
//   .then(() => {
//     console.log("MongoDB connected");
//   })
//   .catch((err) => {
//     console.log("MongoDB connection error", err);
//   });

// Using database
// const client = new Client(getDbConfig() as ClientConfig);
// client.connect();

// client
//   .query("SELECT NOW()")
//   .then((res) => {
//     console.log(res.rows);
//     client.end();
//   })
//   .catch((err) => {
//     console.log("error", err);
//   });

const usersRoutes = getUsersRoutes();
const ordersRoutes = getOrdersRoutes();
const todosRoutes = getTodosRoutes();
// const testsRoutes = getTestsRoutes(db);

app.use("/users", usersRoutes);
app.use("/orders", ordersRoutes);
app.use("/todos", todosRoutes);
// app.use("/__test__", testsRoutes);
