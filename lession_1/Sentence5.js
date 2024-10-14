let str = "@1#2!Ơ}{])(";

function clearString(str) {
   let strClear;
   strClear = str.replace(/[@#,!{}\[\]()]/g, "");
   strClear = strClear.replace(/\s+/g, " ").trim();
   return strClear;
}

// A
function stringToArray(str) {
   const string = clearString(str);
   if (string === "") return [];

   let wordArray = string.split(" ");

   wordArray = wordArray.map((word) => {
      let caseWord = word.toLowerCase();
      return caseWord.charAt(0).toUpperCase() + caseWord.slice(1);
   });

   return wordArray.reverse();
}

// B
function averageNumber(str) {
   let sum = 0;
   let count = 0;
   const string = clearString(str);
   if (string.trim() === "") return 0;

   let wordsArray = string.split(" ");

   for (let word of wordsArray) {
      if (!isNaN(word)) {
         console.log(typeof word);
         sum += Number(word);
         count++;
      }
   }
   return sum / count;
}

console.log(stringToArray("Xin c{h}ào #Tech@!Cy(VN)"));
console.log(averageNumber("Xin 20 c{h}ào 60 #Cy30@!Tech(VN) 100"));
