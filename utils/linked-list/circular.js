const Node = require("./node");

class CircularLinkedList {
  constructor(value) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    if (value) {
      this.initialize(value);
    }
  }

  // used to initialize Singly Circular Linked List
  initialize(value) {
    // create a node
    const newNode = new Node(value);
    // create a circular reference (points to itself)
    newNode.next = newNode;
    newNode.prev = newNode;
    // now make both head and tail to point on newNode
    this.head = newNode;
    this.tail = newNode;
    // increment length
    this.length++;
    return newNode;
  }

  append(value) {
    // if length is zero, use initialize method instead
    if (this.length === 0) {
      return this.initialize(value);
    }

    // create a new node
    const newNode = new Node(value);
    // point new node next pointer to this head.
    newNode.next = this.head;
    newNode.prev = this.tail;
    // now, make tails pointer to point to newNode
    this.tail.next = newNode;
    this.head.prev = newNode;
    // set the tail with newNode
    this.tail = newNode;
    // increment length
    this.length++;

    return newNode;
  }

  moveAfter(node, newNode) {
    newNode.prev.next = newNode.next;
    newNode.next.prev = newNode.prev;

    if (this.tail === newNode) {
      this.tail = newNode.prev;
    }
    if (this.head === newNode) {
      this.head = newNode.next;
    }

    newNode.next = node.next;
    newNode.prev = node;

    node.next.prev = newNode;
    node.next = newNode;

    if (node === this.tail) {
      this.tail = newNode;
      return;
    }
  }

  findNode(value) {
    let node = this.head;
    while (node.value !== value) {
      node = node.next;
      if (node === this.head) return null;
    }
    return node;
  }

  goForward(node, moves) {
    let idxNode = node;
    for (let i = 0; i < moves; i++) {
      idxNode = idxNode.next;
    }
    return idxNode;
  }

  // not implemented
  // prepend(value) {
  //   // if length is zero, use initialize method instead
  //   if (this.length === 0) {
  //     return this.initialize(value);
  //   }

  //   // create a new node
  //   const newNode = new Node(value);
  //   // point new node next pointer to this head.
  //   newNode.next = this.head;
  //   // now, make tails next pointer to point to newNode
  //   this.tail.next = newNode;
  //   // set the head with newNode
  //   this.head = newNode;

  //   // increment length
  //   this.length++;

  //   return newNode;
  // }

  // toArray - loop through nested objects, then return the values in an array
  toArray() {
    const array = [];
    // Initialize a currentNode variable pointing to this.head - which will be the starting point for traversal.
    let currentNode = this.head;

    do {
      array.push(currentNode.value);
      currentNode = currentNode.next;
      // NOTE:
      // Since there can be duplicate values in the list, we will be using "Referential equality" instead of comparing Node values as the exit condition (which is figuring out where the head is).
      // When strict equality operator is used in reference types in JS, it checks if compared values referencing the same object instance. This is useful when you want to compare references.
    } while (currentNode !== this.head);

    return array;
  }

  // traverse to index
  // traverseToIndex(index) {
  //   if (index < 0) return undefined;
  //   // keeps track of traversal
  //   let counter = 0;
  //   // starting point
  //   let currentNode = this.head;

  //   // traverse to the target index
  //   while (counter !== index) {
  //     currentNode = currentNode.next;
  //     counter++;
  //   }

  //   return currentNode;
  // }

  // insert(index, value) {
  //   // if length is 0, just prepend (add to the beginning)
  //   if (index === 0) {
  //     return this.prepend(value);
  //   }
  //   // validate the received index parameter:
  //   if (!index) throw new Error("Index is missing");
  //   if (typeof index !== "number") throw new Error("Index should be a number");
  //   if (index < 0) throw new Error("Index should be bigger than zero");

  //   // if length is too long, just append (add to the end)
  //   if (index >= this.length) {
  //     return this.append(value);
  //   }

  //   // Initialize a newNode with value recieved and next as null.
  //   const newNode = new Node(value, null);

  //   // pick previous index
  //   const preIdx = this.traverseToIndex(index - 1);
  //   // pick target index
  //   const targetIdx = preIdx.next;
  //   // place newNode in front of previous node
  //   preIdx.next = newNode;
  //   // place target index in front of new node
  //   newNode.next = targetIdx;
  //   this.length++;
  //   return newNode;
  // }

  // deleteHead() {
  //   // check if there is a head value - if not return a warning (or an error)
  //   if (this.length === 0) return "List is empty";
  //   const currHead = this.head;

  //   // if one element left
  //   if (this.length === 1) {
  //     const headVal = this.head.value;
  //     this.head = null;
  //     this.tail = null;
  //     this.length--;
  //     return headVal;
  //   }

  //   // pick the current head value:
  //   const headVal = this.head.value;

  //   // define newHead as this.head.next
  //   const newHead = this.head.next;
  //   // now change the head pointer to newHead
  //   this.head = newHead;
  //   // update tail pointer to point on updated head:
  //   this.tail.next = this.head;
  //   this.length--;
  //   return headVal;
  // }

  // deleteTail() {
  //   // check if length is zero - if not return a warning (or an error)
  //   if (this.length === 0) return "List is empty";

  //   // If there is only one node left
  //   if (this.length === 1) {
  //     const headVal = this.head.value;
  //     this.head = null;
  //     this.tail = null;
  //     this.length--;
  //     return headVal;
  //   }

  //   // Store the current tail value:
  //   const tailVal = this.tail.value;

  //   // Pick the previous node of tail
  //   const newTail = this.traverseToIndex(this.length - 2);
  //   // Make newTail point to the head:
  //   newTail.next = this.head;
  //   // Make tail to point to newTail, this will remove the tail from the list:
  //   this.tail.next = newTail;
  //   this.length--;
  //   return tailVal;
  // }

  // delete(index) {
  //   // validate the received index parameter:
  //   if (!index) return "Index is missing";
  //   if (typeof index !== "number") return "Index should be a number";
  //   if (index < 0) return "Index should be bigger than zero";

  //   // Handle the case if there is 2 elements left - in this case we either remove head or tail:
  //   if (this.length === 2) {
  //     if (index === 0) {
  //       return this.deleteHead();
  //     }
  //     if (index > 0) {
  //       return this.deleteTail();
  //     }
  //   }

  //   // For a list with more than 2 elements, define removal style.
  //   // Removal will be either from head, middle or tail.
  //   let removalType;
  //   if (index === 0) {
  //     removalType = "head";
  //   } else if (index >= this.length) {
  //     removalType = "tail";
  //   } else {
  //     removalType = "middle";
  //   }

  //   if (removalType === "head") {
  //     return this.deleteHead();
  //   }

  //   if (removalType === "tail") {
  //     return this.deleteTail();
  //   }

  //   // To remove from middle, we will need both previous and target nodes
  //   if (removalType === "middle") {
  //     const preIdx = this.traverseToIndex(index - 1);
  //     const targetIdx = preIdx.next;
  //     const targetVal = targetIdx.value;
  //     // Implement removal by pointing preIdx.next to targetIdx.next
  //     // This will detach the target index node from Linked List
  //     preIdx.next = targetIdx.next;
  //     this.length--;
  //     return targetVal;
  //   }
  // }

  // reverse() {
  //   // Checkup - if list only contains one item, no need to reverse
  //   if (!this.head.next) return;

  //   // We'll use 3 pointers. Prev and Next is empty at the start
  //   let previousNode = null;
  //   let currentNode = this.head;
  //   let nextNode = null;

  //   do {
  //     // Start with taking the next node reference
  //     nextNode = currentNode.next;
  //     // Then, point the currentNode to previous one
  //     currentNode.next = previousNode;
  //     // Now, move the previous and current one step forward. How?
  //     // To move the previousNode one step forward, we reference it to the currentNode:
  //     previousNode = currentNode;
  //     // To move the currentNode one step forward, we reference it to the nextNode:
  //     currentNode = nextNode;
  //   } while (currentNode !== this.head);

  //   this.head.next = previousNode;
  //   this.head = previousNode;
  //   return this.toArray();
  // }
}

module.exports = CircularLinkedList;
