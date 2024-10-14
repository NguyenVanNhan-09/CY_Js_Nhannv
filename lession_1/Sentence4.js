const myEmail = "nhan09122004@gmail.com";

function validateEmail(email) {
   var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   return re.test(email);
}
console.log(validateEmail(myEmail));
