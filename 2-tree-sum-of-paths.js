// You are given the root of a binary tree containing digits from 0 to 9 only.
// Return the total sum of all numbers.
// https://leetcode.com/problems/sum-root-to-leaf-numbers/

/**
 * @param {TreeNode} root
 * @return {number}
 */

var sumNumbers = function (root) {
  const totalVal =
    root.val +
    (root.left ? sumNumbers(root.left) : 0) +
    (root.right ? sumNumbers(root.right) : 0);

  return totalVal;
};
var sumPaths = function (root) {
  return sumPathHelper(root).pathSum;
};

var sumPathHelper = function (node) {
  if (!node.left && !node.right) {
    return { pathSum: node.val, pathCount: 1 };
  }

  const leftAns = !!node.left
    ? sumPathHelper(node.left)
    : { pathSum: 0, pathCount: 0 };
  const rightAns = !!node.right
    ? sumPathHelper(node.right)
    : { pathSum: 0, pathCount: 0 };

  const currNodeAns =
    leftAns.pathSum +
    rightAns.pathSum +
    node.val * (leftAns.pathCount + rightAns.pathCount);
  const currNodePathCount = leftAns.pathCount + rightAns.pathCount;

  return { pathSum: currNodeAns, pathCount: currNodePathCount };
};

/*  TIME COMPLEXITY

Time complexity: 0(n) where n = number of nodes (both best & worst case, since summing traverses every node in tree)
Space complexity: O(height) bc at most, the recursive call stack will stretch as long as the number of nodes from the root to the farthest leaf (height) + 1 for the sibling node)

NB: here, re space, bc of how bin tree is structured, maximum height of the tree is potentially O(n) - case: single branch / every node is a left/is a right node of the previous node


      3
    2  3
      7 5
     1  7
    2 3

val + left + right
(2, leftPaths) + (26, rightPaths) + (3*leftPaths) + (3*rightPaths) = (correctTotalPathSum, leftPathCount + rightPathCount)

1 -> 2 = 3
1 -> 3 -> 7 -> 1 = 12
1 -> 3 -> 5 -> 7 = 16
3 + 12 + 16 = 31

*/

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

n1 = new TreeNode(4);
n2 = new TreeNode(2);
n3 = new TreeNode(3);
n4 = new TreeNode(7);
n5 = new TreeNode(5);

n1.left = n2;
n1.right = n3;
n3.left = n4;
n3.right = n5;

console.log(sumPaths(n1)); // should return 23

/*  SCRATCH PAD / NOTES

actualFunc(node) {
    const result = recursiveFunc(node);
    return result.sum;
}
recursiveFunc(currNode) {
    // left
    leftAns = recursiveFunc(currNode.left); // (leftTotalPathSum, leftPathCount);
    rightAns = (rightTotalPathSum, rightPathCount);
    
    currNodeAns = leftTotalPathSum + rightTotalPathSum + currNode.val * (leftPathCount + rightPathCount);
    
    // return (currNodeAns, leftPathCount + rightPathCount)    
    
    return { sum: currNodeAns, pathCount: leftPathCount + rightPathCount }
}

  console.log("-".repeat(10));
  console.log("root.val: " + root.val);
  console.log("root.left: " + JSON.stringify(root.left));
  console.log("root.right: " + JSON.stringify(root.right));



    4
   2 3
    7 5
6 + 14 + 12 = 32




 Definition for a binary tree node.
 function TreeNode(val, left, right) {
     this.val = (val===undefined ? 0 : val)
     this.left = (left===undefined ? null : left)
     this.right = (right===undefined ? null : right)
 }


--- EARLY SOLUTION --- 

  // if leaf node, just return current node value
  if (!root.right && !root.left) {
      return root.val;
  }

  // otherwise initialize variables to hold values returned by recursive calls to left and right nodes
  let leftVal = 0;
  let rightVal = 0;

  // check left node/branch:
  if (root.left) {
      console.log("left: " + root.left);
      leftVal += sumNumbers(root.left);
  }

  // check right node/branch:
  if (root.right) {
      console.log("right: " + root.right);
      rightVal += sumNumbers(root.right);
  }

  console.log("left val: " + leftVal);
  console.log("right val: " + rightVal);

  // sum and return all values (left, right, root.val)
  const totalVal = root.val + leftVal + rightVal;
  console.log(`totalVal: ${totalVal}`);

*/
