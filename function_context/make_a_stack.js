function newStack() {
  const stack = [];

  return {
    printStack() {
      stack.forEach(ele => console.log(ele));
    },

    push(item) {
      return stack.push(item);
    },

    pop() {
      return stack.pop();
    },
  };
}


let stack = newStack();
stack.push(1);
stack.push(2);
stack.push(3);

stack.printStack(); // 1 \n  2 \n  3  
console.log(stack.pop()); // 3
console.log(stack.push(4)); // 3 - length of stack