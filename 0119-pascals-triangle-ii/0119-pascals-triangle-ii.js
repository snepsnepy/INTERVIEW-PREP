/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function(rowIndex) {
    let res =[[1]];

    for (let i = 1; i < rowIndex + 1; i++) {
        let prevRow = res[res.length - 1];
        const newRow = [1];

        for (let j = 0; j < prevRow.length - 1; j++) {
            newRow.push(prevRow[j] + prevRow[j + 1]);
        }

        newRow.push(1);
        res.push(newRow);
    }

    return res[res.length - 1];
};