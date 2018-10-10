"use strict"
const BLACK = false
const RED = true

class Node {
    constructor(key, value, color=BLACK) {
        this.key = key;
        this.value = value;
        this.left = null;
        this.right = null;
        this.color = color;
    }
}

class LLRBT {
    constructor() {
        this.root = null;
    }

    put(key, value) {
        this.root = this._put(key, value, this.root);
    }

    isRed(node) {
        if (null == node) return false;
        return node.color === RED
    }

    height() {
        return this._height(this.root);
    }

    isBalanced() {
        return this._isBalanced(this.root)
    }

    isBST() {
        return this._isBST(this.root, null, null)
    }

    _put(key, value, root) {
        if (root === null) return new Node(key, value, RED);
        if (key < root.key) root.left = this._put(key, value, root.left)
        else if (key > root.key)  root.right = this._put(key, value, root.right)
        else root.value = value;
        if (this.isRed(root.right) && !this.isRed(root.left)) root = this._rotateLeft(root);
        if (this.isRed(root.left) && !this.isRed(root.left.left)) root = this._rotateRight(root);
        if (this.isRed(root.left) && this.isRed(root.right)) root = this._flipColors(root);
        return root;
    }

    _isBalanced(node) {
        if (node === null) return true;
        return this._height(node.left) - this._height(node.right) <= 1 && this._isBalanced(node.left) && this._isBalanced(node.right) 
    }

    _isBST(node, left, right ){
        if (node === null) return true;
        if (left !== null && left.key >= node.key) return false;
        if (right !== null && right.key <= node.key) return false;
        return this._isBST(node.left, left, node) && this._isBST(node.right, node, right)
    }

    _height(node) {
        if (node === null) return -1;
        return 1 + Math.max(this._height(node.left), this._height(node.right))
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