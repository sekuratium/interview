/*
Given two integers n and k, return the kth lexicographically smallest integer in the range [1, n].

Example 1:
Input: n = 13, k = 2
Output: 10
Explanation: The lexicographical order is [1, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8, 9], so the second smallest number is 10.

Example 2:
Input: n = 1, k = 1
Output: 1


Constraints:
1 <= k <= n <= 10^9
*/

/*
2000 = 1111*1 + 892
на 1 - 111 + 1
на 2 - 111
и т.д до 9 - 111
*/

function findStartData(n, k) {
    const l = Number(new Array(String(n).length).join('9'));
    const m = Number('1' + new Array(String(n).length).join('0'));
    const array = new Array(9).fill(l / 9);
    let temp = n - l;

    for (let i = 0; i < 9; i++) {
        if (temp - m > 0) {
            array[i] += m;
            temp = temp - m;
        } else {
            array[i] += temp;
            break;
        }
    }

    let order = k;
    for (let i = 0; i < 9; i++) {
        if (order <= array[i]) {
            return { start: i + 1, order };
        }
        order -= array[i];
    }
}

function generateOrder(n, k) {
    if (k === 1) {
        return 1;
    }

    let { start, order } = findStartData(n, k);

    for (let i = 1; i < order; i++) {
        if (start * 10 <= n) {
            start = start * 10;
            continue;
        }

        if ((start + 1) % 10 !== 0 && start + 1 <= n) {
            start = start + 1;
            continue;
        }

        let divider = 10;
        const temp = start + 10 - (start % 10);
        while (temp % (divider * 10) === 0) {
            divider = divider * 10;
        }

        start = (start - (start % divider)) / divider + 1;
    }

    return start;
}

console.log('final', generateOrder(596516650, 593124772));
