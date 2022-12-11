require("dotenv").config();
const getEnv = (envVariable) => {
  return process.env[envVariable];
};
module.exports = getEnv;
