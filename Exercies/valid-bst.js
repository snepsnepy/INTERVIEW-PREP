/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
  //[2,1,3]

  const traverseInOrder = (node, list = []) => {
    if (!node) return;

    if (node.left) {
      traverseInOrder(node.left, list);
    }
    list.push(node.val);

    if (node.right) {
      traverseInOrder(node.right, list);
    }

    return list;
  };

  const finalList = traverseInOrder(root);

  for (let i = 0; i < finalList.length; i++) {
    if (finalList[i + 1] <= finalList[i]) return false;
  }
  return true;
};

console.log(isValidBST([2, 1, 3]));
console.log(isValidBST([5, 1, 4, null, null, 3, 6]));
console.log(isValidBST([2, 2, 2]));
