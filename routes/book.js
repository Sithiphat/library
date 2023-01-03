const express = require('express')
const route = express.Router()
const db = require('../model/db.js')


route.get('/',(req,res)=>{
    let sql = "SELECT * FROM book"
    db.query(sql, function(err,result){
        if (err) throw err;
        console.log(result)
        res.status(200).send(result)

    })
    
   
})

route.post('/add',(req,res)=>{
    console.log(req.body);
    let sql = "INSERT INTO book (Name, Instock) VALUES (?,?)";
    db.query(sql, [req.body.name , req.body.stock], function(err,result){
        if (err) throw err;
        console.log(result);
        res.status(200).send(result);

    })

})


route.post('/delete',(req,res)=>{
    console.log(req.body);
    let sql = "DELETE FROM book WHERE Name = ?";
    db.query( sql,[req.body.name], function(err,result){
        if (err) throw err;
        console.log(result);
        res.status(200).send(result);



    } )


})




module.exports = route