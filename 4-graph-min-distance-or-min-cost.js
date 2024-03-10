// Minimum Distance to Node
// https://leetcode.com/problems/minimum-path-sum/description/
// Idea: Check each ring/level of nodes, going outward
// The level on which we first encounter label == the min distance

class Node {
  constructor(label) {
    this.label = label;
    this.adjacent = [];
  }
}

/*
      a -- b --------
      |    |        |
      c -- d -- e   | 
           |        |
           f --------
*/

/* TIME COMPLEXITY

    O(m + n); where m is number of nodes, and n is number of edges
    
    Worst case:
        (1) no optimization (no tracking what nodes we already processed)
        (2) 99.9% interconnected graph (every node connects to every other node), except one long branch with target node way deep down @ leaf
    
    O(n^2); since n (longest path === number of nodes === number of iterations) * n (adjacents list includes every other node)

 */

function minDistance(startNode, endLabel) {
  // (1) Initialize a queue as a simple array
  const queue = Array({ node: startNode, level: 0 });

  // (2) Set a flag to break the while loop
  let encounteredEndLabel = false;

  // (3) Repeat until we see the target label:
  while (!encounteredEndLabel) {
    // (a) dequeue HEAD and check it
    const HEAD = queue.shift();

    // (b) if head is target
    // 1 - toggle flag
    // 2 - return level
    if (HEAD.node.label === endLabel) {
      encounteredEndLabel = !encounteredEndLabel;
      return HEAD.level;
    }

    // (c) otherwise enqueue each its adjacents and keep searching
    HEAD.node.adjacent.forEach((node) => {
      const item = {
        node: node,
        level: HEAD.level + 1, // record adjacents' level/ring ( parent + 1 )
      };
      queue.push(item);
    });
  }
}

const a = new Node("a");
const b = new Node("b");
const c = new Node("c");
const d = new Node("d");
const e = new Node("e");
const f = new Node("f");

a.adjacent = [b, c];
b.adjacent = [a, d];
c.adjacent = [a, d];
d.adjacent = [b, c, e, f];
e.adjacent = [d];
f.adjacent = [d];

console.log(minDistance(a, "f")); // should print 2

/* SCRATCHPAD NOTES

EXTENSION: return COST of MINIMUM-COST path:

    a -3- b ---------
    |2   |1          |
    c -1- d -5- e   | 10
        |2         |
       f ---------



// [(b, 3), (c, 2)]
// [(c, 2), (a, 6), (f, 13), (d, 4)]


For cost comparison, check first value/iteration against Math.Infinity
e.g.  if min < Math.Infinity


Cases to consider:
  1. terminating condition: encounter the target label 
  2. infinite loop (e.g.: a - b - f - d - b - f - d - b...) // problem with recursion - this is why 'while' is appropriate 


function minDistance(startNode, endLabel) {
  // cases to consider:
  // - terminating condition: encounter the target label
  // - encounter the startNode
  // - encounter a leaf/tip (here, node 'e')
  // - infinite loop (e.g.: a - b - f - d - b - f - d - b...)

  // q = [(b, 1), (a, 2), (d, 2)] <----
  // processing c, 1

  const queue = Array({ node: startNode, level: 0 });
  let encounteredEndLabel = false;

  // const item = {
  //     "node": node,
  //     "level": leve
  // }

  while (!encounteredEndLabel) {
    const popped = queue.shift();

    // terminating condition: encountered end label
    if (popped.node.label === endLabel) {
      encounteredEndLabel = !encounteredEndLabel;
      return popped.level;
    }

    popped.node.adjacent.forEach((node) => {
      const item = {
        node: node,
        level: popped.level + 1,
      };
      queue.push(item);
    });
  }
}

*/
