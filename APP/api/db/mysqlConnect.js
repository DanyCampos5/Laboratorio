const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "crud",
    port:3307,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;

async function testConnection() {
    const[rows] = await pool.querty("SELECT now() AS now");
    console.log("Resposta do banco:",rows[0].now);
    return rows[0].now;
}

testConnection();