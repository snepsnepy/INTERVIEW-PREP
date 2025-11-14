# Queue - Explicație Pas cu Pas

## Ce este o Queue (Coadă)?

O **Queue** este o structură de date care funcționează pe principiul **FIFO (First In, First Out)** - primul element adăugat este primul care va fi scos. Este similar cu o coadă la magazin: prima persoană care intră în coadă este prima care va fi servită.

## Structura Queue

Queue-ul nostru este implementat folosind **linked list nodes** și are:

- `first` - pointer către primul element (cel care va fi scos următorul)
- `last` - pointer către ultimul element (cel mai recent adăugat)
- `length` - numărul de elemente din queue

```
first → [Joy] → [Matt] → [Pavel] → [Samir] ← last
```

---

## 1. ENQUEUE (Adăugare Element)

### Ce face?

Adaugă un element nou **la sfârșitul** queue-ului.

### Pași Detaliari:

#### Pas 1: Crearea nodului nou

```javascript
const newNode = new Node(value);
// newNode = { value: "Joy", next: null }
```

#### Pas 2: Verificare dacă queue-ul este gol

```javascript
if (this.length === 0) {
  this.first = newNode;
  this.last = newNode;
}
```

**Exemplu vizual - Queue gol:**

```
Înainte: first = null, last = null, length = 0
După:    first → [Joy] ← last, length = 1
```

#### Pas 3: Dacă queue-ul NU este gol

```javascript
else {
  this.last.next = newNode;  // Legăm ultimul nod de noul nod
  this.last = newNode;        // Noul nod devine ultimul
}
```

**Exemplu vizual - Queue cu elemente:**

```
Înainte: first → [Joy] → [Matt] ← last

Pasul 3a: Legăm last.next la newNode
         first → [Joy] → [Matt] → [Pavel]
                           ↑              ↑
                          last         newNode

Pasul 3b: Mutăm pointer-ul last
         first → [Joy] → [Matt] → [Pavel] ← last
```

#### Pas 4: Incrementare lungime

```javascript
this.length++;
```

### Complexitate Timp: O(1)

Operație constantă - nu depinde de mărimea queue-ului.

---

## 2. DEQUEUE (Scoatere Element)

### Ce face?

Scoate primul element din queue (cel din față).

### Pași Detaliari:

#### Pas 1: Verificare dacă queue-ul este gol

```javascript
if (!this.first) {
  return null;
}
```

**Exemplu:**

```
Queue gol: first = null, last = null
→ Returnează null
```

#### Pas 2: Verificare dacă există un singur element

```javascript
if (this.first === this.last) {
  this.last = null;
}
```

**Exemplu vizual:**

```
Înainte: first → [Joy] ← last, length = 1

După Pas 2: first → [Joy], last = null
(urmează să scoatem și first în pasul următor)
```

**De ce?** Când scoatem ultimul element, trebuie să setăm `last` la `null` pentru că queue-ul va fi gol.

#### Pas 3: Mutare pointer first

```javascript
this.first = this.first.next;
```

**Exemplu vizual - Queue cu mai multe elemente:**

```
Înainte: first → [Joy] → [Matt] → [Pavel] ← last

După:           first → [Matt] → [Pavel] ← last
                [Joy] (va fi garbage collected)
```

#### Pas 4: Decrementare lungime și returnare

```javascript
this.length--;
return this;
```

### Complexitate Timp: O(1)

Operație constantă - scoatem doar primul element.

---

## 3. PEEK (Vizualizare Primul Element)

### Ce face?

Returnează primul element **fără** să-l scoată din queue.

### Pași:

```javascript
peek() {
  console.log("FIRST: ", this.first);
  return this.first;
}
```

**Exemplu vizual:**

```
Queue: first → [Joy] → [Matt] → [Pavel] ← last

peek() → returnează [Joy]

Queue rămâne neschimbat:
       first → [Joy] → [Matt] → [Pavel] ← last
```

### Complexitate Timp: O(1)

Doar accesăm pointer-ul `first`.

---

## 4. PRINT QUEUE (Afișare Toate Elementele)

### Ce face?

Afișează toate elementele din queue într-un array.

### Pași Detaliari:

#### Pas 1: Inițializare array și pointer

```javascript
const array = [];
let currentNode = this.first;
```

**Exemplu:**

```
Queue: first → [Joy] → [Matt] → [Pavel] ← last
       currentNode = first
       array = []
```

#### Pas 2: Iterare prin toate nodurile

```javascript
while (currentNode !== null) {
  array.push(currentNode.value);
  currentNode = currentNode.next;
}
```

**Exemplu vizual - Iterații:**

**Iterația 1:**

```
currentNode → [Joy] → [Matt] → [Pavel]
array = ["Joy"]
currentNode = currentNode.next
```

**Iterația 2:**

```
currentNode → [Matt] → [Pavel]
array = ["Joy", "Matt"]
currentNode = currentNode.next
```

**Iterația 3:**

```
currentNode → [Pavel]
array = ["Joy", "Matt", "Pavel"]
currentNode = currentNode.next
```

**Iterația 4:**

```
currentNode = null (sfârșitul queue-ului)
→ Loop se oprește
array = ["Joy", "Matt", "Pavel"]
```

#### Pas 3: Afișare array

```javascript
console.log(array);
```

### Complexitate Timp: O(n)

Trebuie să parcurgem toate elementele (n = numărul de elemente).

---

## Exemplu Complet - Pas cu Pas

```javascript
const myQueue = new Queue();
// Queue: gol (first = null, last = null, length = 0)

myQueue.enqueue("Joy");
// Queue: first → [Joy] ← last, length = 1

myQueue.enqueue("Matt");
// Queue: first → [Joy] → [Matt] ← last, length = 2

myQueue.enqueue("Pavel");
// Queue: first → [Joy] → [Matt] → [Pavel] ← last, length = 3

myQueue.enqueue("Samir");
// Queue: first → [Joy] → [Matt] → [Pavel] → [Samir] ← last, length = 4

myQueue.peek();
// Returnează: [Joy] (primul element)
// Queue rămâne: first → [Joy] → [Matt] → [Pavel] → [Samir] ← last

myQueue.dequeue();
// Scoate: [Joy]
// Queue devine: first → [Matt] → [Pavel] → [Samir] ← last, length = 3

myQueue.printQueue();
// Afișează: ["Matt", "Pavel", "Samir"]
```

---

## Rezumat Complexități

| Operație | Complexitate Timp | Complexitate Spațiu |
| -------- | ----------------- | ------------------- |
| enqueue  | O(1)              | O(1)                |
| dequeue  | O(1)              | O(1)                |
| peek     | O(1)              | O(1)                |
| print    | O(n)              | O(n)                |

---

## Cazuri Edge (Limite)

### 1. Dequeue pe Queue Gol

```javascript
const emptyQueue = new Queue();
emptyQueue.dequeue(); // → returnează null
```

### 2. Dequeue până când Queue devine gol

```javascript
const q = new Queue();
q.enqueue("A");
q.dequeue(); // first = null, last = null, length = 0
```

### 3. Enqueue pe Queue Gol

```javascript
const q = new Queue();
q.enqueue("First"); // first și last pointează la același nod
```

---

## Avantaje vs Dezavantaje

### ✅ Avantaje

- **O(1)** pentru enqueue și dequeue
- Menține ordinea FIFO
- Implementare eficientă cu linked list

### ❌ Dezavantaje

- Nu poți accesa elemente din mijloc direct
- Nu poți căuta un element specific fără să parcurgi tot queue-ul (O(n))
- Folosește mai multă memorie decât un array simplu (fiecare nod are pointer către next)

---

## Aplicații Practice

1. **Task Scheduling** - procesarea task-urilor în ordinea primirii
2. **Printer Queue** - documentele se printează în ordinea în care au fost trimise
3. **BFS (Breadth-First Search)** - în grafuri și arbori
4. **Server Request Handling** - cererile sunt procesate FIFO
5. **Customer Service** - sistemele de ticketing

---

## Comparație cu Stack

| Aspect    | Queue (Coadă)      | Stack (Stivă)     |
| --------- | ------------------ | ----------------- |
| Principiu | FIFO               | LIFO              |
| Adăugare  | La final (enqueue) | La final (push)   |
| Scoatere  | Din față (dequeue) | Din final (pop)   |
| Exemplu   | Coadă la magazin   | Stivă de farfurii |
