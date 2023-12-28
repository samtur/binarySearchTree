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

// Function for removing duplicates in array finish this
function removeDupicate(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
}

let array = [1, 2, 3, 4, 5, 6, 7];
let n = array.length;
let myBinaryTree = new Tree(array, 0, n - 1);

prettyPrint(myBinaryTree.root);
