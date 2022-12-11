const getEnv = require("./env");
const getConfig = require("./configs");
const JWT = require("./JWT");
const jwt = require("jsonwebtoken");

const isBearerToken = (req) => {
  return req.headers.authorization.split(" ")[0] == "Bearer";
};

const getBearerToken = (req) => {
  return req.headers.authorization.split(" ")[1];
};

const getPayload = (req) => {
  const token = getBearerToken(req);
  return jwt.decode(token);
};
module.exports = {
  getEnv,
  getConfig,
  JWT,
  isBearerToken,
  getBearerToken,
  getPayload,
};
