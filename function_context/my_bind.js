/*
reqs:
- takes two args: function and context object
- returns a new function which:
  - is permenently bound to the context object
    - cannot be executed with a different execution context, even if mybind is used again
  - has any additional arguments passed to myBind partially applied
  - can be invoked with arguments which are bound after the partially applied arguments


A:
store the list of additional arguments in an array
return a new function which:
  takes arguments
  calls the argument function explicitly bound to the argument execution context
    - applies the myBind additional arguments first
    - applies the supplied arguments second

*/

function myBind(func, context, ...myBindArgs) {
  return function (...invocationArgs) {
    return func.apply(context, myBindArgs.concat(invocationArgs));
  };
}

let obj1 = {
  name: 'john smith',
};

let obj2 = {
  name: 'jane doe',
};

const print = function (a, b) {
  console.log(this.name);

  if (a) {
    console.log(a);
  }

  if (b) {
    console.log(b);
  }
};

let sayName1 = myBind(print, obj1);
sayName1(); // 'john smith'
sayName1('a'); // 'john smith' 'a'
sayName1.call(obj2); // 'john smith'

let sayName2 = myBind(print, obj2, 'a');
sayName2('b'); // 'jane doe' 'a' 'b';

let sayName3 = myBind(sayName2, obj1);
sayName3(); // 'jane doe'

// let sayName1 = print.bind(obj1);
// sayName1(); // 'john smith'
// sayName1('a'); // 'john smith' 'a'
// sayName1.call(obj2); // 'john smith'

// let sayName2 = print.bind(obj2, 'a');
// sayName2('b'); // 'jane doe' 'a' 'b';

// let sayName3 = sayName2.bind(obj1);
// sayName3(); // 'jane doe' 'a'