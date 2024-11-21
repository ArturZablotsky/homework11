function validate(fn, validator) {
    return function (...args) {
      if (!validator(...args)) {
        throw new Error('Validation failed: ' + JSON.stringify(args));
      }
      return fn(...args);
    };
  }
  
  const sum = (a, b) => a + b;
  
  const isNumberValidator = (...args) => args.every(arg => typeof arg === 'number');
  
  const validatedSum = validate(sum, isNumberValidator);
  
  try {
    console.log(validatedSum(2, 3));
    console.log(validatedSum(2, '3'));
  } catch (error) {
    console.error(error.message);
  }