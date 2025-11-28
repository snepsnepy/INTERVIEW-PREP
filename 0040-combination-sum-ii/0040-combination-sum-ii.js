/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
    const res = [];
    candidates.sort((a, b) => a - b);

    const dfs = (i, cur, total) => {
        if (target === total) {
            res.push([...cur]);
            return;
        }

        if (i >= candidates.length || total > target) {
            return;
        }

        // Include candidates[i]
        cur.push(candidates[i]);
        dfs(i + 1, cur, total + candidates[i]);
        cur.pop();
        // Skipped candidates[i]
        while(i + 1 < candidates.length && candidates[i] === candidates[i+1]) {
            i += 1;
        }
        dfs(i + 1, cur, total);
    }

    dfs(0, [], 0);
    return res;
};