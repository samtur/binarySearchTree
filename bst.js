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
  var mid = parseInt((start + end) / 2);
  var node = new Node(arr[mid]);

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

// Function inorder traversal

function inOrder(root) {
  if (root !== null) {
    inOrder(root.left);
    console.log(root.data);
    inOrder(root.right);
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

// Function for finding Node
function find(root, value) {
  if (root === null) {
    return root;
  }
  if (root.data === value) {
    console.log(root);
    return root;
  } else {
    find(root.left, value);
    find(root.right, value);
  }
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

function merge(left, right) {
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
}

// Function for removing duplicates in array
function removeDupicate(arr) {
  return arr.filter((value, index) => arr.indexOf(value) === index);
}

let array = [1, 1, 2, 2, 3, 6, 5, 6, 7, 7];
array = mergeSort(array);
array = removeDupicate(array);
let n = array.length;
let myBinaryTree = new Tree(array, 0, n - 1);
insert(4, myBinaryTree.root);
prettyPrint(myBinaryTree.root);
find(myBinaryTree.root, 7);
