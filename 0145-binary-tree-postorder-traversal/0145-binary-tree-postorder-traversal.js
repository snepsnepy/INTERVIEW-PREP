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
var postorderTraversal = function(root) {
    if (!root) return [];
    let list = [];

    const postOrder = (node, list) => {
        console.log("visiting node: ", node.val);
        if (node.left) {
            console.log("left: ", node.val);
            postOrder(node.left, list);
        }

        if (node.right) {
            console.log("right: ", node.val);
            postOrder(node.right, list);
        }
        list.push(node.val);

        return list;
    }

    return postOrder(root, list);
};