# Hash Table - Documentație

## Ce este un Hash Table?

Un **Hash Table** (tabel de dispersie) este o structură de date care stochează informații sub forma de perechi **cheie-valoare**. Este similar cu un dicționar: dai o cheie și primești înapoi valoarea asociată.

### Exemplu din viața reală

Imaginează-ți un dulap cu 50 de sertare numerotate. Când vrei să depozitezi ceva (valoare) cu un nume (cheie), folosești o formulă magică care transformă numele în numărul unui sertar (0-49). Așa știi exact unde să pui și unde să găsești lucrurile tale!

---

## Cum funcționează acest algoritm?

### 1. **Constructor**

```javascript
constructor(size) {
  this.data = new Array(size);
}
```

- Creează un array (listă) cu dimensiunea specificată
- În exemplul nostru: `new HashTable(50)` creează un array cu 50 de poziții
- Fiecare poziție poate stoca multiple perechi cheie-valoare (pentru a gestiona coliziunile)

---

### 2. **Funcția de Hash** `_hash(key)`

```javascript
_hash(key) {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash + key.charCodeAt(i) * i) % this.data.length;
  }
  return hash;
}
```

#### Ce face?

Transformă o cheie (string) într-un număr (index) între 0 și dimensiunea array-ului.

#### Cum funcționează pas cu pas:

1. **Pornește cu hash = 0**
2. **Pentru fiecare caracter din cheie:**
   - Ia codul ASCII al caracterului (ex: 'a' = 97)
   - Înmulțește cu poziția caracterului (i)
   - Adună la hash
3. **Aplică modulo** (%) cu dimensiunea array-ului pentru a obține un index valid

#### Exemplu:

Pentru cheia `"grapes"` și array de dimensiune 50:

- 'g' (103) × 0 = 0
- 'r' (114) × 1 = 114
- 'a' (97) × 2 = 194
- ... și așa mai departe
- Rezultat final: un număr între 0-49

> **Notă:** Underscore-ul `_hash` indică că este o metodă privată (convenție JavaScript)

---

### 3. **Metoda `set(key, value)`** - Adaugă date

```javascript
set(key, value) {
  let address = this._hash(key);           // Găsește index-ul
  if (!this.data[address]) {               // Dacă acea poziție e goală
    this.data[address] = [];               // Creează un array gol
  }
  this.data[address].push([key, value]);   // Adaugă perechea [cheie, valoare]
  return this.data;
}
```

#### Pași:

1. **Calculează index-ul** folosind funcția hash
2. **Verifică dacă există deja un "bucket"** (coș) la acel index
3. **Dacă nu există,** creează un array gol (pentru coliziuni)
4. **Adaugă perechea** `[cheie, valoare]` în bucket

#### Exemplu vizual:

```
myHashTable.set("grapes", 10000)

Înainte:  data[23] = undefined
După:     data[23] = [["grapes", 10000]]

myHashTable.set("apples", 5000)  // Presupunem că hash("apples") = 23 (coliziune!)

După:     data[23] = [["grapes", 10000], ["apples", 5000]]
```

---

### 4. **Metoda `get(key)`** - Recuperează date

```javascript
get(key) {
  let address = this._hash(key);           // Găsește index-ul
  const currentBucket = this.data[address]; // Ia bucket-ul de la acel index

  if (currentBucket) {                      // Dacă bucket-ul există
    for (let i = 0; i < currentBucket.length; i++) {
      if (currentBucket[i][0] === key) {    // Caută cheia exactă
        return currentBucket[i][1];         // Returnează valoarea
      }
    }
  }
  return undefined;                         // Dacă nu găsește, returnează undefined
}
```

#### Pași:

1. **Calculează index-ul** cu aceeași funcție hash
2. **Ia bucket-ul** (array-ul) de la acel index
3. **Dacă bucket-ul există:**
   - Parcurge fiecare pereche `[cheie, valoare]`
   - Compară cheile până găsește potrivirea exactă
   - Returnează valoarea corespunzătoare
4. **Dacă nu găsește nimic,** returnează `undefined`

---

### 5. **Metoda `keys()`** - Returnează toate cheile

```javascript
keys() {
  const keysArray = [];
  for (let i = 0; i < this.data.length; i++) {
    if (this.data[i]) {
      for (let j = 0; j < this.data[i].length; j++) {
        keysArray.push(this.data[i][j][0]);
      }
    }
  }
  return keysArray;
}
```

#### Ce face?

Returnează un array cu toate cheile stocate în hash table.

#### Cum funcționează pas cu pas:

1. **Creează un array gol** pentru a stoca cheile
2. **Iterează prin toate pozițiile** din array-ul principal (de la 0 la dimensiune)
3. **Pentru fiecare bucket care există:**
   - Parcurge toate perechile `[cheie, valoare]` din bucket
   - Extrage cheia (primul element al perechii)
   - Adaugă cheia în array-ul de rezultate
4. **Returnează array-ul** cu toate cheile

#### De ce două bucle?

- **Prima buclă** (i) - parcurge toate pozițiile din hash table
- **A doua buclă** (j) - parcurge toate perechile dintr-un bucket (necesară pentru coliziuni!)

#### Exemplu:

```javascript
const myHashTable = new HashTable(50);
myHashTable.set("grapes", 10000);
myHashTable.set("apples", 5000);
myHashTable.set("oranges", 7500);

console.log(myHashTable.keys());
// Output: ["grapes", "apples", "oranges"]
```

> **Notă:** Ordinea cheilor nu este garantată, deoarece depinde de funcția hash și de pozițiile în care sunt stocate.

#### Complexitate temporală:

- **O(n)** - unde n este numărul total de elemente
- Trebuie să parcurgă întregul hash table pentru a colecta toate cheile

---

## Gestionarea Coliziunilor

### Ce este o coliziune?

Când două chei diferite generează același hash (același index).

### Cum le rezolvă acest algoritm?

**Separate Chaining** (înlănțuire separată):

- Fiecare poziție din array conține un **array de perechi**
- Dacă apar coliziuni, perechile se stochează în același bucket
- La recuperare, se caută în bucket cheia exactă

#### Exemplu:

```
Index 23: [["grapes", 10000], ["apples", 5000]]
          ↑                    ↑
       Prima pereche      A doua pereche (coliziune)
```

---

## Complexitate Temporală

| Operație   | Caz mediu | Caz cel mai rău |
| ---------- | --------- | --------------- |
| **set()**  | O(1)      | O(n)            |
| **get()**  | O(1)      | O(n)            |
| **keys()** | O(n)      | O(n)            |

### Explicație:

- **O(1)** - Constant: De obicei, hash-ul găsește direct poziția (foarte rapid!)
- **O(n)** - Liniar: În cel mai rău caz, toate cheile au coliziuni și trebuie să parcurgi toate elementele din bucket
- **keys()** este întotdeauna O(n) pentru că trebuie să parcurgă toate elementele pentru a le colecta

---

## Exemplu de Utilizare

```javascript
// Creează un hash table cu 50 de sloturi
const myHashTable = new HashTable(50);

// Adaugă date
myHashTable.set("grapes", 10000); // Prețul strugurilor
myHashTable.set("apples", 5000); // Prețul merelor
myHashTable.set("oranges", 7500); // Prețul portocalelor

// Recuperează date
console.log(myHashTable.get("grapes")); // Output: 10000
console.log(myHashTable.get("apples")); // Output: 5000
console.log(myHashTable.get("bananas")); // Output: undefined (nu există)

// Obține toate cheile
console.log(myHashTable.keys()); // Output: ["grapes", "apples", "oranges"]

// Vizualizează structura
console.log("HASH TABLE: ", myHashTable);
```

---

## Avantaje și Dezavantaje

### ✅ Avantaje:

- **Foarte rapid** pentru căutare, inserare și ștergere (în medie O(1))
- **Flexibil** - poți folosi orice string ca și cheie
- **Eficient** pentru stocarea și accesarea datelor

### ❌ Dezavantaje:

- **Coliziunile** pot încetini performanța
- **Nu este ordonat** - nu poți itera prin date în ordine
- **Consumă memorie** - trebuie să aloci spațiu în avans
- Funcția hash poate fi **computațional costisitoare** pentru chei mari

---

## Cazuri de Utilizare în Practică

1. **Baze de date** - indexarea rapidă a datelor
2. **Cache-uri** - stocarea temporară a rezultatelor
3. **Dicționare și obiecte** în JavaScript (sunt implementate cu hash tables!)
4. **Verificarea duplicatelor** într-o listă
5. **Contorizarea frecvenței** elementelor

---

## Îmbunătățiri Posibile

1. **Redimensionare dinamică** - mărește array-ul când se umple
2. **Funcție hash mai bună** - reduce coliziunile
3. **Metoda delete()** - șterge o pereche cheie-valoare
4. **Metoda values()** - returnează toate valorile
5. **Metoda entries()** - returnează toate perechile [cheie, valoare]

---

## Resurse Suplimentare

- [Hash Table - Wikipedia](https://en.wikipedia.org/wiki/Hash_table)
- [JavaScript Objects vs Hash Tables](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [Collision Resolution Techniques](https://en.wikipedia.org/wiki/Hash_table#Collision_resolution)

---

## Concluzie

Hash Table-ul este o structură de date **fundamentală și puternică** care oferă acces rapid la date. Înțelegerea modului în care funcționează te ajută să:

- Scrii cod mai eficient
- Înțelegi cum funcționează obiectele JavaScript
- Te pregătești pentru interviuri tehnice
- Rezolvi probleme complexe de programare

**Timpul de acces mediu O(1) face hash table-urile ideale pentru scenarii unde viteza este esențială!** 🚀
