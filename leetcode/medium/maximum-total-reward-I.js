/*
https://leetcode.com/problems/maximum-total-reward-using-operations-i/description/

You are given an integer array rewardValues of length n, representing the values of rewards.

Initially, your total reward x is 0, and all indices are unmarked. You are allowed to perform the following operation any number of times:

Choose an unmarked index i from the range [0, n - 1].
If rewardValues[i] is greater than your current total reward x, then add rewardValues[i] to x (i.e., x = x + rewardValues[i]), and mark the index i.
Return an integer denoting the maximum total reward you can collect by performing the operations optimally.

Example 1:
Input: rewardValues = [1,1,3,3]
Output: 4
Explanation:
During the operations, we can choose to mark the indices 0 and 2 in order, and the total reward will be 4, which is the maximum.

Example 2:
Input: rewardValues = [1,6,4,3,2]
Output: 11
Explanation:
Mark the indices 0, 2, and 1 in order. The total reward will then be 11, which is the maximum.

Constraints:
- 1 <= rewardValues.length <= 2000
- 1 <= rewardValues[i] <= 2000
*/

function packKnapsack(rewards, sum) {
    if (rewards.length === 0 || rewards[rewards.length - 1] > sum || sum <= 0) {
        return 0;
    }

    if (rewards[0] === sum) {
        return sum;
    }

    const noFirstItemKnapsack = packKnapsack(rewards.slice(1), sum);

    if (rewards[0] > sum) {
        return noFirstItemKnapsack;
    }

    return Math.max(
        noFirstItemKnapsack,
        rewards[0] + packKnapsack(rewards.slice(1), Math.min(rewards[0] - 1, sum - rewards[0])),
    );
}

var maxTotalReward = function (rewards) {
    const sortedRewards = rewards
        .sort((a, b) => b - a)
        .reduce(
            (uniqueRewards, reward) => {
                if (uniqueRewards[uniqueRewards.length - 1] !== reward) {
                    uniqueRewards.push(reward);
                }

                return uniqueRewards;
            },
            [rewards[0]],
        );

    return sortedRewards[0] + packKnapsack(sortedRewards.slice(1), sortedRewards[0] - 1);
};

console.log(maxTotalReward([1, 6, 4, 3, 2]));
console.log(maxTotalReward([1, 1, 3, 3]));
console.log(maxTotalReward([7, 8, 3, 20]));
