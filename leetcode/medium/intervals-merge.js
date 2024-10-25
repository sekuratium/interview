/*
https://leetcode.com/problems/merge-intervals/description/

Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals,
and return an array of the non-overlapping intervals that cover all the intervals in the input.

Example 1:
Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].

Example 2:
Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.

Constraints:
- 1 <= intervals.length <= 104
- intervals[i].length == 2
- 0 <= starti <= endi <= 104
*/

function merge(intervals) {
    const indicators = {};

    intervals.forEach(([start, end]) => {
        indicators[start] = { ...indicators[start], start: (indicators[start]?.start || 0) + 1 };
        indicators[end] = { ...indicators[end], end: (indicators[end]?.end || 0) + 1 };
    });

    const numbers = Object.keys(indicators);
    const result = [];
    let s = 0;

    for (let i = 0; i < numbers.length; i++) {
        if (indicators[numbers[i]].start) {
            if (s === 0) {
                result.push([numbers[i]]);
            }
            s += indicators[numbers[i]].start;
        }

        if (indicators[numbers[i]].end) {
            s -= indicators[numbers[i]].end;

            if (s === 0) {
                result[result.length - 1][1] = numbers[i];
            }
        }
    }

    return result;
}

console.log(
    merge([
        [1, 3],
        [2, 6],
        [8, 10],
        [15, 18],
    ]),
);
console.log(
    merge([
        [1, 4],
        [4, 5],
    ]),
);
console.log(
    merge([
        [1, 4],
        [1, 4],
        [2, 3],
    ]),
);
console.log(
    merge([
        [0, 1],
        [1, 4],
        [1, 7],
    ]),
);
console.log(
    merge([
        [1, 4],
        [1, 4],
    ]),
);
