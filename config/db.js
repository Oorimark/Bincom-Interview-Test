const mysql = require('mysql')
require('dotenv');

// process.env.DB_HOST || 
// process.env.DB_USER  || 
// process.env.DB_PASSWORD ||
// process.env.DB_NAME || 

const db = mysql.createConnection({
    host : "mysql-71846-0.cloudclusters.net",
    port : "19414",
    user : "admin",
    password :  "LwqrO6YF",
    database : "bincom_test"
});

db.connect((err) => { if(err) throw err; else console.log('SQL_db connected') });

module.exports = db
