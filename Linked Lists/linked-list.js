// Implementare Listă Înlănțuită
// Exemplu: 1 --> 10 --> 99 --> 5 --> 16

/**
 * Reprezintă un singur nod într-o listă înlănțuită
 * @class Node
 */
class Node {
  /**
   * Creează un nou Nod
   * @param {*} value - Valoarea care va fi stocată în nod
   */
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

/**
 * Implementare Listă Înlănțuită Simplă
 * O structură de date liniară unde elementele sunt legate folosind pointeri
 * @class LinkedList
 */
class LinkedList {
  /**
   * Creează o nouă Listă Înlănțuită cu o valoare inițială
   * @param {*} value - Valoarea pentru primul nod
   */
  constructor(value) {
    this.head = {
      value: value,
      next: null,
    };
    this.tail = this.head;
    this.length = 1;
  }

  /**
   * Adaugă un nod nou la începutul listei
   * Complexitate temporală: O(1)
   * @param {*} value - Valoarea de adăugat
   */
  prepend(value) {
    const newNode = new Node(value);
    newNode.next = this.head;
    this.head = newNode;
    this.length++;
  }

  /**
   * Adaugă un nod nou la sfârșitul listei
   * Complexitate temporală: O(1)
   * @param {*} value - Valoarea de adăugat
   * @returns {LinkedList} Instanța curentă a listei pentru înlănțuire
   */
  append(value) {
    const newNode = new Node(value);
    this.tail.next = newNode;
    this.tail = newNode;
    this.length++;
    return this;
  }

  /**
   * Parcurge lista pentru a găsi nodul la un anumit index
   * Complexitate temporală: O(n)
   * @param {number} index - Indexul la care să se parcurgă
   * @returns {Node} Nodul de la indexul specificat
   * @private
   */
  traverseToIndex(index) {
    let counter = 0;
    let currentNode = this.head;

    while (counter !== index) {
      currentNode = currentNode.next;
      counter++;
    }

    return currentNode;
  }

  /**
   * Inserează un nod nou la un index specific
   * Dacă index >= length, se adaugă la final
   * Complexitate temporală: O(n)
   * @param {number} index - Poziția unde să se insereze
   * @param {*} value - Valoarea de inserat
   * @returns {Function} Referință către metoda printList
   */
  insert(index, value) {
    // Dacă indexul este în afara limitelor, adaugă la final
    if (index >= this.length) {
      return this.append(value);
    }

    const newNode = new Node(value);

    // Găsește nodul dinaintea punctului de inserare
    const leader = this.traverseToIndex(index - 1);
    const holdingPointer = leader.next;
    leader.next = newNode;
    newNode.next = holdingPointer;
    this.length++;
    return this.printList;
  }

  /**
   * Elimină un nod la un index specific
   * Complexitate temporală: O(n)
   * @param {number} index - Poziția nodului de eliminat
   * @returns {Function} Referință către metoda printList
   */
  remove(index) {
    // Găsește nodul dinaintea celui de eliminat
    const leader = this.traverseToIndex(index - 1);
    const unwantedNode = leader.next;

    // Sărim peste nodul nedorit
    leader.next = unwantedNode.next;
    this.length--;

    return this.printList;
  }

  /**
   * Afișează toate valorile din listă ca un array
   * Complexitate temporală: O(n)
   * @returns {void}
   */
  printList() {
    const array = [];
    let currentNode = this.head;

    while (currentNode !== null) {
      array.push(currentNode.value);
      currentNode = currentNode.next;
    }

    console.log(array);
  }
}

const myLinkedList = new LinkedList(10);
myLinkedList.prepend(1);
myLinkedList.append(5);
myLinkedList.append(16);
myLinkedList.insert(2, 99);
// myLinkedList.remove(2);
myLinkedList.printList();
