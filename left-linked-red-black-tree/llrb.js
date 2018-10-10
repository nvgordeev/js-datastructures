"use strict"
const BLACK = false
const RED = true

class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.left = null;
        this.right = null;
        this.color = BLACK;
    }
}

class LLRBT {
    constructor() {
        this.root = null;
    }

    isRed(node) {
        if (null == node) return false;
        return node.color === RED
    }

    _rotateLeft(node) {
        let x = node.right;
        node.right = x.left;
        x.left = node;
        x.color = node.color;
        node.color = RED;
        return x;
    }

    _rotateRight(node) {
        let x = node.left;
        node.left = x.right;
        x.right = node;
        x.color = node.color;
        node.color = RED;
        return x;
    }

    _flipColors(node) {
        node.color = RED;
        node.left.color = BLACK;
        node.right.color = BLACK;
    }

}

module.exports.Node = Node;
module.exports.LLRBT = LLRBT;