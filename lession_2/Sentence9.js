const matrix = [
   [1, 2, 3],

   [4, 5, 6],

   [9, 10, 11],
];

function changeMatrix(arr) {
   const result = arr.reverse();
   const newArr = [];
   const resultLeng = result.length;
   for (let i = 0; i < resultLeng; i++) {
      newArr.push(result.map((r) => r[i]));
   }

   return newArr;
}
console.log(changeMatrix(matrix));
