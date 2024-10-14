// Kiểm tra số nguyên tố
function isNumber(num) {
   if (num < 2) return false;
   for (let i = 2; i < num; i++) {
      if (num % i === 0) {
         return false;
      }
   }
   return true;
}
console.log(isNumber(5));

//Kiểm tra số hoàn hảo
function isNumberPerfect(num) {
   let sum = 0;
   if (num <= 1) return false;
   for (let i = 1; i <= num / 2; i++) {
      if (num % i === 0) {
         sum += i;
      }
   }
   return sum === num;
}

console.log(isNumberPerfect(10));
