
const jwt = require("jsonwebtoken");
const configs = require("../configs/index");
const secretKey = "daeunkey";


const sign = (userId) => {
    return jwt.sign({userId: userId}, secretKey);
};

const verify = (token) => {
    try {
        if(!token)
            throw "Access Denied";
        return jwt.verify(token, configs.jwt);
    } catch(error) {
        throw error;
    }
}

module.exports = {sign, verify};
