
const jwt = require("jsonwebtoken");
const configs = require("../configs/index");
const secretKey = "daeunkey";

const options = {
    expiresIn:'7d', issuer:"daeuntest", subject: 'userinfo'
}

const sign = (userId) => {
    return jwt.sign(userId, secretKey, options, function(err, token) {

    });
};

const verify = (token) => {
    try {ks
        if(!token)
            throw "Access Denied";
        return jwt.verify(token, configs.jwt);
    } catch(error) {
        throw error;
    }
}

module.exports = {sign, verify};
