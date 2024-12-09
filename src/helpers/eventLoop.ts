import fs from "fs";
/*
  event loop: requeset -> v8 + nodejs bindings -> event queue -> callstack -> (worker threads -> cb to event queue) or event loop new loop

  Основные фазы Event Loop:

    Таймеры: Проверка и выполнение обратных вызовов (callbacks) для таймеров, время которых истекло.
    Pending Callbacks: Выполнение коллбеков от системных операций.
    Idle, Prepare: Внутренняя фаза, не имеет отношения к разработчику.
    Обработка Input/Output: Основная фаза для событий пользователей и системы, касающаяся ввода-вывода. Не является непрерывной из-за расчета времени и количества обработанных запросов.
    Check: Выполнение операций, запланированных через setImmediate.
    Close Callbacks: Обработка коллбеков закрывающих событий, например, прерывание соединения с сокетами.

Дополнительные процессы:

    Process Next Tick: Запланированные на следующий тик коллбеки.
    Microtask Queue: Очередь микрозадач, например, промисы.

Полный цикл работы Event Loop:

    Инициализация: Выполнение синхронного кода, регистрация обратных вызовов.
    Проход по основным фазам Event Loop: Включая проверку задач на выполнение.
    Проверка завершения: Если нет активных задач, процесс завершается. В противном случае начинается следующий цикл Event Loop.

Ключевые моменты:

    Важность оптимизации тяжелых операций для предотвращения блокирования Event Loop.
    Механизмы такие как setImmediate, Process Next Tick, и Microtask Queue предоставляют дополнительные возможности планирования выполнения кода.
   

  */

const init = performance.now();
// #1
console.log("start");

setTimeout(() => {
  // #3
  console.log("setTimeout Zero", performance.now() - init);
}, 0);

setTimeout(() => {
  // #6
  console.log("setTimeout 100", performance.now() - init);

  Promise.resolve().then(() => {
    console.log("Promise into setTimeout", performance.now() - init);
  });
}, 100);

setImmediate(() => {
  // #4
  console.log("setImmediate", performance.now() - init);
});

fs.readFile(__filename, () => {
  // #5
  console.log("readFile", performance.now() - init);
});

Promise.resolve().then(() => {
  console.log("Promise", performance.now() - init);
});

process.nextTick(() => {
  console.log("nextTick", performance.now() - init);
});

// #2
console.log("finish");
