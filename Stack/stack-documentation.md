# Stack Documentation

## Descriere Generală

Un **Stack** (stivă) este o structură de date liniară care urmează principiul **LIFO** (Last In, First Out) - ultimul element adăugat este primul element eliminat. Conceptul este similar cu o stivă de farfurii: poți adăuga farfurii doar deasupra și poți scoate doar farfuria de deasupra.

## Structura Implementării

### Clasa Node

```javascript
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
```

**Node** reprezintă un nod individual în stack:
- `value`: valoarea stocată în nod
- `next`: referință către următorul nod din stack (cel de dedesubt)

### Clasa Stack

```javascript
class Stack {
  constructor() {
    this.top = null;      // Vârful stivei
    this.bottom = null;   // Baza stivei
    this.length = 0;      // Numărul de elemente
  }
}
```

**Proprietăți:**
- `top`: referință către elementul de sus (cel mai recent adăugat)
- `bottom`: referință către elementul de jos (cel mai vechi)
- `length`: numărul total de elemente din stack

## Metode și Complexitatea Lor

### 1. peek()

```javascript
peek() {
  console.log("Top: ", this.top);
  return this.top;
}
```

**Descriere:** Returnează elementul din vârful stack-ului fără a-l elimina.

**Complexitate Temporală:** O(1)  
**Complexitate Spațială:** O(1)

**Utilizare:**
```javascript
myStack.peek(); // Afișează elementul din vârf
```

---

### 2. push(value)

```javascript
push(value) {
  const newNode = new Node(value);
  
  if (this.length === 0) {
    this.top = newNode;
    this.bottom = newNode;
  } else {
    const holdingPointer = this.top;
    this.top = newNode;
    this.top.next = holdingPointer;
  }
  
  this.length++;
  return this;
}
```

**Descriere:** Adaugă un element nou în vârful stack-ului.

**Pași:**
1. Creează un nou nod cu valoarea dată
2. Dacă stack-ul este gol, noul nod devine atât `top` cât și `bottom`
3. Dacă stack-ul conține elemente:
   - Salvează referința către vârful curent
   - Noul nod devine noul vârf
   - Leagă noul vârf de vechiul vârf
4. Incrementează lungimea stack-ului

**Complexitate Temporală:** O(1)  
**Complexitate Spațială:** O(1)

**Utilizare:**
```javascript
myStack.push("Google");
myStack.push("Udemy");
```

---

### 3. pop()

```javascript
pop() {
  if (!this.top) {
    return null;
  }
  
  if (this.top === this.bottom) {
    this.bottom = null;
  }
  
  this.top = this.top.next;
  this.length--;
  
  return this;
}
```

**Descriere:** Elimină și returnează elementul din vârful stack-ului.

**Pași:**
1. Verifică dacă stack-ul este gol - returnează `null`
2. Dacă există un singur element, setează `bottom` la `null`
3. Mută `top` la următorul nod (cel de dedesubt)
4. Decrementează lungimea stack-ului

**Complexitate Temporală:** O(1)  
**Complexitate Spațială:** O(1)

**Cazuri speciale:**
- Stack gol → returnează `null`
- Un singur element → setează ambele `top` și `bottom` la `null`

**Utilizare:**
```javascript
myStack.pop(); // Elimină elementul din vârf
```

---

### 4. printStack()

```javascript
printStack() {
  const array = [];
  let currentNode = this.top;
  
  while (currentNode !== null) {
    array.push(currentNode.value);
    currentNode = currentNode.next;
  }
  
  console.log(array);
}
```

**Descriere:** Afișează toate elementele din stack ca un array (de la vârf la bază).

**Pași:**
1. Creează un array gol
2. Parcurge stack-ul de la `top` până la ultimul nod
3. Adaugă fiecare valoare în array
4. Afișează array-ul în consolă

**Complexitate Temporală:** O(n) - unde n este numărul de elemente  
**Complexitate Spațială:** O(n) - pentru array-ul rezultat

**Utilizare:**
```javascript
myStack.printStack(); // ["Discord", "Udemy", "Google"]
```

---

## Exemplu de Utilizare

```javascript
const myStack = new Stack();

// Adăugare elemente
myStack.push("Google");   // Stack: ["Google"]
myStack.push("Udemy");    // Stack: ["Udemy", "Google"]
myStack.push("Discord");  // Stack: ["Discord", "Udemy", "Google"]

// Vizualizare vârf
myStack.peek();           // Output: Top: Node { value: "Discord", next: ... }

// Eliminare elemente
myStack.pop();            // Stack: ["Udemy", "Google"]
myStack.pop();            // Stack: ["Google"]

// Afișare stack
console.log(myStack);     
// Output: Stack { top: Node, bottom: Node, length: 1 }
```

---

## Complexitatea Operațiilor - Rezumat

| Operație | Complexitate Temporală | Complexitate Spațială |
|----------|------------------------|------------------------|
| peek()   | O(1)                   | O(1)                   |
| push()   | O(1)                   | O(1)                   |
| pop()    | O(1)                   | O(1)                   |
| printStack() | O(n)               | O(n)                   |

---

## Avantaje și Dezavantaje

### ✅ Avantaje:
- **Operații O(1)**: Push și pop sunt extrem de rapide
- **Simplu de implementat**: Logica este directă
- **Eficient pentru memoria**: Nu necesită realocări ca un array dinamic
- **Ideal pentru**: recursivitate, undo/redo, backtracking, evaluare expresii

### ❌ Dezavantaje:
- **Acces limitat**: Poți accesa doar elementul din vârf
- **Nu suportă căutare**: Trebuie să scoți elemente pentru a căuta
- **Overhead de memorie**: Fiecare nod necesită memorie suplimentară pentru pointer

---

## Cazuri de Utilizare

1. **Browser History** - butonul "Back"
2. **Undo/Redo** în editoare
3. **Function Call Stack** - gestionarea apelurilor de funcții
4. **Expression Evaluation** - evaluarea expresiilor matematice
5. **Backtracking Algorithms** - DFS (Depth-First Search)
6. **Parentheses Matching** - verificarea echilibrului parantezelor

---

## Diferențe Stack vs Queue

| Caracteristică | Stack (Stivă) | Queue (Coadă) |
|----------------|---------------|---------------|
| Principiu      | LIFO          | FIFO          |
| Inserare       | Top (vârf)    | Rear (spate)  |
| Eliminare      | Top (vârf)    | Front (față)  |
| Folosință      | Undo, Recursivitate | Task scheduling, BFS |

---

## Implementare Alternativă cu Array

Stack-ul poate fi implementat și cu un array JavaScript:

```javascript
class StackArray {
  constructor() {
    this.items = [];
  }
  
  push(value) {
    this.items.push(value);
  }
  
  pop() {
    return this.items.pop();
  }
  
  peek() {
    return this.items[this.items.length - 1];
  }
}
```

**Notă:** Implementarea cu linked list (ca în codul nostru) este mai eficientă pentru operații frecvente de push/pop, deoarece nu necesită realocări de memorie.

---

## Concluzii

Stack-ul este o structură de date fundamentală în programare, esențială pentru înțelegerea recursivității și a multor algoritmi avansați. Implementarea cu linked list oferă performanță constantă O(1) pentru toate operațiile principale, făcând-o ideală pentru aplicații care necesită adăugări și eliminări frecvente.

