class Node {
    constructor(data, priority) {
        this.data = data;
        this.priority = priority;
        this.left = null;
        this.right = null;
        this.parent = null;
    }

    appendChild(node) {
        if (this.left === null && this.right === null) {
            this.left = node;
            node.parent = this;
        } else if (this.left != null && this.right === null) {
            this.right = node;
            node.parent = this;
        }
    }

    removeChild(node) {
        if (this.left == node) {
            this.left = null;
        } else if (this.right == node) {
            this.right = null;
        } else {
            throw new Error("error: passed node is not a child of this node");
        }
        node.parent = null;
    }

    remove() {
        if (this.parent) {
            this.parent.removeChild(this);
        }
    }

    swapWithParent() {
        let p = this.parent;
        if (p == null) {
            return;
        }
        let pp = p.parent;
        let l = this.left;
        let r = this.right;

        // update parent.parent
        p.parent = this;

        //update child.parent
        this.parent = pp;

        //exist children of p
        if (l) {
            l.parent = p;
        }
        if (r) {
            r.parent = p;
        }
        //update paret.child.parent
        if (p.left != this && p.left) {
            p.left.parent = this;
        }
        if (p.right != this && p.right) {
            p.right.parent = this;
        }
        //update children of node
        if (p.left != this) {
            this.left = p.left;
        } else {
            this.left = p;
        }
        if (p.right != this) {
            this.right = p.right;
        } else {
            this.right = p;
        }
        // update parent node
        p.left = l;
        p.right = r;
        //maintains correct state of parent.parent.left and parent.parent.right
        if (pp) {
            if (pp.left === p) {
                pp.left = this;
            } else {
                pp.right = this;
            }
        }
    }
}

module.exports = Node;
