/**
 * @param {number} n
 * @param {number[][]} trust
 * @return {number}
 */
var findJudge = function(n, trust) {
    const trustedArr = new Array(n + 1).fill(0);

    for (const [a, b] of trust) {
        trustedArr[a] -= 1;
        trustedArr[b] += 1;
    }

    for (let i = 1; i <= n; i++) {
        if (trustedArr[i] === n - 1) {
            return i;
        }
    }

    return -1;
};