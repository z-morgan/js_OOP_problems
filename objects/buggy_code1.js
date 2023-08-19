function createGreeter(name) {
  return {
    name,
    morning: 'Good Morning',
    afternoon: 'Good Afternoon',
    evening: 'Good Evening',
    greet(timeOfDay) {
      this.name = 'John'
      let msg = '';
      switch (timeOfDay) {
        case 'morning':
          msg += `${this.morning} ${name}`;
          break;
        case 'afternoon':
          msg += `${this.afternoon} ${name}`;
          break;
        case 'evening':
          msg += `${this.evening} ${name}`;
          break;
      }

      console.log(msg);
    },
  };
}

const helloVictor = createGreeter('Victor');
helloVictor.greet('morning');

/*
This code words because, although `name` on lines 12, 15, and 18 is not prepended with `this` and 
thus does not reference the `name` property on the object returned by `createGreeter()`, it 
actually references the parameter `name` defined on line 1. When createGreeter is invoked, it creates
the object and thus initializes the `greet` property to the same-named function expression. This function
expression forms a closure which includes the reference to the `name` local variable. When `greet` is 
invoked on `helloVictor` on line 28, `name` resolves to `Victor` through the closure, since `Victor` 
was the argument passed in and assigned to `name` when `createGreeter` was invoked.

*/