const mysql = require("mysql2/promise");
const configs = require("../configs/index");
const pool = mysql.createPool(configs.mysql);

const query = async(str, params, one) => {
    const conn = await pool.getConnection(async(conn) => conn);
    const [rows, data] = await conn.query(str, params || []);
    conn.release();

    if(one) {
        return rows[0]
    }
    return rows;
}

const getConnection = async() => {
    return await pool.getConnection();
}

const insertGetId = async( conn, query, params) => {
    const [rows, data] = await conn.query(query, params || []);
    return rows.insertId;
}

module.exports = {
    query,
    getConnection,
    insertGetId,
}
