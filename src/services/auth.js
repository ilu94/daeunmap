const { query, getConntection, insertGetId, getConnection } = require("../helpers/mysql");
const { sign, verify } = require("../helpers/jwt");
const { hash, compare } = require("../helpers/bcrypt");
const message = require("../libs/message");
const localstorage = require('local-storage');
const { response } = require("../../app");

const signIn = async ({username, password, token}) => {

    if(token) {
        const tokenUser = verify(token);
        const tokenUserData = await query(
            `
            select * from loc.Users where userId = ?
            `,
            [tokenUser.userId],
            true
        );

        if(!tokenUserData) {
            throw "조회할 수 없습니다."
        }else {
            return { user: tokenUserData }
        }
    }

    if(!username || !password) {
        throw message.wrongInput;
    }

    const user = await query(
        `select * from loc.Users where username=?`,
        [username],
        true
    )

    //console.log(username + " " + password)
    if(!user) {
        throw message.checkUsername;
    } else if (!compare(user.password, password)) {
        throw message.checkPassword;
    }

    const newtoken = sign({ userId: user.userId });
    

    return {
        token: newtoken
    }

    
}

const signUp = async({ username, password}) => {
    console.log(username + " " + password)
    let connection = null;

    try {
        connection = await getConnection();


        const isExist = (
            await connection.query(
                `select userId from loc.Users where username = ?`,
            [username],
            true
            )
        )[0][0];

        if(isExist) {
            throw {message: "중복된 이메일 정보가 있습니다."}
        }

        const userId = await insertGetId(
            connection,
            ` insert into loc.Users(username, password) values (?,?) `,
            [username, hash(password)]
        );
            
        const [ud] = await connection.query(
            ` select * from loc.Users where userId = ?`, 
        [userId], 
        true
        );

        const user = ud[0];

        if(!user)
            throw "찾는 사용자가 없습니다. ";
    
            
        connection.release();

        const token = sign(userId)

        console.log(userId)
        return {
            token:token
        }

    
    } catch(error) {
        if(connection) {
            await connection.release();
        }
        console.log(error)
    }

}

module.exports = {
    signIn,
    signUp
}   