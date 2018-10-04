"use strict";

class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.left = null;
        this.right = null;
    }
}


class BST {
    constructor() {
        this.root = null;
    }

    put(key, value) {
        this.root = this._put(key, value, this.root);
    }

    get(key) {
        let current = this.root;
        while (current) {
            if (current.key === key) return current.value;
            if (key > current.key) current = current.right
            else current = current.left;
        }
        return null;
    }

    preOrderTraverse() {
        let s = [];
        function _traverse(node) {
            if (node === null) return;
            s.push(node.key);
            _traverse(node.left);
            _traverse(node.right)
        }
        _traverse(this.root);
        return s;
    }

    inOrderTraverse() {
        let s = [];
        function _traverse(node) {
            if (node === null) return;
            _traverse(node.left);
            s.push(node.key);
            _traverse(node.right);
        }
        _traverse(this.root);
        return s;
    }

    postOrderTraverse() {
        let s = [];
        function _traverse(node) {
            if (node === null) return;
            _traverse(node.left);
            _traverse(node.right);
            s.push(node.key);
        }
        _traverse(this.root);
        return s;
    }

    min() {
        return this._min(this.root)
    }

    max() {
        return this._max(this.root)
    }

    findSuccessor(key) {
        return this._findSuccessor(key, this.root);
    }

    findPredecessor(key) {
        return this._findPredecessor(key, this.root);
    }

    
    delete(key) {
        this.root = this._delete(key, this.root);
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

    _isBST(node, left, right ){
        if (node === null) return true;
        if (left !== null && left.key >= node.key) return false;
        if (right !== null && right.key <= node.key) return false;
        return this._isBST(node.left, left, node) && this._isBST(node.right, node, right)
    }

    _put(key, value, root) {
        if (root === null) return new Node(key, value);
        if (key < root.key) root.left = this._put(key, value, root.left)
        else if (key > root.key)  root.right = this._put(key, value, root.right)
        else root.value = value;
        return root;
    }

    _min(node) {
        if (node.left === null) return node;
        return this._min(node.left) 
    }

    _max(node) {
        if (node.right === null) return node;
        return this._max(node.right) 
    }

    _findSuccessor(key, node) {
        if (node === null) return null;
        if (key < node.key) return this._findSuccessor(key, node.left);
        if (key > node.key) return this._findSuccessor(key, node.right);
        return this._min(node.right)
    }

    _findPredecessor(key, node) {
        if (node === null) return null;
        if (key < node.key) return this._findPredecessor(key, node.left);
        if (key > node.key) return this._findPredecessor(key, node.right);
        return this._max(node.left)
    }

    _delete(key, node) {
        if (node === null) return null;
        if (key < node.key) node.left = this._delete(key, node.left);
        if (key > node.key) node.right = this._delete(key, node.right);
        if (node.left === null && node.right === null) {
            return null;
        }
        else if (node.left === null) return node.right
        else if (node.right === null) return node.left
        else {
            let successor = this._findSuccessor(key, node);
            node.key = successor.key;
            node.value = successor.value;
            node.right = this._delete(successor.key, node.right)
        }
        return node
    }

    _isBalanced(node) {
        if (node === null) return true;
        return this._height(node.left) - this._height(node.right) <= 1 && this._isBalanced(node.left) && this._isBalanced(node.right) 
    }

    _height(node) {
        if (node === null) return -1;
        return 1 + Math.max(this._height(node.left), this._height(node.right))
    }
}

module.exports.Node = Node;
module.exports.BST = BST;