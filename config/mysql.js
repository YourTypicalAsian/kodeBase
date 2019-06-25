module.exports = (function () {
    const mysql = require('mysql');
    return () => mysql.createPool({
        'connectionLimit': 10,
        'host': process.env.DB_HOST || 'localhost',
        'user': process.env.DB_USER || 'root',
        'password': process.env.DB_PSWD || '',
        'database': process.env.DB_DTBS || 'praktiskweb'
    });
}());