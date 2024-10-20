/*
https://leetcode.com/problems/coin-change/description/

You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.
Return the fewest number of coins that you need to make up that amount.
If that amount of money cannot be made up by any combination of the coins, return -1.
You may assume that you have an infinite number of each kind of coin.

Example 1:
Input: coins = [1,2,5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1

Example 2:
Input: coins = [2], amount = 3
Output: -1

Example 3:
Input: coins = [1], amount = 0
Output: 0

Constraints:
- 1 <= coins.length <= 12
- 1 <= coins[i] <= 231 - 1
- 0 <= amount <= 104
*/

function coinChangeWithCache(coins, amount, changeCache = {}) {
    if (amount === 0) {
        return 0;
    }

    if (amount % Math.max(...coins) === 0) {
        return amount / Math.max(...coins);
    }

    if (amount < 0) {
        return -1;
    }

    const changes = [];
    for (let i = 0; i < coins.length; i++) {
        if (amount - coins[i] >= 0) {
            const key = `${coins.join('.')}.${amount - coins[i]}`;

            if (!changeCache[key]) {
                changeCache[key] = coinChangeWithCache(coins, amount - coins[i], changeCache);
            }

            if (changeCache[key] >= 0) {
                changes.push(changeCache[key]);
            }
        }
    }

    return changes.length > 0 ? Math.min(...changes) + 1 : -1;
}

function coinChange(coins, amount) {
    return coinChangeWithCache(coins, amount, {});
}

// console.log(coinChange([186, 419, 83, 408], 249));
// console.log(coinChange([1, 2, 5], 202));
// x = performance.now();
// console.log(coinChange([1], 10000));
// console.log(performance.now() - x);
// console.log(changeCache);
