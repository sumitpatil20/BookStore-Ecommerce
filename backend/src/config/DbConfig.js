import mysql2 from 'mysql2/promise';

export const pool = mysql2.createPool({
    host:'localhost',
    user:'root',
    password:'Patil@123',
    port : '3306' ,
    database : 'bookStore',
    connectionLimit : '10',
    waitForConnections:true

});
