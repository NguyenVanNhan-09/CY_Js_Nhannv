function isValue(s) {
   const stack = [];
   const mapp = {
      "}": "{",
      ")": "(",
      "]": "[",
   };
   for (let value of s) {
      if (mapp[value]) {
         const topElement = stack.pop();
         if (topElement !== mapp[value]) {
            return false;
         }
      } else {
         stack.push(value);
      }
   }
   return stack.length === 0;
}

console.log(isValue("([{}])"));
