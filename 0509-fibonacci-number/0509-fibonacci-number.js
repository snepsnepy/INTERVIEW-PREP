/**
 * @param {number} n
 * @return {number}
 */
var fib = function(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;

    let res = [0, 1];

    for (let i = 2; i <= n; i++) {
        res[i] = res[i - 1] + res[i - 2];
    }

    return res[n];
};