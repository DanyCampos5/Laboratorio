import mysql from "mysql"

export const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "crud"
});