/*
Даны две строки строчных латинских символов: строка J и строка S. Символы, входящие в строку J, — «драгоценности»,
входящие в строку S — «камни». Нужно определить, какое количество символов из S одновременно являются «драгоценностями».
Проще говоря, нужно проверить, какое количество символов из S входит в J.
*/

function getJewelryInStones(stones, jewelry) {
    const jewelrySet = new Set(jewelry);
    let sum = 0;

    for (let i = 0; i < stones.length; i++) {
        if (jewelrySet.has(stones[i])) {
            sum += 1;
        }
    }

    return sum;
}

console.log(getJewelryInStones('aabbbbcd', 'aa'));
