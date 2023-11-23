// const asyncHandler = () => {};
// const asyncHandler = (fn) => {()=>{}};
// const asyncHandler = (fn) => async () => {}

/*

const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn (req, res, next);
    } catch (error) {
        res.status(err.code || 500).json({
            success: false,
            message: error.message
        })
    }
};
export {asyncHandler};
===========================
================
=====
NOW THE EXACT SAME CODE IN PROMISE =====
*/
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
    }
};
export {asyncHandler};



// const asyncHandler = (fn) => (req, res, next) => {
//     fn(req, res, next)
//       .then(() => {
//         // Code to execute if the promise resolves successfully
//         next();
//       })
//       .catch((error) => {
//         // Code to execute if the promise rejects with an error
//         res.status(error.code || 500).json({
//           success: false,
//           message: error.message,
//         });
//       });
//   };
  
//   export { asyncHandler };
