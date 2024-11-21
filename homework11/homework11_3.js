function retry(fn, maxAttempts) {
    return function (...args) {
      let attempts = 0;
      let lastError;
  
      while (attempts < maxAttempts) {
        try {
          return fn(...args);
        } catch (error) {
          attempts += 1;
          lastError = error;
          console.warn(`Attempt ${attempts} failed. Retrying...`);
        }
      }
  
      throw new Error(`Function failed after ${maxAttempts} attempts: ${lastError.message}`);
    };
  }
  
  const unreliableFunction = (a) => {
    if (Math.random() > 3.5) {
      throw new Error("Random failure");
    }
    return Success;
  };
  
  const retriedFunction = retry(unreliableFunction, 5);
  
  try {
    const result = retriedFunction("test");
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }