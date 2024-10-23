/*
https://leetcode.com/problems/restore-ip-addresses/description/

A valid IP address consists of exactly four integers separated by single dots.
Each integer is between 0 and 255 (inclusive) and cannot have leading zeros.

For example, "0.1.2.201" and "192.168.1.1" are valid IP addresses, but "0.011.255.245", "192.168.1.312" and
"192.168@1.1" are invalid IP addresses. Given a string s containing only digits, return all possible valid IP addresses
that can be formed by inserting dots into s. You are not allowed to reorder or remove any digits in s.
You may return the valid IP addresses in any order.

Example 1:
Input: s = "25525511135"
Output: ["255.255.11.135","255.255.111.35"]

Example 2:
Input: s = "0000"
Output: ["0.0.0.0"]

Example 3:
Input: s = "101023"
Output: ["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]

Constraints:
- 1 <= s.length <= 20
- s consists of digits only.

 */

function count(str, numberOfDots) {
    if (numberOfDots === 0) {
        return str.length > 0 && str.length < 4 && Number(str) <= 255 && (str === '0' || str[0] !== '0') ? 1 : 0;
    }

    if (str[0] === '0') {
        return count(str.substring(1), numberOfDots - 1);
    }

    return (
        count(str.substring(1), numberOfDots - 1) +
        count(str.substring(2), numberOfDots - 1) +
        (Number(str.substring(0, 3)) <= 255 ? count(str.substring(3), numberOfDots - 1) : 0)
    );
}

function structurePartition(str, numberOfDots) {
    if (numberOfDots === 0) {
        return str.length > 0 && str.length < 4 && Number(str) <= 255 && (str === '0' || str[0] !== '0') ? [str] : [];
    }

    if (str[0] === '0') {
        return structurePartition(str.substring(1), numberOfDots - 1).map((arr) => [
            '0',
            ...(Array.isArray(arr) ? arr : [arr]),
        ]);
    }

    return [
        ...structurePartition(str.substring(1), numberOfDots - 1).map((arr) => [
            str.substring(0, 1),
            ...(Array.isArray(arr) ? arr : [arr]),
        ]),
        ...structurePartition(str.substring(2), numberOfDots - 1).map((arr) => [
            str.substring(0, 2),
            ...(Array.isArray(arr) ? arr : [arr]),
        ]),
        ...(Number(str.substring(0, 3)) <= 255
            ? structurePartition(str.substring(3), numberOfDots - 1).map((arr) => [
                  str.substring(0, 3),
                  ...(Array.isArray(arr) ? arr : [arr]),
              ])
            : []),
    ];
}

console.log(structurePartition('25525511135', 3));
console.log(structurePartition('11135', 1));
console.log(structurePartition('101023', 3));
