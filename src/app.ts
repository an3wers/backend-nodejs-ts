import express from "express";
import { getUsersRoutes } from "./routes/user.routes";
import { getTestsRoutes } from "./routes/tests.routes";
import { getOrdersRoutes } from "./routes/order.routes";
import { db } from "./db/db";
import "dotenv/config";
// import bodyParser from 'body-parser'
export const app = express();

const jsonBody = express.json();
app.use(jsonBody);
// app.use(bodyParser())

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
const testsRoutes = getTestsRoutes(db);

app.use("/users", usersRoutes);
app.use("/orders", ordersRoutes);
app.use("/__test__", testsRoutes);
