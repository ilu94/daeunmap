const { compare, hash } = require("../helpers/bcrypt");
const { sign, verify } = require("../helpers/jwt");
const { query, escapeId, escape } = require("../helpers/");

const message = require('../../libs/message');

const signIn = async ({username, password}) => {
    if(!username || !password) {
        throw message.wrongInput;
    }

    const user = await query(
        `select * from loc.Users where username=? and password=?`,
        [username, password],
        true
    )

    if(!user) {
        throw message.checkUsername;
    } else if (!compare(user.password, password)) {
        throw message.checkPassword;
    }

    const token = sign({ userId: user.username });

    console.log(token)

    return {
        token,
        user,
    }
}

module.exports = {
    signIn,
    
}