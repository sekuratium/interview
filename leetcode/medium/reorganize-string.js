/*
https://leetcode.com/problems/reorganize-string/description/

Given a string s, rearrange the characters of s so that any two adjacent characters are not the same.
Return any possible rearrangement of s or return "" if not possible.

Example 1:
Input: s = "aab"
Output: "aba"

Example 2:
Input: s = "aaab"
Output: ""

Constraints:
- 1 <= s.length <= 500
- s consists of lowercase English letters.
*/

function reorganizeString(string) {
    if (string.length <= 1) {
        return string;
    }

    const dict = {};
    let result = '';

    for (let letter of string) {
        dict[letter] = (dict[letter] || 0) + 1;
    }
    const dictArray = Object.entries(dict).sort((entA, entB) => entB[1] - entA[1]);

    if (dictArray.length === 1) {
        return '';
    }

    while (
        dictArray.filter((entry) => entry[1] > 0).length > 1 ||
        (dictArray[0][1] > 0 && result.at(-1) !== dictArray[0][0])
    ) {
        dictArray.forEach((entry, index) => {
            if (entry[1] > 0) {
                result += entry[0];
                entry[1] = entry[1] - 1;
            }
        });
    }

    const lastLetter = dictArray[0][0];
    const lastLetterCount = dictArray[0][1];
    if (lastLetterCount === 0) {
        return result;
    }

    for (let i = 0; i < lastLetterCount; i++) {
        let isResultChanged = false;
        for (let j = 0; j < result.length; j++) {
            if (result[j] !== lastLetter && result[j - 1] !== lastLetter) {
                isResultChanged = true;
                result = result.slice(0, j) + lastLetter + result.slice(j);
                break;
            }
        }

        if (!isResultChanged) {
            return '';
        }
    }

    return result;
}

console.log(reorganizeString('aaaaabdc'));
