const mysql = require('mysql2');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'recieptaurant.c5ss2wgquzd7.us-east-2.rds.amazonaws.com',      
  user: 'admin',          
  password: 'PuttaShree&2025',   
  database: 'receiptaurant_cs484' 
});

module.exports =  pool.promise();
