const jwt = require('jsonwebtoken');
const getConfig = require('./Configs')
class JWT{
    static isSessionTokenExpired(token){
        const decToken = jwt.decode(token);
        const timeGenerated = decToken.DURATION
        const DURATION = getConfig('DURATION') * 1000;
        const result =  (Date.now() > timeGenerated + DURATION ? true:false);
        return result;
    }
}
module.exports = JWT;