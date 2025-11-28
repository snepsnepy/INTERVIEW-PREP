/**
 * @param {number[][]} edges
 * @return {number}
 */
var findCenter = function(edges) {
    const len = edges.length;
    const arr = new Array(len + 1).fill(0);

    for (const [a, b] of edges) {
        arr[a - 1] += 1;
        arr[b - 1] += 1;
    }

    const max = Math.max(...arr);
    const center = arr.indexOf(max) + 1;
    
    return center;
};