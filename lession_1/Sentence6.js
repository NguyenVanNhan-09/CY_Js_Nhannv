let arr = [
   {
      brand: "Huyndai",
      model: "Santafe",
   },
   {
      brand: "Huyndai",
      model: "Sonata",
   },
   {
      brand: "Vinfast",
      model: "Lux SA",
   },
   {
      brand: "Toyota",
      model: "Camry",
   },
   {
      brand: "Vinfast",
      model: "Lux A",
   },
   {
      brand: "Toyota",
      model: "Vios",
   },
];

function configArray(arr) {
   const newArr = [];
   arr.forEach((element) => {
      let group = newArr.find((g) => g[0].brand === element.brand);
      if (!group) {
         group = [];
         newArr.push(group);
      }
      group.push(element);
   });
   return newArr;
}

console.log(configArray(arr));
