"use strict";

const assert = require('assert');
const llrblib = require('./llrb');

const Node = llrblib.Node;
const LLRBT = llrblib.LLRBT;

let llrbt = new LLRBT();

llrbt.put('E', 'programming');
assert(llrbt.root.key === 'E', "Should correctly insert key")

llrbt.put('D', 'is');
llrbt.put('C', 'my');
llrbt.put('B', 'love');
llrbt.put('A', 'forever');
assert(llrbt.isBST, "Should be BST after some insertions");
assert(llrbt.isBalanced, "Should be balanced when usual BST is not")