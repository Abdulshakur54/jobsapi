const config = {
  DURATION: 60,  // in seconds
};
const getConfig = (configName) => {
  return config[configName]
}
module.exports = getConfig;
