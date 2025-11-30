/**
 * @param {string} s
 * @return {character}
 */
var repeatedCharacter = function(s) {
    const set = new Set();

    for (letter of s) {
       if (set.has(letter)) {
        return letter;
       }
       set.add(letter);
    }
};