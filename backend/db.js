const mysql = require('mysql2');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '15929867187xxx',
    database: 'blog_documents'
});

module.exports = pool.promise();