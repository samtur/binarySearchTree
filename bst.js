// Class for node
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

// Class for tree
class Tree {
  constructor(arr, start, end) {
    this.root = buildTree(arr, start, end);
  }
}

// Build tree from sorted array function
function buildTree(arr, start, end) {
  // base case
  if (start > end) {
    return null;
  }
  //   Get mid element of array and make new node with this element
  const mid = Math.floor((start + end) / 2);
  const node = new Node(arr[mid]);

  //   recursively construct left subtree and make it left child of root
  node.left = buildTree(arr, start, mid - 1);
  //   recurivesly construct right subtree and make it right child of root
  node.right = buildTree(arr, mid + 1, end);
  return node;
}

// Function for inserting in tree

function insert(data, root) {
  root = insertRec(root, data);
}

function insertRec(root, data) {
  if (root === null) {
    root = new Node(data);
    return root;
  }
  if (data < root.data) {
    root.left = insertRec(root.left, data);
  } else if (data > root.data) {
    root.right = insertRec(root.right, data);
  }
  return root;
}

// Function breadth first search BFS traversal
function levelOrder(root, result = [], queue = []) {
  if (root === null) return;
  result.push(root.data);
  queue.push(root.left);
  queue.push(root.right);
  while (queue.length) {
    const firstInQueue = queue[0];
    queue.shift();
    levelOrder(firstInQueue, result, queue);
  }
  return result;
}

// Function depth first search DFS traversal

function inOrder(root, result = []) {
  if (root !== null) {
    inOrder(root.left, result);
    result.push(root.data);
    inOrder(root.right, result);
  }
  return result;
}

function preOrder(root, result = []) {
  if (root !== null) {
    result.push(root.data);
    preOrder(root.left, result);
    preOrder(root.right, result);
  }
  return result;
}

function postOrder(root, result = []) {
  if (root !== null) {
    postOrder(root.left, result);
    postOrder(root.right, result);
    result.push(root.data);
  }
  return result;
}

// Function to find tree height of a node
// Find the node you are looking for
// Once found check how many edges until a leaf node along the longest path
// Return number of edges
// CORRECT FIND HEIGHT FUNCTION
function findHeight(root, value) {
  // Base case if root is null return -1
  if (root === null) {
    return -1;
  }

  // If the root is the value return height of 0
  if (root.data === value.data) {
    return 0;
  }

  const leftHeight = findHeight(root.left, value);
  const rightHeight = findHeight(root.right, value);

  if (leftHeight !== -1) {
    return leftHeight + 1;
  }

  if (rightHeight !== -1) {
    return rightHeight + 1;
  }

  return -1;
}

// Function for finding Node
function find(root, value) {
  if (root === null) {
    return null;
  }
  if (root.data === value) {
    return root;
  } else {
    const leftResult = find(root.left, value);
    const rightResult = find(root.right, value);
    if (leftResult !== null) {
      return leftResult;
    } else if (rightResult !== null) {
      return rightResult;
    }
    return null;
  }
}

// Function for deleting a node
function deleteNode(root, key) {
  if (root === null) {
    return root;
  }

  // Traverse to find the node to be deleted
  if (key < root.data) {
    root.left = deleteNode(root.left, key);
  } else if (key > root.data) {
    root.right = deleteNode(root.right, key);
  } else {
    // Node with only one child or no child
    if (root.left === null) {
      return root.right;
    } else if (root.right === null) {
      return root.left;
    }
    // Node with two children - find the in-order successor
    root.data = minValue(root.right);
    // Delete the in-order successor
    root.right = deleteNode(root.right, root.data);
  }
  return root;
}

// Helper function to find in-order successor to delete a node that has two children
function minValue(node) {
  let minValue = node.data;
  while (node.left !== null) {
    minValue = node.left.data;
    node = node.left;
  }
  return minValue;
}

// Function for printing tree
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

// Function for sorting array
function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  const mid = Math.floor(arr.length / 2);
  const leftSorted = mergeSort(arr.slice(0, mid));
  const rightSorted = mergeSort(arr.slice(mid));
  return merge(leftSorted, rightSorted);
}

const merge = (left, right) => {
  let result = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
};

// Function for removing duplicates in array
function removeDupicate(arr) {
  return arr.filter((value, index) => arr.indexOf(value) === index);
}

let array = [1, 1, 2, 2, 3, 4, 6, 5, 6, 7, 7, 8, 9, 22];
array = mergeSort(array);
array = removeDupicate(array);
let n = array.length;
let myBinaryTree = new Tree(array, 0, n - 1);
prettyPrint(myBinaryTree.root);
let target = find(myBinaryTree.root, 8);
console.log(findHeight(myBinaryTree.root, target));
