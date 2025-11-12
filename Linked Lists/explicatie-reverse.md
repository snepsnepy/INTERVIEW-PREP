# 🔄 Explicația Funcției `reverse()` - Inversarea unei Liste Înlănțuite

## 🎯 Conceptul de Bază

Inversarea unei liste înlănțuite înseamnă să schimbăm **direcția săgeților** între noduri.

**Lista noastră exemplu:** `1 → 10 → 16 → 88`

**Înainte:** `1 → 10 → 16 → 88 → null`  
**După:** `null ← 1 ← 10 ← 16 ← 88`  
**Rezultat:** `88 → 16 → 10 → 1 → null`

---

## 📍 Pregătire Inițială

```javascript
let first = this.head;      // first = 1
this.tail = this.head;      // tail = 1 (va deveni coada)
let second = first.next;    // second = 10
```

### Ce facem?
- `first` = unde suntem acum (nodul **1**)
- `second` = unde mergem după (nodul **10**)
- Marcăm că nodul **1** va deveni coada (ultimul element) după inversare

### Vizual:
```
first  second
  ↓      ↓
  1  →  10  →  16  →  88  →  null
```

---

## 🔄 Iterația 1 - Inversăm legătura între 1 și 10

### Pasul 1: Salvăm următorul nod
```javascript
const tmp = second.next;  // tmp = 16
```

**💡 De ce?** Pentru că vom schimba săgeata lui `second`, deci trebuie să salvăm unde pointează acum, altfel pierdem restul listei!

### Pasul 2: Inversăm săgeata
```javascript
second.next = first;  // 10.next = 1
```

**💡 Ce facem?** Săgeata lui 10 acum pointează înapoi la 1 (în loc să pointeze la 16)

**Vizual după inversare:**
```
  1  ←  10     16  →  88  →  null
```

### Pasul 3: Avansăm pointerele
```javascript
first = second;   // first = 10
second = tmp;     // second = 16
```

**💡 Ce facem?** Mutăm "fereastra" noastră cu un pas înainte pentru următoarea iterație

**Vizual - poziții noi:**
```
       first  second
         ↓      ↓
  1  ←  10     16  →  88  →  null
```

---

## 🔄 Iterația 2 - Inversăm legătura între 10 și 16

### Pasul 1: Salvăm următorul nod
```javascript
const tmp = second.next;  // tmp = 88
```

### Pasul 2: Inversăm săgeata
```javascript
second.next = first;  // 16.next = 10
```

**Vizual după inversare:**
```
  1  ←  10  ←  16     88  →  null
```

### Pasul 3: Avansăm pointerele
```javascript
first = second;   // first = 16
second = tmp;     // second = 88
```

**Vizual - poziții noi:**
```
              first  second
                ↓      ↓
  1  ←  10  ←  16     88  →  null
```

---

## 🔄 Iterația 3 - Inversăm legătura între 16 și 88

### Pasul 1: Salvăm următorul nod
```javascript
const tmp = second.next;  // tmp = null
```

### Pasul 2: Inversăm săgeata
```javascript
second.next = first;  // 88.next = 16
```

**Vizual după inversare:**
```
  1  ←  10  ←  16  ←  88     null
```

### Pasul 3: Avansăm pointerele
```javascript
first = second;   // first = 88
second = tmp;     // second = null
```

**Vizual - poziții noi:**
```
                     first  second
                       ↓      ↓
  1  ←  10  ←  16  ←  88     null
```

**💡 Bucla se oprește aici** pentru că `second = null` (nu mai sunt noduri)

---

## ✅ Ajustări Finale

### Pasul 1: Fixăm vechiul cap (care e acum coada)
```javascript
this.head.next = null;
```

**💡 De ce?** Nodul **1** era capul, acum e coada, deci trebuie să pointeze la `null`

### Pasul 2: Setăm noul cap
```javascript
this.head = first;  // head = 88
```

**💡 De ce?** Ultimul nod procesat (**88**) devine noul cap al listei

### Vizual - REZULTAT FINAL:
```
          tail              head
           ↓                 ↓
  null  ←  1  ←  10  ←  16  ←  88
```

**Lista inversată:** `[88, 16, 10, 1]`

---

## 🎓 Rezumat Simplu

### Algoritmul în 3 pași:

1. **Pornești** de la început cu două pointeri: `first` și `second`

2. **În fiecare iterație:**
   - Salvezi următorul nod în `tmp` (ca să nu-l pierzi)
   - Inversezi săgeata (nodul curent pointează înapoi)
   - Avansezi ambii pointeri cu un pas

3. **La final:** 
   - Ajustezi vechiul cap să pointeze la `null` (devine coadă)
   - Setezi noul cap la ultimul nod procesat

### Cheia Succesului 🔑

Variabila **`tmp`** ne salvează restul listei înainte să schimbăm legăturile! Fără ea, am pierde referința către restul nodurilor și nu am putea continua inversarea.

---

## 📊 Complexitate

- **Complexitate temporală:** O(n) - parcurgem lista o singură dată
- **Complexitate spațială:** O(1) - folosim doar 3 variabile auxiliare (first, second, tmp)

---

## 💻 Codul Complet

```javascript
reverse() {
  // Caz special: lista cu un singur element
  if (!this.head.next) {
    return this.head;
  }

  let first = this.head;
  this.tail = this.head; // Vechiul cap devine noua coadă
  let second = first.next;

  // Inversăm fiecare legătură
  while (second) {
    const tmp = second.next;    // Salvăm următorul
    second.next = first;        // Inversăm săgeata
    first = second;             // Avansăm first
    second = tmp;               // Avansăm second
  }

  // Ajustări finale
  this.head.next = null;  // Vechiul cap (acum coadă) → null
  this.head = first;      // Noul cap = ultimul nod procesat
}
```

---

## 🎯 Sfaturi pentru Interviuri

1. **Desenează diagramele** - Vizualizarea ajută enorm la înțelegere
2. **Explică de ce ai nevoie de `tmp`** - Demonstrează că înțelegi problema
3. **Menționează complexitatea** - O(n) timp, O(1) spațiu
4. **Testează cazuri speciale:**
   - Listă goală
   - Listă cu un singur element
   - Listă cu două elemente
   - Listă normală (3+ elemente)

---

**Notă:** Această explicație folosește exemplul listei `1 → 10 → 16 → 88` pentru claritate maximă.

