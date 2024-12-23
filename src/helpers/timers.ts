/*

Основные понятия:

    setTimeout функция позволяет запланировать выполнение кода через заданный период времени. Принимает функцию и время ожидания в миллисекундах.
    Время выполнения назначенного действия может отличаться от запланированного из-за особенностей работы Event Loop.
    clearTimeout функция используется для отмены выполнения ранее запланированного с помощью setTimeout действия.

Продвинутое использование таймеров:

    Передача аргументов в функцию через setTimeout путем указания их после времени ожидания.
    setInterval и clearInterval функции для установки повторяющегося таймера и его отмены.

Работа с performance:

    Использование performance.now() для измерения точности времени выполнения таймеров.

Мгновенное выполнение и управление ссылками на таймеры:

    setImmediate функция для планирования исполнения кода сразу после выполнения текущего цикла событий.
    unref и ref методы позволяют временно исключить таймер из списка активных, чтобы не блокировать завершение программы, и возвращать его обратно.

*/

const start = performance.now();

setTimeout(() => {
  const end = performance.now();
  console.log(end - start);
}, 1000);

// with arguments
function fWithArgs(a: number, b: number) {
  console.log(a + b);
}

setTimeout(fWithArgs, 1000, 1, 2);

// set immediate

console.log("before immediate");

setImmediate(() => {
  console.log("immediate");
});

console.log("after immediate");
