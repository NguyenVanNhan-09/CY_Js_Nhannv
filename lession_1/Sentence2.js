const arr = [10, 2, 3, 2, 5];
// Tăng dần
function ascending(arr) {
   let isCheck = false;
   let arrLength = arr.length;
   do {
      isCheck = false;
      for (let i = 0; i < arrLength - 1; i++) {
         if (arr[i] > arr[i + 1]) {
            [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
            isCheck = true;
         }
      }
      arrLength--;
   } while (isCheck);
   return arr;
}

console.log(ascending(arr));

// Giảm dần
function decreasing(arr) {
   let isCheck = false;
   let arrLength = arr.length;
   do {
      isCheck = false;
      for (let i = 0; i < arrLength - 1; i++) {
         if (arr[i] < arr[i + 1]) {
            [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
            isCheck = true;
         }
      }
      arrLength--;
   } while (isCheck);
   return arr;
}
console.log(decreasing(arr));
