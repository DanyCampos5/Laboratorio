const mysql = require("mysql2/promise"); // usa versão promise do mysql2

const pool = mysql.createPool({ // cria um pool de conexões reutilizável
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
    database: "crud",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

async function testConnection() { // função para testar se o DB responde
    const [rows] = await pool.query('SELECT NOW() AS now'); // executa consulta simples que retorna data/hora do servidor
    console.log("resposta do banco: ", rows[0].now); // loga o resultado para depuração
    return rows[0].now; // retorna o timestamp obtido
}

testConnection(); // chama a função de teste ao iniciar o módulo

module.exports = pool; // exporta o pool para uso em outros módulos