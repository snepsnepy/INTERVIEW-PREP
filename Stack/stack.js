class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.top = null;
    this.bottom = null;
    this.length = 0;
  }

  peek() {
    console.log("Top: ", this.top);
    return this.top;
  }

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

  pop() {
    if (!this.top) {
      return null;
    }

    if (this.top === this.bottom) {
      this.bottom = null;
    }
    // const holdingPointer = this.top;
    this.top = this.top.next;
    this.length--;

    return this;
  }

  printStack() {
    const array = [];
    let currentNode = this.top;

    while (currentNode !== null) {
      array.push(currentNode.value);
      currentNode = currentNode.next;
    }

    console.log(array);
  }
}

const myStack = new Stack();
myStack.push("Google");
myStack.push("Udemy");
myStack.push("Discord");

myStack.peek();
myStack.pop();
myStack.pop();

console.log(myStack);
