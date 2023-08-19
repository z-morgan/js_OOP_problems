function myFilter(array, func, thisArg = this) {
  let selectedElements = [];
  func = func.bind(thisArg);

  array.forEach((element, i, arr) => {
    if (func(element, i, arr)) {
      selectedElements.push(element);
    }
  });

  return selectedElements;
}

const filter = {
  allowedValues: [5, 6, 9],
};

console.log(myFilter([2, 1, 3, 4, 5, 6, 12], function(val) {
  return this.allowedValues.includes(val);
}, filter)); // returns [5, 6]