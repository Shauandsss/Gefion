async function connect() {
    if (global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require('mysql2/promise');
    const connection = await mysql.createConnection("mysql://root:@127.0.0.1:3306/user_gefion")
    console.log("Conectou no MySQL!")
    global.connection = this.connection
    return connection;
}


async function selectStocks() {
    const conn = await connect();

    return await conn.query('SELECT * FROM STOCKS_QUANTITY;')
}
async function selectStocks(Group_ID) {
    const conn = await connect();
    const sql = 'SELECT * FROM STOCKS_QUANTITY WHERE GROUP_ID = ?;'
    const values = [Group_ID]
    return await conn.query(sql, values)
}


module.exports = {
    selectStocks
}