myObj = {
   name: "nhan",
   age: 18,
   address: {
      city: "Hanoi",
      street: "123 Main St",
   },
   myArr: [1, 2, 3],
};

function copy(obj) {
   const newObj = Array.isArray(obj) ? [] : {};
   const keys = Object.keys(obj);
   keys.forEach((key) => {
      newObj[key] = obj[key];
   });
   return newObj;
}

console.log(copy(myObj));
