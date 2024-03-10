// Reverse linked list

class Node {
  constructor(label) {
    this.label = label;
    this.next = null;
  }
}

function print(node) {
  console.log();

  let currentNode = node;

  while (true) {
    if (currentNode === null) {
      console.log();
      return;
    }
    console.log(currentNode.label);
    currentNode = currentNode.next;
  }
}

function reverseWhile(node) {
  let leftNode = null;
  let currentNode = node;

  while (true) {
    if (currentNode === null) {
      return;
    }

    // temporarily save so we can go to next iteration
    rightNode = currentNode.next;

    // point node backwards
    currentNode.next = leftNode;

    // set up for next iteration
    leftNode = currentNode;
    currentNode = rightNode;
  }
}

function reverseRecursion(node) {
  if (node === null) return; // return when we've gone past the end

  let currentNode = node;

  // snapshot of right-hand node that CURRENT originally pointed at
  let rightNode = currentNode.next;

  reverseRecursion(currentNode.next);

  currentNode.next = null; // current node is HEAD, so point it at nothing
  // (on subsequent iteration, if there is one, we'll point it at the NEW HEAD)

  if (rightNode !== null) {
    rightNode.next = currentNode; // point rightmost node at current HEAD
  }
}

// ------------------------------------------------------
console.log(`\n${"-".repeat(30)}`);
// ------------------------------------------------------
// LL 1: reverse with while loop
const n1 = new Node("a");
const n2 = new Node("b");
const n3 = new Node("c");
const n4 = new Node("d");
const n5 = new Node("e");
n1.next = n2;
n2.next = n3;
n3.next = n4;
n4.next = n5;

console.log("WHILE: reverseWhile()");
console.log();
// print, reverse, print again
console.log("before");
print(n1, "\n");
// reverse
console.log("// reverseWhile(n1)");
reverseWhile(n1);
console.log();
// print: e then d then c then b then a
console.log("after:");
print(n5, "\n");

// ------------------------------------------------------
console.log(`\n${"-".repeat(20)}`);
// ------------------------------------------------------
// LL 2: reverse with recursion
const m1 = new Node("1");
const m2 = new Node("2");
const m3 = new Node("3");
const m4 = new Node("4");
const m5 = new Node("5");
m1.next = m2;
m2.next = m3;
m3.next = m4;
m4.next = m5;

console.log("RECURSION: reverseRecursion()");
console.log();
// print: A then B then C then D then E
console.log("before:");
print(m1);
// reverse
console.log("// reverseRecursion(m1)");
reverseRecursion(m1);
console.log();
// print: E then D then C then B then A
console.log("after:");
print(m5);
