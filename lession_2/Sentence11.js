const n = 5;
const arr = [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 5];
const newArr = [];

function countTime(a, arr1) {
   let count = 0;
   for (let i = 0; i < arr1.length; i++) {
      if (a === arr1[i]) {
         count++;
      }
   }
   return count;
}

function result() {
   let count2 = 0;
   for (let i = 0; i < arr.length; i++) {
      if (countTime(arr[i], arr) < count2) {
         count2 = countTime(arr[i], arr);
      }
   }
   return count2;
}
for (let i = 0; i < result(); i++) {
   newArr[i] = n + i;
}
console.log(result());
console.log(newArr);
