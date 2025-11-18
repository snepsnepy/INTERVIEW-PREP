class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

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

  lookup(value) {
    if (!this.root) {
      return false;
    }

    let currentNode = this.root;

    while (currentNode) {
      if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else if (value > currentNode.value) {
        currentNode = currentNode.right;
      } else if (currentNode.value === value) {
        console.log("Found Node: ", JSON.stringify(currentNode));
        return currentNode;
      }
    }

    return false;
  }

  //       9
  //   4      20
  //1    6  15   170

  breadthFirstSearch() {
    let currentNode = this.root;
    let list = [];
    let queue = []; //Keep track of the level so we can access the children

    queue.push(currentNode); //Add to the queue the first item - root node in our case

    // Go from the root node to the children node - left -> right
    while (queue.length > 0) {
      currentNode = queue.shift(); // Returns and removes the first item in the queue
      console.log(currentNode.value);
      list.push(currentNode);

      if (currentNode.left) {
        queue.push(currentNode.left);
      }

      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }

    return list;
  }

  DFSInOrder() {
    return traverseInOrder(this.root, []);
  }

  DFSPreOrder() {
    return traversePreOrder(this.root, []);
  }

  DFSPostOrder() {
    return traversePostOrder(this.root, []);
  }
}

function traverseInOrder(node, list) {
  console.log("Traverse Node -> ", node.value);
  if (node.left) {
    traverseInOrder(node.left, list);
  }
  list.push(node.value);

  if (node.right) {
    traverseInOrder(node.right, list);
  }

  return list;
}

function traversePreOrder(node, list) {
  console.log("Traverse Node -> ", node.value);
  list.push(node.value);
  if (node.left) {
    traversePreOrder(node.left, list);
  }

  if (node.right) {
    traversePreOrder(node.right, list);
  }

  return list;
}

function traversePostOrder(node, list) {
  if (node.left) {
    traversePostOrder(node.left, list);
  }

  if (node.right) {
    traversePostOrder(node.right, list);
  }

  list.push(node.value);

  return list;
}

const tree = new BinarySearchTree();

tree.insert(9);
tree.insert(4);
tree.insert(20);
tree.insert(1);
tree.insert(6);
tree.insert(15);
tree.insert(170);

console.log(tree.DFSPostOrder());

// tree.breadthFirstSearch();

// tree.lookup(20);

// console.log(JSON.stringify(tree));

function traverse(node) {
  const tree = { value: node.value };
  tree.left = node.left === null ? null : traverse(node.left);
  tree.right = node.right === null ? null : traverse(node.right);

  console.log(tree);
  return tree;
}
