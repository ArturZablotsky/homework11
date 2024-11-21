function logArguments(fn) {
    return function (...args) {
      console.log('Arguments:', args);
      return fn(...args);
    };
  }
  
  const sum = (a, b) => a + b;
  
  const loggedSum = logArguments(sum);
  
  console.log(loggedSum(2, 3));
  console.log(loggedSum(10, 20));