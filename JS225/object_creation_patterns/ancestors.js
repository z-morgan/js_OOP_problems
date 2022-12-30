// name property added to make objects easier to identify
const foo = {name: 'foo'};
const bar = Object.create(foo);
bar.name = 'bar';
const baz = Object.create(bar);
baz.name = 'baz';
const qux = Object.create(baz);
qux.name = 'qux';

foo.ancestors = function () {
  let current = this;
  let prototypes = [];

  while (Object.getPrototypeOf(current) !== null) {
    let prototype = Object.getPrototypeOf(current);
    
    if (prototype.name) {
      prototypes.push(prototype.name);
    } else {
      prototypes.push('Object.prototype')
    }

    current = prototype;
  }

  return prototypes;
};

console.log(qux.ancestors());  // returns ['baz', 'bar', 'foo', 'Object.prototype']
console.log(baz.ancestors());  // returns ['bar', 'foo', 'Object.prototype']
console.log(bar.ancestors());  // returns ['foo', 'Object.prototype']
console.log(foo.ancestors());  // returns ['Object.prototype']

/*
A:
starting with the object that is passed in, iterate over the prototype chain and stop
when the next prototype is null

of each prototype:
  if the prototype has a 'name' property, push it to result array
  else, add 'Object.prototype' to result array

return result array
*/

