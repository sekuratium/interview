/*
Требуется найти в бинарном векторе самую длинную последовательность единиц и вывести её длину.
*/

function findLongestConsecutiveOnes(string) {
    let max = 0;
    let temp = 0;

    for (let i = 0; i < string.length; i++) {
        if (string[i] === '1') {
            temp += 1;
        } else {
            max = Math.max(max, temp);
            temp = 0;
        }
    }

    return Math.max(max, temp);
}

console.log(findLongestConsecutiveOnes('111111110010101010111100011011100101111111111111'));
