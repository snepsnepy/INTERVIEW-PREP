/**
 * @param {number[]} nums
 * @return {number}
 */
var findClosestNumber = function(nums) {
    let closest = Number.MAX_VALUE;

    for (const num of nums) {
        if (Math.abs(num) < Math.abs(closest)) {
            closest = num;
        } else if (Math.abs(num) === Math.abs(closest)) {
            closest = Math.max(num, closest);
        }
    }

    return closest;
};