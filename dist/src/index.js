"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
const port = 3002;
const jsonBody = express_1.default.json();
exports.app.use(jsonBody);
const HTTPS_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404,
};
const db = {
    users: [
        { id: 1, name: "Eric" },
        { id: 2, name: "Jhon" },
        { id: 3, name: "Sam" },
    ],
};
exports.app.get("/users", function (req, res) {
    let users = db.users;
    if (req.query.name) {
        users = db.users.filter((item) => item.name.indexOf(req.query.name) > -1);
    }
    res.json(users);
});
exports.app.get("/users/:id", (req, res) => {
    const foundUser = db.users.find((item) => item.id === +req.params.id);
    if (!foundUser) {
        res.sendStatus(HTTPS_STATUSES.NOT_FOUND_404);
        return;
    }
    res.json(foundUser);
});
exports.app.post("/users", (req, res) => {
    if (!req.body.name) {
        res.sendStatus(HTTPS_STATUSES.BAD_REQUEST_400);
        return;
    }
    const newUser = {
        id: +new Date(),
        name: req.body.name,
    };
    db.users.push(newUser);
    res.status(HTTPS_STATUSES.CREATED_201).json(newUser);
});
exports.app.delete("/users/:id", (req, res) => {
    if (!req.params.id) {
        res.sendStatus(HTTPS_STATUSES.BAD_REQUEST_400);
        return;
    }
    db.users = db.users.filter((item) => item.id !== +req.params.id);
    res.sendStatus(HTTPS_STATUSES.NO_CONTENT_204);
});
exports.app.put("/users/:id", (req, res) => {
    const foundUser = db.users.find((item) => item.id === +req.params.id);
    if (!foundUser) {
        res.sendStatus(HTTPS_STATUSES.NOT_FOUND_404);
        return;
    }
    if (!req.body.name) {
        res.sendStatus(HTTPS_STATUSES.BAD_REQUEST_400);
        return;
    }
    foundUser.name = req.body.name;
    res.json(foundUser);
});
exports.app.listen(port, function () {
    console.log(`App listening on port ${port}!`);
});
