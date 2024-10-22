const number = 10;

function checkPalindrome(number) {
   if (typeof number === "number") {
      const reverseStr = String(number).split("").reverse().join("");
      return reverseStr === String(number);
   }
}

console.log(checkPalindrome(number));
