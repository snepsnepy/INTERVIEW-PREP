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
 * @return {number[]}
 */

var preorderTraversal = function(root) {
    if (!root) return [];
    let list = [];

    const preOrder = (node, list) => {
        list.push(node.val);

        if (node.left) {
            preOrder(node.left, list);
        }

        if (node.right) {
            preOrder(node.right, list);
        }

        return list;
    }


   return preOrder(root, list);
};