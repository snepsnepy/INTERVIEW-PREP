/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function(numRows) {
    let res = [[1]];

    for (let i = 1; i < numRows; i++) {
        let prevRow = res[res.length - 1];
        const newRow = [1];

        for (let j = 0; j < prevRow.length - 1; j++) {
            newRow.push(prevRow[j] + prevRow[j + 1]);
        }

        newRow.push(1);
        res.push(newRow);
    }

    return res;
};