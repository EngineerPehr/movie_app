// Error handler for missing paths
const notFound = (req, _res, next) => {
    next({ status: 404, message: `${req.originalUrl}` })
  }
  
module.exports = notFound