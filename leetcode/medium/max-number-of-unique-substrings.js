/*
https://leetcode.com/problems/split-a-string-into-the-max-number-of-unique-substrings/description/

Given a string s, return the maximum number of unique substrings that the given string can be split into.

You can split string s into any list of non-empty substrings, where the concatenation of the substrings forms the original string.
However, you must split the substrings such that all of them are unique.

A substring is a contiguous sequence of characters within a string.

Example 1:
Input: s = "ababccc"
Output: 5
Explanation: One way to split maximally is ['a', 'b', 'ab', 'c', 'cc']. Splitting like ['a', 'b', 'a', 'b', 'c', 'cc'] is not valid as you have 'a' and 'b' multiple times.

Example 2:
Input: s = "aba"
Output: 2
Explanation: One way to split maximally is ['a', 'ba'].

Example 3:
Input: s = "aa"
Output: 1
Explanation: It is impossible to split the string any further.


Constraints:
- 1 <= s.length <= 16
- s contains only lower case English letters.
*/

// abc, 1, 2

function findSubsets(array, k) {
    if (array.length === k) {
        return [array];
    }

    if (k === 1) {
        return array.map((item) => [item]);
    }

    const result = [];

    for (let i = 0; i <= array.length - k; i++) {
        const subsets = findSubsets(array.slice(i + 1), k - 1);
        result.push(...subsets.map((subset) => [array[i], ...subset]));
    }

    return result;
}

function isPartitionUnique(string, partition) {
    const substrings = partition.map((partitionIndex, index) => {
        if (index === partition.length - 1) {
            return string.slice(partitionIndex);
        }

        return string.slice(partitionIndex, partition[index + 1]);
    });

    return substrings.length === new Set(substrings).size;
}

var maxUniqueSplit = function(string) {
    const arrayOfIndices = Array.from({length: string.length - 1}, (_, i) => i + 1);

    for (let n = string.length - 1; n >= 1; n--) {
        const partitions = findSubsets(arrayOfIndices, n);
        if (partitions.some((partition) => isPartitionUnique(string, [0, ...partition]))) {
            return n + 1;
        }
    }

    return 1;
};

console.log(maxUniqueSplit('abcd'));
