// Error handler for async functions
function asyncErrorHandler(delegate, defaultStatus) {
    return async (req, res, next) => {
        // Trys to run given function
        try {
            await delegate (req, res, next)
        }
        // Catches error and passes them to errorHandler
        catch (error) {
            const { status = defaultStatus, message = error } = error
            next({ status, message })
        }
    }
}
  
module.exports = asyncErrorHandler