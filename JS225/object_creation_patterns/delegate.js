/*
function takes an object, method name(string), and other optional arguments

input: object, string, and optional other args
return: a function which invokes the method on the argument object

A:

return a function which calls that method on that object with the passed in arguments


*/

function delegate(obj, method, ...args) {
  return function () {
    return obj[method](...args);
  };
}

const foo = {
  name: 'test',
  bar(greeting) {
    console.log(`${greeting} ${this.name}`);
  },
};

const baz = {
  qux: delegate(foo, 'bar', 'hello'),
};

baz.qux();   // logs 'hello test';

foo.bar = () => { console.log('changed'); };

baz.qux();          // logs 'changed'