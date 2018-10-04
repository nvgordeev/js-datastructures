"use strict";

const assert = require('assert');
const bstlib = require('./bst');

const Node = bstlib.Node;
const BST = bstlib.BST;

let bst = new BST();

assert(bst.root === null, "Root should be null after creating class");

bst.put('C', 'Foo');
assert(bst.root instanceof Node, "Root should be a Node after first insert");

bst.put('D', 'Bar');
assert(bst.root.right instanceof Node && bst.root.right.key === 'D', "After inserting D should be right child of C")

bst.put('A', 'Blah');
assert(bst.root.left instanceof Node && bst.root.left.key === 'A', "After inserting A should be left child of C")

bst.put('Z', 'Alice');
bst.put('Y', 'Bob');
assert(bst.get('Y') === 'Bob', "Search should return correct results")
assert(bst.get('Z') === 'Alice', "Search should return correct results")

bst.put('Y', 'Shakalaka');
assert(bst.get('Y') === 'Shakalaka', "Search should return changed results")

const PREORDER_TRAVERSE_RESULT = 'CADZY';
assert(bst.preOrderTraverse().join('') === PREORDER_TRAVERSE_RESULT, "Pre-Order traverse should return correct result")

const INORDER_TRAVERSE_RESULT = 'ACDYZ';
assert(bst.inOrderTraverse().join('') === INORDER_TRAVERSE_RESULT, "In-Order traverse should return correct result")

const POSTORDER_TRAVERSE_RESULT = 'AYZDC';
assert(bst.postOrderTraverse().join('') === POSTORDER_TRAVERSE_RESULT, "Post-Order traverse should return correct result")

assert(bst.min().key === 'A', "Min should return correct result")

assert(bst.max().key === 'Z', "Max should return correct result")

assert(bst.findSuccessor('C').key === 'D', "findSuccessor should return correct result")

assert(bst.findPredecessor('C').key === 'A', "findPredecessor should return correct result")

assert(bst.height() === 3, "Bst height should be equals to 3")

bst.delete('C');
assert(bst.get('C') === null, "Key should be removed from bst")
assert(bst.postOrderTraverse().join('') === 'AYZD', "Delete should correctly change bst");

assert(bst.isBalanced() === true, "BST should be balanced after root deletion")
bst.put('W', 'sasdas');
assert(bst.isBalanced() === false, "BST should be not balanced after insert new node at bottom and increasing height")

assert(bst.isBST() === true, "Should be valid BST initially")
// bst.root.left = Node { key: 'A', value: 'Blah', left: null, right: null }
bst.root.left.left = new Node('M', 'Some data')
assert(bst.isBST() === false, "Should be invalid BST after adding node at wrong place")

