const mysql = require('mysql');
require('dotenv');

const db = mysql.createConnection({
    host : process.env.DB_HOST || "mysql-71846-0.cloudclusters.net",
    user : process.env.DB_USER  || "markbincom",
    password : process.env.DB_PASSWORD || "LwqrO6YF",
    database : process.env.DB_NAME || "bincom_test"
});

db.connect((err) => { if(err) throw err; else console.log('SQL_db connected') });

module.exports = db
