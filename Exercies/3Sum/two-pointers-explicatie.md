# Tehnica Two Pointers

## Ce este?

**Two Pointers** (doi pointeri) este o tehnică de parcurgere a unui array folosind **două variabile (indici)** care se mișcă prin array în funcție de anumite condiții. Este foarte eficientă și reduce complexitatea de la O(n²) la O(n) în multe cazuri.

## Tipuri de Two Pointers:

### 1. **Pointeri Opuși** (cel mai comun - folosit în 3Sum)

Cei doi pointeri pornesc de la **capetele opuse** ale array-ului și se apropie unul de altul.

```javascript
let left = 0;
let right = array.length - 1;

while (left < right) {
    // Faci ceva cu array[left] și array[right]
    // Apoi muți pointerii în funcție de condiție
    left++;    // sau
    right--;   // sau ambii
}
```

### Exemplu vizual - găsirea a două numere cu sumă specifică:

```
Array sortat: [-4, -1, 0, 1, 2, 5]
Căutăm suma = 1

Step 1:
[-4, -1, 0, 1, 2, 5]
  ↑              ↑
 left          right
Suma = -4 + 5 = 1 ✓ GĂSIT!
```

Alt exemplu:
```
Array sortat: [-4, -1, 0, 1, 2, 5]
Căutăm suma = 3

Step 1:
[-4, -1, 0, 1, 2, 5]
  ↑              ↑
 left          right
Suma = -4 + 5 = 1 (prea mic) → mutăm LEFT la dreapta

Step 2:
[-4, -1, 0, 1, 2, 5]
      ↑          ↑
     left      right
Suma = -1 + 5 = 4 (prea mare) → mutăm RIGHT la stânga

Step 3:
[-4, -1, 0, 1, 2, 5]
      ↑       ↑
     left   right
Suma = -1 + 2 = 1 (prea mic) → mutăm LEFT la dreapta

Step 4:
[-4, -1, 0, 1, 2, 5]
         ↑    ↑
        left right
Suma = 0 + 2 = 2 (prea mic) → mutăm LEFT la dreapta

Step 5:
[-4, -1, 0, 1, 2, 5]
            ↑  ↑
          left right
Suma = 1 + 2 = 3 ✓ GĂSIT!
```

## De ce funcționează?

**Principiul cheie**: Când array-ul este **sortat**:
- Dacă suma este **prea mică** → trebuie să o mărim → mutăm `left` la **dreapta** (valori mai mari)
- Dacă suma este **prea mare** → trebuie să o micșorăm → mutăm `right` la **stânga** (valori mai mici)

## În contextul 3Sum:

În problema 3Sum, se folosește o **combinație**:
1. Un **loop exterior** fixează primul număr (`start`)
2. **Two pointers** (`left` și `right`) caută celelalte două numere

```javascript
Array sortat: [-4, -1, -1, 0, 1, 2]

Iterația 1: start = 0 (valoare = -4)
[-4, -1, -1, 0, 1, 2]
  ↑   ↑           ↑
start left      right

Căutăm: left + right = 4 (pentru ca -4 + 4 = 0)
-1 + 2 = 1 (prea mic) → left++

[-4, -1, -1, 0, 1, 2]
  ↑       ↑       ↑
start   left   right

-1 + 2 = 1 (prea mic) → left++

[-4, -1, -1, 0, 1, 2]
  ↑          ↑    ↑
start      left right

0 + 2 = 2 (prea mic) → left++

[-4, -1, -1, 0, 1, 2]
  ↑             ↑ ↑
start        left right

1 + 2 = 3 (prea mic) → left++
Acum left >= right, deci trecem la următorul start
```

### Implementarea corectă a 3Sum cu Two Pointers:

```javascript
var threeSum = function (nums) {
  nums.sort((a, b) => a - b);
  const result = [];

  // Loop exterior pentru 'start'
  for (let start = 0; start < nums.length - 2; start++) {
    // Skip duplicate pentru start
    if (start > 0 && nums[start] === nums[start - 1]) continue;

    let left = start + 1;
    let right = nums.length - 1;

    // Two pointers pentru fiecare start
    while (left < right) {
      const sum = nums[start] + nums[left] + nums[right];

      if (sum === 0) {
        result.push([nums[start], nums[left], nums[right]]);
        
        // Skip duplicate pentru left și right
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        
        left++;
        right--;
      } else if (sum < 0) {
        left++; // Avem nevoie de sumă mai mare
      } else {
        right--; // Avem nevoie de sumă mai mică
      }
    }
  }

  return result;
};
```

### 2. **Pointeri în Aceeași Direcție** (Slow & Fast)

Ambii pointeri pornesc de la **același capăt** și se mișcă în aceeași direcție, dar la **viteze diferite**.

```javascript
let slow = 0;
let fast = 0;

while (fast < array.length) {
    // Fast se mișcă mai rapid
    fast++;
    // Slow se mișcă condițional
    if (condition) slow++;
}
```

**Exemplu**: Eliminarea duplicatelor dintr-un array sortat

```javascript
function removeDuplicates(nums) {
    if (nums.length === 0) return 0;
    
    let slow = 0; // unde punem următorul element unic
    
    for (let fast = 1; fast < nums.length; fast++) {
        if (nums[fast] !== nums[slow]) {
            slow++;
            nums[slow] = nums[fast];
        }
    }
    
    return slow + 1;
}
```

```
Array: [1, 1, 2, 2, 3, 4, 4]

Step 1:
[1, 1, 2, 2, 3, 4, 4]
 ↑  ↑
slow fast
1 === 1, nu facem nimic

Step 2:
[1, 1, 2, 2, 3, 4, 4]
 ↑     ↑
slow  fast
1 !== 2, slow++, nums[slow] = 2
[1, 2, 2, 2, 3, 4, 4]
    ↑  ↑
   slow fast

Step 3:
[1, 2, 2, 2, 3, 4, 4]
    ↑     ↑
   slow  fast
2 === 2, nu facem nimic

Step 4:
[1, 2, 2, 2, 3, 4, 4]
    ↑        ↑
   slow     fast
2 !== 3, slow++, nums[slow] = 3
[1, 2, 3, 2, 3, 4, 4]
       ↑     ↑
      slow  fast

Rezultat final: [1, 2, 3, 4, ...]
```

## Avantajele Two Pointers:

✅ **Eficient**: O(n) în loc de O(n²)  
✅ **Space complexity**: O(1) - nu necesită memorie extra  
✅ **Simplu**: Cod clean și ușor de înțeles  
✅ **Versatil**: Se aplică la multe probleme

## Când să folosești Two Pointers?

- Array-ul este **sortat** (sau poate fi sortat)
- Cauți **perechi/triplete** cu o anumită proprietate
- Trebuie să **compari elemente** de la capete diferite
- Problema implică **sumă/diferență** între elemente
- Vrei să **elimini duplicate** sau să **filtrezi** în-place

## Probleme comune care folosesc Two Pointers:

1. **Two Sum II** (array sortat)
2. **3Sum** (găsește triplete cu sumă 0)
3. **Container With Most Water**
4. **Remove Duplicates from Sorted Array**
5. **Valid Palindrome**
6. **Trapping Rain Water**
7. **Sort Colors** (Dutch National Flag)

## Complexitate:

- **Time Complexity**: O(n) pentru majoritatea cazurilor cu pointeri opuși
- **Space Complexity**: O(1) - doar două variabile suplimentare
- Pentru 3Sum: O(n²) din cauza loop-ului exterior, dar mult mai bine decât O(n³) naiv

