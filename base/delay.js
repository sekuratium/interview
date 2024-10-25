/*
Реализовать функцию delay(timeout).

Пример вызова:
delay(1000).then(() => console.log('done'));
*/

function delay(timeout) {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
