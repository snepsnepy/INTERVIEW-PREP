# Binary Search Tree - Funcția Insert

## Explicație Detaliată

Funcția `insert` din Binary Search Tree adaugă un nod nou în arbore, respectând regula BST:

- Valorile mai mici decât nodul curent merg la **stânga**
- Valorile mai mari sau egale merg la **dreapta**

## Codul Funcției

```javascript
insert(value) {
  const newNode = new Node(value);

  if (this.root === null) {
    this.root = newNode;
  } else {
    let currentNode = this.root;
    while (true) {
      // Left
      if (value < currentNode.value) {
        if (!currentNode.left) {
          currentNode.left = newNode;
          return this;
        }
        currentNode = currentNode.left;
      } else {
        // Right
        if (!currentNode.right) {
          currentNode.right = newNode;
          return this;
        }
        currentNode = currentNode.right;
      }
    }
  }
}
```

## 📊 Diagramă - Procesul de Inserare

### **Pas 1: Primul Nod (Rădăcina)**

Inserăm `tree.insert(9)`

```
ÎNAINTE:            DUPĂ:
(arbore gol)          9
root = null      (root = 9)
```

**Logica:** Dacă `root === null`, noul nod devine rădăcina.

---

### **Pas 2: Inserăm 4**

`tree.insert(4)` - comparam cu 9

```
Comparare: 4 < 9? ✓ (DA) → mergi la STÂNGA

    9
   /
  4
```

**Decizie:** 4 < 9, deci merge la stânga. Poziția e liberă → inserăm aici.

---

### **Pas 3: Inserăm 20**

`tree.insert(20)` - comparam cu 9

```
Comparare: 20 < 9? ✗ (NU) → mergi la DREAPTA

    9
   / \
  4   20
```

**Decizie:** 20 > 9, deci merge la dreapta. Poziția e liberă → inserăm aici.

---

### **Pas 4: Inserăm 1**

`tree.insert(1)` - parcurgere multiplă

```
Step 1: 1 < 9? ✓ → stânga
        ↓
    9
   /
  4

Step 2: 1 < 4? ✓ → stânga
        ↓
    9
   / \
  4   20
 /
1

REZULTAT: 1 ajunge la stânga lui 4
```

---

### **Pas 5: Inserăm 6**

`tree.insert(6)` - parcurgere multiplă

```
Step 1: 6 < 9? ✓ → stânga
        ↓
Step 2: 6 < 4? ✗ → dreapta
        ↓
    9
   / \
  4   20
 / \
1   6

REZULTAT: 6 ajunge la dreapta lui 4
```

---

### **Pas 6: Inserăm 15**

`tree.insert(15)` - parcurgere multiplă

```
Step 1: 15 < 9? ✗ → dreapta
        ↓
Step 2: 15 < 20? ✓ → stânga
        ↓
    9
   / \
  4   20
 / \ /
1  6 15

REZULTAT: 15 ajunge la stânga lui 20
```

---

### **Pas 7: Inserăm 170**

`tree.insert(170)` - parcurgere multiplă

```
Step 1: 170 < 9? ✗ → dreapta
        ↓
Step 2: 170 < 20? ✗ → dreapta
        ↓
       9
      / \
     4   20
    / \ / \
   1  6 15 170

REZULTAT FINAL!
```

---

## 🔄 Algoritmul în Pseudocod

```
FUNCȚIE insert(valoare):
  1. Creează newNode cu valoarea dată

  2. DACĂ arborele este gol (root === null):
     └─> Setează root = newNode
     └─> GATA!

  3. ALTFEL:
     └─> currentNode = root
     └─> BUCLĂ INFINITĂ:
         │
         ├─> DACĂ valoare < currentNode.value:
         │   ├─> DACĂ currentNode.left este gol:
         │   │   └─> Pune newNode aici
         │   │   └─> RETURN (GATA!)
         │   └─> ALTFEL:
         │       └─> currentNode = currentNode.left
         │
         └─> ALTFEL (valoare >= currentNode.value):
             ├─> DACĂ currentNode.right este gol:
             │   └─> Pune newNode aici
             │   └─> RETURN (GATA!)
             └─> ALTFEL:
                 └─> currentNode = currentNode.right
```

---

## 🎯 Pașii Algoritmului

1. **Creează noul nod** cu valoarea dată
2. **Verifică dacă arborele e gol:**
   - Dacă DA → noul nod devine rădăcina
   - Dacă NU → mergi la pasul 3
3. **Începe de la rădăcină** (currentNode = root)
4. **Compară valoarea nouă cu currentNode:**
   - Dacă `value < currentNode.value` → mergi la STÂNGA
   - Dacă `value >= currentNode.value` → mergi la DREAPTA
5. **La direcția aleasă:**
   - Dacă poziția e LIBERĂ → inserează noul nod aici (GATA!)
   - Dacă poziția e OCUPATĂ → mută currentNode la acel nod și repetă de la pasul 4

---

## ⏱️ Complexitate

- **Timp:** O(log n) în cazul cel mai bun (arbore echilibrat)
- **Timp:** O(n) în cazul cel mai rău (arbore degenerat - listă)
- **Spațiu:** O(1) - iterativ, fără recursie

---

## 📝 Observații

1. Funcția folosește o **buclă while(true)** care se oprește prin `return` când găsește poziția liberă
2. Algoritmul este **iterativ** (nu recursiv), deci nu consumă stack space
3. Valori **duplicate** (egale) merg la **dreapta** conform codului actual (`else` branch)
4. Funcția returnează `this` pentru a permite **method chaining**
