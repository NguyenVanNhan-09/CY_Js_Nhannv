const nums1 = [1, 2];
const nums2 = [3, 5, 8, 6];

function median(arr1, arr2) {
   const merge = [...arr1, ...arr2];
   const mergeLeng = merge.length;

   if (mergeLeng % 2 === 0) {
      return (merge[mergeLeng / 2 - 1] + merge[mergeLeng / 2]) / 2;
   } else {
      return merge[Math.floor(mergeLeng / 2)];
   }
}

console.log(median(nums1, nums2));
