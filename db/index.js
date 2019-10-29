const db = require('mysql');
const pool = db.createConnection({
    connectionLimit: 10,
    user: process.env.MysqlUser,
    password: process.env.MysqlPassword,
    database: 'bed_e_commerce',
    port: 3306,
});

// Getting the other dbs
const productsDB = require('./productsDB');
const usersDB = require('./usersDB');
const cartDB = require('./cartDB');
const transactionsDB = require('./transactionsDB');

productsDB.init(pool);
usersDB.init(pool);
cartDB.init(pool);
transactionsDB.init(pool);

const dataAccess = {
    products: productsDB,
    users: usersDB,
    cart: cartDB,
    transactions: transactionsDB,
};

module.exports = dataAccess;