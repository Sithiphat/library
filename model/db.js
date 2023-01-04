
    const config=require('config')
    const mysql= require('mysql2/promise')

    const pool =  mysql.createPool({
        host: config.get('mysql.host'),
        user: config.get('mysql.user'),
        password: config.get('mysql.password'),
        database: config.get('mysql.database')
    
    });

  


module.exports=pool;