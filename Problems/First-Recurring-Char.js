/**
 * PROBLEMA: Găsește primul element care se repetă într-un array
 *
 * Exemplu: [2, 5, 1, 2, 3, 5, 1, 2, 4] → trebuie să returneze 2
 * De ce 2? Pentru că este primul element care apare de două ori când
 * parcurgem array-ul de la stânga la dreapta.
 */

/**
 * SOLUȚIA 1: BRUTE FORCE (Forța Brută)
 *
 * Strategie: Compară fiecare element cu toate elementele care vin după el
 *
 * Cum funcționează:
 * - Bucla exterioară: alege un element (i)
 * - Bucla interioară: compară cu toate elementele următoare (j = i+1 până la final)
 * - Dacă găsește o potrivire, returnează elementul
 *
 * Complexitate:
 * - Timp: O(n²) - foarte lent pentru array-uri mari!
 * - Spațiu: O(1) - nu folosește memorie extra
 *
 * @param {Array} input - Array-ul în care căutăm repetări
 * @returns {*} Primul element care se repetă, sau undefined
 */
function firstRecurringCharacter(input) {
  // Parcurge fiecare element din array
  for (let i = 0; i < input.length; i++) {
    // Compară elementul curent cu toate elementele următoare
    for (let j = i + 1; j < input.length; j++) {
      // Dacă găsim o potrivire
      if (input[i] === input[j]) {
        console.log("RESULT: ", input[i]);
        return input[i]; // Returnează primul element care se repetă
      }
    }
  }
  // Dacă nu găsim nicio repetare
  return undefined;
} // O(n²) - Complexitate pătratică

/**
 * SOLUȚIA 2: HASH MAP (Optimizată) ⚡
 *
 * Strategie: Folosește un obiect (hash map) pentru a urmări elementele văzute
 *
 * Cum funcționează:
 * - Creează un obiect gol pentru a stoca elementele văzute
 * - Pentru fiecare element din array:
 *   → Verifică dacă l-am mai văzut (există în map)
 *   → Dacă DA: returnează-l (am găsit prima repetare!)
 *   → Dacă NU: adaugă-l în map cu indexul său
 *
 * Complexitate:
 * - Timp: O(n) - MULT mai rapid! 🚀
 * - Spațiu: O(n) - folosește memorie extra pentru map
 *
 * Trade-off: Sacrificăm memorie pentru viteză (worth it!)
 *
 * @param {Array} input - Array-ul în care căutăm repetări
 * @returns {*} Primul element care se repetă, sau undefined
 */
function firstRecurringCharacter2(input) {
  // Obiect pentru a urmări ce elemente am văzut și la ce index
  let map = {};

  // Parcurge array-ul o singură dată
  for (let i = 0; i < input.length; i++) {
    // Verifică dacă elementul curent există deja în map
    // Folosim !== undefined pentru că 0 e o valoare validă de index
    if (map[input[i]] !== undefined) {
      // L-am mai văzut! Acesta e primul element care se repetă
      return input[i];
    } else {
      // Nu l-am văzut încă, adaugă-l în map cu indexul său
      map[input[i]] = i;
    }

    console.log("RESULT: ", map); // Debug: vezi cum se construiește map-ul
  }

  // Am parcurs tot array-ul și nu am găsit repetări
  return undefined;
} // O(n) - Complexitate liniară 🎯

// Testare: Array cu multiple repetări
// Primul element care se repetă este 2 (apare la index 0 și apoi la index 3)
firstRecurringCharacter2([2, 5, 1, 2, 3, 5, 1, 2, 4]);

// Alte exemple de testare:
// firstRecurringCharacter2([1, 2, 3, 4, 5]); // undefined - fără repetări
// firstRecurringCharacter2([2, 2, 1, 3]); // 2 - repetare imediată
// firstRecurringCharacter2([5, 5, 5, 5]); // 5 - toate sunt la fel
