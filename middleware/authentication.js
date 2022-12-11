const { getEnv } = require("../helpers");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError, BadRequestError } = require("../errors");
const { isBearerToken, getBearerToken, getPayload } = require("../helpers");

const validToken = (req, res, next) => {
  if (!isBearerToken(req)) {
    throw new BadRequestError("Token is not a Bearer token");
  }
  const token = getBearerToken(req);
  if (jwt.verify(token, getEnv("JWT_SECRET"))) {
    next();
  } else {
    throw new UnauthenticatedError("Token is invalid");
  }
};

const attachUserId = (req, res, next) => {
  req.userId = getPayload(req).userId;
  next()
};

module.exports = { validToken, attachUserId };
