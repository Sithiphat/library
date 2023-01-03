const config=require('config')
const mysql= require('mysql2')
const connection = mysql.createConnection({
    host: config.get('mysql.host'),
    user: config.get('mysql.user'),
    password: config.get('mysql.password'),
    database: config.get('mysql.database')

});

connection.connect(error =>{
    if(error) throw error;
    console.log("Successfully connected to the database.");

});
module.exports=connection;