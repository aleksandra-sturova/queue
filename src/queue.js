const MaxHeap = require('./max-heap.js');

class PriorityQueue {
    constructor(maxSize) {
        if (maxSize) {
            this.maxSize = maxSize;
        } else {
            this.maxSize = 30;
        }
        this.heap = new MaxHeap();
    }

    push(data, priority) {
        if (this.size() == this.maxSize) {
            throw new Error("Error: queue has max size");
        }
        this.heap.push(data, priority);
    }

    shift() {
        if (this.heap.isEmpty()) {
            throw new Error("Error: queue is empty");
        } else {
            let valueOfRemovedNode;
            valueOfRemovedNode = this.heap.pop();
            return valueOfRemovedNode;
        }
    }

    size() {
        return this.heap.size();
    }

    isEmpty() {
        return this.heap.isEmpty();
    }
}

module.exports = PriorityQueue;
