/**
 * @param {number} n
 * @return {number}
 */
var tribonacci = function(n) {
    if (n === 0) return 0;
    if (n === 1 || n === 2) return 1;
    
    let res = [0, 1, 1];
   
    for (let i = 3; i <= n; i++) {
        res[i] = res[i - 1] + res[i - 2] + res[i - 3];
    }
    
    return res[n];
};