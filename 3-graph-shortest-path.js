// Shortest path through graph
// https://leetcode.com/problems/minimum-path-sum/description/

const map1 = [
  [1, 1, 1, 0, 1, 1],
  [0, 0, 1, 1, 1, 1],
  [1, 1, 1, 0, 0, 1],
  [0, 0, 1, 1, 1, 1],
  [0, 1, 0, 1, 1, 0],
];

function shortestPath(map) {
  return traverseMap(map, 0, 0);
}

function traverseMap(map, idxA, idxB) {
  console.log(`idxA, idxB: ${idxA}, ${idxB}`);

  let shorterPath;
  let rightPathLength = 0;
  let downPathLength = 0;

  // base case: we've reached rightmost column
  if (idxB === map[0].length - 1 && map[idxA][idxB] !== 0) {
    return 1;
  }

  // check right:
  if (map[idxA][idxB + 1] !== 0) {
    rightPathLength += traverseMap(map, idxA, idxB + 1); // recurse: returns either zero (dead end ahead) or path length (success)
  }

  // check down:
  if (idxA < map.length - 1 && map[idxA + 1][idxB] !== 0) {
    downPathLength += traverseMap(map, idxA + 1, idxB); // recurse: returns either zero (dead end ahead) or path length (success)
  }

  if (rightPathLength === 0) {
    shorterPath = downPathLength;
  } else if (downPathLength === 0) {
    shorterPath = rightPathLength;
  } else {
    shorterPath = Math.min(rightPathLength, downPathLength);
  }

  return ++shorterPath;
}

console.log("result shortestPath(map1):");
console.log(shortestPath(map1)); // should print 8

/*  SCRATCH PAD / NOTES 

  High level approach:
  to traverse each possible path, check right and check down
  within one iteration:
  check right:
  if 0, skip / return null
  if 1, we'll get back a numeric value or null
  check down:
  same algorithm

  at end of successful path, backward phase will start accumulating shortestPath length (returning 1 per iteration)

  Recursive logic:
  recurse unless:
  a - index position === 5 (base case)
  b - can't move right && can't move down (accomplished by check for 0)

constraints on traversal: only right or down 
idxA - U/D - index position of cursor within parrent array (i.e., which subarray cursor is on)
idxB - R/L - index position of cursor within subarray
right: [idxA][idxB  + 1]
down: [idxA + 1][idxB]
map1[1][2] - 2nd row 3rd column


*/
