// let counter = 0;

// const inception = () => {
//   console.log(counter);
//   if (counter > 3) {
//     return "done!";
//   }
//   counter++;
//   return inception();
// };

// console.log(inception());

// FACTORIAL ---->
// const findFactorialRecursive = (number) => {
//   if (number === 2) {
//     return 2;
//   }

//   return number * findFactorialRecursive(number - 1);
// };

// console.log(findFactorialRecursive(5));

// FIBONACCI ---->
const fibonnaciRecursive = (number) => {
  if (number < 2) {
    return number;
  }
  return fibonnaciRecursive(number - 1) + fibonnaciRecursive(number - 2);
};

console.log(fibonnaciRecursive(8));

