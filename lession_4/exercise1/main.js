const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

function getResult(oper) {
   const num1 = $("#num1").value.trim();
   const num2 = $("#num2").value.trim();
   const resultInput = $("#result");
   if (typeof oper !== "string") return console.log("sai");
   if (oper === "plus") {
      const result = Number(num1) + Number(num2);
      resultInput.value = result;
   }
   if (oper === "sub") {
      const result = Number(num1) - Number(num2);
      resultInput.value = result;
   }
   if (oper === "multiple") {
      const result = Number(num1) * Number(num2);
      resultInput.value = result;
   }
   if (oper === "divide") {
      const result = Number(num1) / Number(num2);
      resultInput.value = result;
   }
}
