import EventEmitter from "events";

export const myEmitter = new EventEmitter();

function dbConection() {
  console.log("DB connected");
}

myEmitter.addListener("dbConection", dbConection);

myEmitter.emit("dbConection");

// Улаоение событий

myEmitter.removeListener("dbConection", dbConection);
myEmitter.off("dbConection", dbConection);
myEmitter.removeAllListeners("dbConection");

// Emitter with param

function sandMessage(message: string) {
  console.log(message);
}

myEmitter.on("message", sandMessage);

myEmitter.emit("message", "Hello world");

// once

myEmitter.once("once", (message: string) => {
  console.log(message);
});

myEmitter.emit("once", "Hello world once");

//  max listeners
myEmitter.setMaxListeners(6);
console.log(myEmitter.getMaxListeners());

// Обработка ошибок

myEmitter.on("error", (error: Error) => {
  console.error(error.message);
});

myEmitter.emit("error", new Error("Something went wrong"));

// Event Target

const myTarget = new EventTarget();

myTarget.addEventListener("targetMessage", (event: Event) => {
  console.log(event.type);
});

myTarget.dispatchEvent(new Event("targetMessage"));
