/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  nums = nums.sort((a, b) => a - b);
  console.log("NUMS: ", nums);
  let finalObject = {};
  let start = 0;
  let left = start + 1;
  let right = nums.length - 1;

  while (left < right) {
    if (nums[start] + nums[left] + nums[right] === 0) {
      finalObject[[nums[start], nums[left], nums[right]]] = [
        nums[start],
        nums[left],
        nums[right],
      ];
      left++;
      right--;
    } else if (nums[start] + nums[left] + nums[right] < 0) {
      start = left;
      left++;
    } else if (nums[start] + nums[left] + nums[right] > 0) {
      right--;
    }
  }

  // console.log(Object.values(finalObject));
  return Object.values(finalObject);
};
