const Node = require('./node');

class MaxHeap {
    constructor() {
        this.clear();
    }

    push(data, priority) {
        let newNode = new Node(data, priority);
        this.insertNode(newNode);
        this.shiftNodeUp(newNode);
        this.heapSize++;
    }

    pop() {
        if (this.isEmpty()) {
            return;
        }
        let detached = this.detachRoot();
        this.restoreRootFromLastInsertedNode(detached);
        this.shiftNodeDown(this.root);
        this.heapSize--;
        return detached.data;
    }

    detachRoot() {
        let detached = this.root;
        if (this.parentNodes[0] == this.root) {
            this.parentNodes.shift();
        }
        this.root = null;
        return detached;
    }

    restoreRootFromLastInsertedNode(detached) {
        let lastNode = this.parentNodes.pop();
        if (!lastNode) {
            return;
        }
        if (lastNode.parent && this.parentNodes.indexOf(lastNode.parent) < 0 && lastNode.parent !== detached) {
            this.parentNodes.unshift(lastNode.parent);
        }

        lastNode.remove();
        if (detached.left && detached.left != lastNode) {
            lastNode.appendChild(detached.left);
        }
        if (detached.right && detached.right != lastNode) {
            lastNode.appendChild(detached.right);
        }
        this.root = lastNode;
        if (!lastNode.left || !lastNode.right) {
            this.parentNodes.unshift(lastNode);
        }
    }

    size() {
        return this.heapSize;
    }

    isEmpty() {
        return this.root == null;
    }

    clear() {
        this.root = null;
        this.parentNodes = [];
        this.heapSize = 0;
    }

    insertNode(node) {
        if (!this.root) {
            this.root = node;
            this.parentNodes.push(node);
            return;
        }
        this.parentNodes[0].appendChild(node);
        this.parentNodes.push(node);
        if (this.parentNodes[0].left && this.parentNodes[0].right) {
            this.parentNodes.shift();
        }
    }

    shiftNodeUp(node) {
        if (!node.parent) {
            this.root = node;
            return;
        }
        if (node.priority > node.parent.priority) {
            let parentNode = node.parent;
            let nodeIndex = this.parentNodes.indexOf(node);
            let nodeParentIndex = this.parentNodes.indexOf(parentNode);

            this.parentNodes[nodeIndex] = parentNode;
            if (nodeParentIndex >= 0) {
                this.parentNodes[nodeParentIndex] = node;
            }
            node.swapWithParent();
            this.shiftNodeUp(node);
        }
    }

    shiftNodeDown(node) {
        if (node == null) {
            return;
        }
        if (!node.left && !node.right) {
            return;
        }
        let left = node.left;
        let right = node.right;
        let nodeIndex = this.parentNodes.indexOf(node);
        let nodeLeftIndex = this.parentNodes.indexOf(left);
        let nodeRightIndex = this.parentNodes.indexOf(right);

        if (right == null || left.priority > right.priority) {
            if (left.priority > node.priority) {
                if (this.root == node) {
                    this.root = left;
                }
                this.parentNodes[nodeLeftIndex] = node;
                this.parentNodes[nodeIndex] = left;
                left.swapWithParent();
                this.shiftNodeDown(node);
            }
        } else if (left == null || right.priority >= left.priority) {
            if (right.priority > node.priority) {
                if (this.root == node) {
                    this.root = right;
                }
                this.parentNodes[nodeRightIndex] = node;
                this.parentNodes[nodeIndex] = right;
                right.swapWithParent();
                this.shiftNodeDown(node);
            }
        }
    }
}

module.exports = MaxHeap;
