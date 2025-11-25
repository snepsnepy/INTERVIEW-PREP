/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const arr = [];

    nums.forEach((val, index) => {
        let number = target - val;
        if (nums.includes(number, index + 1)) {
            arr.push(index, nums.indexOf(number, index + 1));
        }
    })
    return arr;
};