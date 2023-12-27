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
  console.log(node);
  //   recursively construct left subtree and make it left child of root
  node.left = buildTree(arr, start, mid - 1);
  //   recurivesly construct right subtree and make it right child of root
  node.right = buildTree(arr, mid + 1, end);
  return node;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let array = [1, 2, 3, 4, 5, 6, 7];
let n = array.length;
const myBinaryTree = new Tree(array, 0, n - 1);

console.log(myBinaryTree.node);
// Try to fix code and understand why it isn't added alues to left and right attributes
