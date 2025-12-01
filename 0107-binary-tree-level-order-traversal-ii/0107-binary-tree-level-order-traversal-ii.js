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
 * @return {number[][]}
 */
var levelOrderBottom = function(root) {
    if (!root) return [];

    let list = [];
    let queue = [root];

    while (queue.length > 0) {
        let levelSize = queue.length;
        let levelArr = [];

        while (levelSize > 0) {
            let currentNode = queue.shift();

            if (currentNode.left) {
                queue.push(currentNode.left);
            }

            if (currentNode.right) {
                queue.push(currentNode.right);
            }

            levelArr.push(currentNode.val);
            levelSize--;
        }

        list.push(levelArr);
    }

    return list.reverse()
};