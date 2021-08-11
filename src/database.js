//mysql
const mysql = require('mysql');
const { promisify } = require('util');  

const { database } = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err) {
        console.log('Error with database connection');
    }

    if (connection) connection.release();
    console.log('DB is connected');
    return;

});

pool.query =  promisify(pool.query);

module.exports = pool


//Mongodb
/* const mongoose = require('mongoose');

const { database } = require('./keys');

mongoose.connect(database.URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err)) */