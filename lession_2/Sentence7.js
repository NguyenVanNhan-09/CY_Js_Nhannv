const nestedArray = [1, [2, [3, [4, 5, 6, 7, 8, 9]]]];
function flatten(arr) {
   return arr.flat(Infinity);
}

console.log(flatten(nestedArray));
