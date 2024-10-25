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
