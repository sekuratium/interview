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
