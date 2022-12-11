const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  if (err.name === "CastError") {
    return res.status(400).json({ msg: "Invalid document ID" });
  }

  if (err.name === "ValidationError") {
    const {errors} = err;
    const message = Object.values(errors).map(item=>item.message).join(', ');
    return res.status(400).json({ err: message });
  }
  if (err.code && err.code === 11000) {
    const message = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    return res.status(400).json({ err: message });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
}

module.exports = errorHandlerMiddleware
