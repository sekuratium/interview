/*
A string s is called happy if it satisfies the following conditions:

s only contains the letters 'a', 'b', and 'c'.
s does not contain any of "aaa", "bbb", or "ccc" as a substring.
s contains at most a occurrences of the letter 'a'.
s contains at most b occurrences of the letter 'b'.
s contains at most c occurrences of the letter 'c'.
Given three integers a, b, and c, return the longest possible happy string.
If there are multiple longest happy strings, return any of them.
If there is no such string, return the empty string "".

A substring is a contiguous sequence of characters within a string.

Example 1:
Input: a = 1, b = 1, c = 7
Output: "ccaccbcc"
Explanation: "ccbccacc" would also be a correct answer.

Example 2:
Input: a = 7, b = 1, c = 0
Output: "aabaa"
Explanation: It is the only correct answer in this case.


Constraints:

0 <= a, b, c <= 100
a + b + c > 0
*/

function getNextData(count, string) {
    let nextStep = '';
    const lastLetter = string.at(-1) || '';
    const preLastLetter = string.at(-2) || '';
    const isItPossibleToAddAnyLetter = !lastLetter || !preLastLetter || lastLetter !== preLastLetter;
    const sorted = Object.entries(count).sort((entry1, entry2) => entry2[1] - entry1[1]);

    const firstEntry = sorted.find((entry) => entry[0] !== lastLetter);
    const firstCount = Math.min(firstEntry[1], 2);
    const secondEntry = sorted.find((entry) =>
        firstCount > 0 ? entry[0] !== firstEntry[0] : isItPossibleToAddAnyLetter || entry[0] !== lastLetter,
    );
    const secondCount = Math.min(secondEntry[1], 1);
    nextStep += new Array(firstCount).fill(firstEntry[0]).join('');
    nextStep += new Array(secondCount).fill(secondEntry[0]).join('');
    const nextCount = {
        ...count,
        [firstEntry[0]]: count[firstEntry[0]] - firstCount,
        [secondEntry[0]]: count[secondEntry[0]] - secondCount,
    };

    return { nextStep, nextCount };
}

function getEnhancedString(letter, string) {
    let result = string;

    for (let i = 0; i < string.length; i++) {
        result = string.slice(0, i) + letter + string.slice(i);

        if (result.indexOf('aaa') === -1 && result.indexOf('bbb') === -1 && result.indexOf('ccc') === -1) {
            return result;
        }
    }

    return string;
}

function longestDiverseString(a, b, c) {
    let string = '';
    let { nextStep, nextCount } = getNextData({ a, b, c }, string);

    while (nextStep) {
        string += nextStep;
        const data = getNextData(nextCount, string);
        nextStep = data.nextStep;
        nextCount = data.nextCount;
    }

    const entry = Object.entries(nextCount).find((entry) => entry[1] > 0);
    if (!entry) {
        return string;
    }

    for (let i = 0; i < entry[1]; i++) {
        const enhancedString = getEnhancedString(entry[0], string);
        if (string === enhancedString) {
            return string;
        } else {
            string = enhancedString;
        }
    }

    return string;
}

console.log(longestDiverseString(2, 10, 10));
