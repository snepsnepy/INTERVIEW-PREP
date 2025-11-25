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
 * @return {number}
 */
var minDepth = function(root) {
    if (!root) return 0;
    
    function depth(node) {
        if (!node.left && !node.right) return 1;
        if (node.left && !node.right) return depth(node.left) + 1;
        if (!node.left && node.right) return depth(node.right) + 1;

        const left = depth(node.left) + 1;
        const right = depth(node.right) + 1;

        return Math.min(left, right);
    }

    return depth(root);
};