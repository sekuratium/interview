/*
https://leetcode.com/problems/different-ways-to-add-parentheses/description/

Given a string expression of numbers and operators, return all possible results from computing
all the different possible ways to group numbers and operators. You may return the answer in any order.

Input: expression = "2-1-1"
Output: [0,2]
Explanation:
    ((2-1)-1) = 0
    (2-(1-1)) = 2

Input: expression = "2*3-4*5"
Output: [-34,-14,-10,-10,10]
Explanation:
    (2*(3-(4*5))) = -34
    ((2*3)-(4*5)) = -14
    ((2*(3-4))*5) = -10
    (2*((3-4)*5)) = -10
    (((2*3)-4)*5) = 10

- 1 <= expression.length <= 20
- expression consists of digits and the operator '+', '-', and '*'.
- All the integer values in the input expression are in the range [0, 99].
- The integer values in the input expression do not have a leading '-' or '+' denoting the sign.
*/

function split(expression) {
    const expressionArray = [''];

    for (const symbol of expression) {
        if (['-', '+', '*'].includes(symbol)) {
            expressionArray.push(symbol);
            expressionArray.push('');
        } else {
            expressionArray[expressionArray.length - 1] += symbol;
        }
    }

    return expressionArray;
}

function permute(permutation) {
    var length = permutation.length,
        result = [permutation.slice()],
        c = new Array(length).fill(0),
        i = 1, k, p;

    while (i < length) {
        if (c[i] < i) {
            k = i % 2 && c[i];
            p = permutation[i];
            permutation[i] = permutation[k];
            permutation[k] = p;
            ++c[i];
            i = 1;
            result.push(permutation.slice());
        } else {
            c[i] = 0;
            ++i;
        }
    }
    return result;
}

function getFullExpression(expressionArray, operationOrder) {
    let fullExpressionArray = [...expressionArray];

    const findOperationIndex = (operationOrder) => {
        let current = 0;
        for (let i = 0; i < fullExpressionArray.length; i++) {
            if (['-', '+', '*'].includes(fullExpressionArray[i])) {
                current += 1;
                if (current === operationOrder) {
                    return i;
                }
            }
        }
    }

    operationOrder.forEach((order) => {
        const startIndex = findOperationIndex(order);

        let controlSum = 0;

        for (let i = startIndex+1; i < fullExpressionArray.length; i++) {
            if (fullExpressionArray[i] === '(') {
                controlSum += 1;
            }

            if (fullExpressionArray[i] === ')') {
                controlSum -= 1;
            }

            if (controlSum !== 0 || ['(', '-', '+', '*'].includes(fullExpressionArray[i])) {
                continue;
            }

            fullExpressionArray = [...fullExpressionArray.slice(0, i+1), ')', ...fullExpressionArray.slice(i+1)];
            break;
        }

        controlSum = 0;
        for (let i = startIndex-1; i >= 0; i--) {
            if (fullExpressionArray[i] === '(') {
                controlSum += 1;
            }

            if (fullExpressionArray[i] === ')') {
                controlSum -= 1;
            }

            if (controlSum !== 0 || [')', '-', '+', '*'].includes(fullExpressionArray[i])) {
                continue;
            }

            fullExpressionArray = [...fullExpressionArray.slice(0, i), '(', ...fullExpressionArray.slice(i)];
            break;
        }
    });

    return fullExpressionArray.join('');
}

var diffWaysToCompute = function(expression) {
    const expressionArray = split(expression);
    const operationOrder = Array.from({length: (expressionArray.length - 1)/2}, (_, index) => index + 1);

    const store = {};
    permute(operationOrder).forEach((order) => {
        const fullExpression = getFullExpression(expressionArray, order);

        if (!store[fullExpression]) {
            store[fullExpression] = eval(fullExpression);
        }
    });

    return Object.values(store);
};

console.log(diffWaysToCompute('15*1*4-3+5*4'));

// [2, *, 3, -, 4, *, 5], [1, 3, 5]
// 1 -> [(, 2, *, 3, ), -, 4, *, 5]
// 3 ->

// '2*3-4*5' -> '(((2*3)-4)*5)' 123 10
// '2*3-4*5' -> '((2*3)-(4*5))' 132* -14
// '2*3-4*5' -> '((2*(3-4))*5)' 213 -10
// '2*3-4*5' -> '(2*((3-4)*5))' 231 -10
// '2*3-4*5' -> '((2*3)-(4*5))' 312* -14
// '2*3-4*5' -> '(2*(3-(4*5)))' 321 -34
