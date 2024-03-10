// https://leetcode.com/problems/find-the-difference-of-two-arrays/description/

/*
Given two 0-indexed integer arrays nums1 and nums2, return a list answer of size 2 where:

// answer[0] is a list of all distinct integers in nums1 which are not present in nums2.
// answer[1] is a list of all distinct integers in nums2 which are not present in nums1.
// Note that the integers in the lists may be returned in any order.

*/

// ------------------------------------------------------------
// SOLUTION 1 (STATIC INPUT): 2 ARRAYS
// ------------------------------------------------------------

// Input:
a = [1, 2, 3];
b = [2, 4, 6, 8, 10];
// Output: [ [ 1, 3 ], [ 4, 6, 8, 10 ] ]

function twoArraysDifference(a, b) {
  const aElements = new Set(a);
  const bElements = new Set(b);
  const uniqueValues = [[], []];

  a.forEach((element) => {
    if (!bElements.has(element)) {
      uniqueValues[0].push(element);
    }
  });

  b.forEach((element) => {
    if (!aElements.has(element)) {
      uniqueValues[1].push(element);
    }
  });

  return uniqueValues;
}

/*
------------------------------------------------------------
TIME COMPLEXITY - SOLUTION 1:
------------------------------------------------------------
O(m * n)

Length of arr1: m
Length of arr2: n

O(3m) = O(m) // ignore coefficient (3)

for i in nums1: # m things here 
    shouldInclude = True
    for j in nums2: # n things here
        if i == j:
            shouldInclude = False
            break
    put in array if should include
[
    1: [2, 4, 6, 8, 10],
    2: [2, 4, 6, 8, 10],
    3: [2, 4, 6, 8, 10],
]
*/

/*
------------------------------------------------------------
SOLUTION 2 (DYNAMIC INPUT): ARRAY OF SUBARRAYS (# OF SUBARRAYS UNKNOWN)
------------------------------------------------------------
*/

// Input:
numArrays = [
  [1, 2, 3],
  [2, 4, 6, 8, 10],
  [1, 6, 10],
];
// Expected output: // [ [3], [4, 8], [] ]

const multiArraysDifference = function (parentArray) {
  // Initalize data holders:
  // (1) Map to store values and frequency/subarrayarray location
  const numbersAndLocations = new Map();

  // (2) Intermediate store for unique values

  // (3) Array of empty arrays to hold unique values (final output to return)
  let uniqueValues = Array(numArrays.length) // match # empty arrays to # subarrays in input
    .fill() // init with placeholder 'undefined' bc .map() only operates on initialized elements
    .map(() => []); // replace each placeholder value with empty array

  /* 

    Step 1: Inventory numbers and array locations

    Loop through the subarrays of numbers and record each one's location
    Note: if num is not unique, it will have 2+ array values in its k/v pair

    K: int    (value/number encountered)
    V: int[]  (list of subarray indexes)

    Expected output to numbersAndLocations:
    {  
       1: [0, 2], // encountered 1 in first and third subarrays - NOT unique
       2: [0, 1], // encountered 2 in first and second subarrays - NOT unique
       3: [0],    // encountered 3 om first subarray - UNIQUE
    };

 */

  parentArray.forEach((subarrary, subarraryIdx) => {
    subarrary.forEach((number) => {
      // First encounter: new entry
      if (!numbersAndLocations.get(number)) {
        numbersAndLocations.set(number, [subarraryIdx]);
      }
      // Subsequent encounter: update existing entry
      else {
        numbersAndLocations.get(number).push(subarraryIdx);
      }
    });
  });

  /* 

    Step 2: Filter for uniques and convert that info to formated output

    .map() through Map, check each (k,v) pair
    if v (int[] of subarrays where value was found) is == 1, 
    push the value into the corresponding subarray of `uniqueValues`

    NB: with Map.forEach method, the params are in 'reverse' order: forEach(value, key)
    
    Thus, the k/v params should be access and named as follows:
    forEach((subArrays, number) // subArrays is the 'value' (int[]) and number is the 'key'

 */

  numbersAndLocations.forEach((subArrays, number) => {
    if (subArrays.length === 1) {
      uniqueValues[subArrays].push(number);
    }
  });

  return uniqueValues;
};

/*
------------------------------------------------------------
TIME COMPLEXITY - SOLUTION 2:
------------------------------------------------------------
O((m * mn) ^ 3)

for each subarray - m subarrays, each has n elements
for each number in subarray, checking every other subarray set to see if it's there
m * n * (mn) = m^2 n^2
m * n * (m-1))  = m^2 n

*/

console.log(`-`.repeat(25));
console.log(`twoArraysDifference(a,b):`);
console.log(twoArraysDifference(a, b));
console.log();
console.log(`-`.repeat(25));
console.log(`multiArraysDifference(a,b):`);
console.log("Expected output: // [ [3], [4, 8], [] ]");
console.log(multiArraysDifference(numArrays));

/* NOTES  /  SCRATCH PAD

Partial original/naive approach:
Make set from each subarray
Loop through subarrays and compare each set's values (except its corresponding set)
Add non-matches to "unique values array"
ISSUE: uniques array might not tell us complete information regarding origin array
(And which origin arrays are empty bc they had no uniques)
const subArraySets = [];
parentArray.forEach((subarray) => subArraySets.push(new Set(subarray)));
  parentArray.foreach( (subarray, subarrIdx) => {
        // go through our sets
        subArraySets.forEach((set, setIdx) => {
            // make sure we are not looking at the set corresponding with our subarray
            if (numarrIdx !== setIdx) {
                // check if the elements in the subarray are present in another subarray
                subarr.forEach (element) {
                    if (!set.has(element)) {
                        uniqueValues[numarrIdx].push(element);
                    }
                }

            }
        })
    });


*/
