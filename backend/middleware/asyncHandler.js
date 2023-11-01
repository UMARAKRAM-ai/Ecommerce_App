// middleware is designed to simplify error handling in async Express.js route handlers.
// It wraps the provided route handler function 'fn' and ensures that any errors occurring during its execution
// are caught and passed to the 'next' middleware for centralized error handling.
const asyncHandler = fn => (req, res, next) => {
    // Wrap 'fn' in a Promise, and use '.catch(next)' to catch and pass errors to the next middleware.
    Promise.resolve(fn(req, res, next).catch(next));
  };
  
  export default asyncHandler;
  