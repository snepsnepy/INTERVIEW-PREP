/**
 * @param {string} word1
 * @param {string} word2
 * @return {string}
 */
var mergeAlternately = function(word1, word2) {
    let point1 = 0;
    let point2 = 0;
    let finalStr = "";

    while (point1 < word1.length || point2 < word2.length) {
        if (point1 < word1.length) {
            finalStr += word1[point1];
            point1++;
        }

        if (point2 < word2.length) {
            finalStr += word2[point2];
            point2++;
        }
    }

   return finalStr;
};