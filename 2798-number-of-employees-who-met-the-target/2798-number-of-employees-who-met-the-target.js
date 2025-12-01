/**
 * @param {number[]} hours
 * @param {number} target
 * @return {number}
 */
var numberOfEmployeesWhoMetTarget = function(hours, target) {
    let sum = 0;

    for (const hr of hours) {
        if (hr >= target) sum++;
    }

    return sum;
};