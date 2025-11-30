/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
    if (amount === 0) return 0;

    let dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    for (let j = 0; j < coins.length; j++) {
        for(let i = coins[j]; i < dp.length; i++) {
            dp[i] = Math.min(dp[i], 1 + dp[i - coins[j]]);
        }
    }

    if (dp[amount] !== Infinity) {
        return dp[amount];
    }
    return -1;
};