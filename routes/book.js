const express = require('express')
const route = express.Router()
const db = require('../model/db.js')


route.get('/',(req,res)=>{
    let sql = "SELECT * FROM book"
    db.query(sql, function(err,result){
        if (err){
            console.log(err) ;
            res.status(409).send(err);
        }
        else{
            console.log(result)
            res.status(200).send(result)
        }

    })
    
   
})

route.post('/add',(req,res)=>{
    console.log(req.body);
    let sql = "INSERT INTO book (Name, Instock) VALUES (?,?)";
    db.query(sql, [req.body.name , req.body.stock], function(err,result){
        if (err) {
            console.log(err) ;
            res.status(409).send(err);
            
            
        }
        else{
            console.log(result);
            res.status(200).send(result);
        }

    })

})


route.post('/delete',(req,res)=>{
    console.log(req.body);
    let sql = "DELETE FROM book WHERE Name = ?";
   // db.query("SELECT * FROM book WHERE Name = ?",[req.body.name],  )
   // if ()
    db.query( sql,[req.body.name], function(err,result){
        if (err) {
            console.log(err) ;
            res.status(409).send(err);
        }
        else{
            console.log(result);
            res.status(200).send({"affected row": result.affectedRows});
        }


    } )


})




module.exports = route