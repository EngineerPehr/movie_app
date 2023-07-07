function asyncErrorHandler(delegate, defaultStatus) {
    return (req, res, next) => {
        async () => {
            try {
                await delegate(req, res, next)
            }
            catch (error) {
                const { status = defaultStatus, message = error } = error
                next({ status, message })
            }
        }
    }
}
  
module.exports = asyncErrorHandler