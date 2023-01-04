const express = require('express')
const route = express.Router()
const db = require('../model/db.js')

route.get('/', async (req,res)=>{
    let sql = "SELECT * FROM book ORDER BY Name";
    let [row,field]= await db.query(sql)
    console.log(row)
    res.status(200).send(row)
    
})

route.post('/add', async (req,res)=>{
    let sql = "INSERT INTO book (Name, InStock,FullStock) VALUES (?,?,?)";
    let result,row
    try{
     [result,row] = await db.query(sql, [req.body.name , req.body.stock,req.body.stock]);
    
    } catch(err){
        return res.status(409).send(err.code)

    }
    console.log(result)
    res.status(200).send(result)
})


route.post('/delete', async(req,res)=>{
    console.log(req.body);
    let sql = "DELETE FROM book WHERE Name = ?";
    let result,field
    try{
        [result,field]= await db.query( sql,[req.body.name] )
    } catch(err){
        return res.status(409).send(err.code)
    }
    console.log(result);
    res.status(200).send("affected row= "+ result.affectedRows);
})

route.post('/borrow', async (req,res)=>{
    let sql = "SELECT InStock FROM book WHERE Name = ?";
    let [result,field]=  await db.query(sql,[req.body.name])
    console.log(result); 
    if (result.length===0) return res.status(409).send("No found book");
    let inStock= result[0]["InStock"];
    if (inStock===0) return res.status(409).send("The book is not in stock.");
    inStock--;
    sql = "UPDATE book SET InStock = "+ inStock +" WHERE Name = ?";
    [result,field]= await db.query(sql,[req.body.name])
    res.status(200).send(result.info);  
})

route.post('/return',async (req,res)=>{
    let sql = "SELECT InStock , FullStock FROM book WHERE Name = ?";
    let [result,field]=  await db.query(sql,[req.body.name])
    console.log(result); 
    console.log(result[0]["InStock"]);
    if (result.length===0) return res.status(409).send("No found book");
    let inStock= result[0]["InStock"];
    if (inStock === result[0]["FullStock"]) return res.status(409).send("The book's stock is full.");
    inStock++;
    sql = "UPDATE book SET InStock = "+ inStock +" WHERE Name = ?";
    [result,field]= await db.query(sql,[req.body.name])
    res.status(200).send(result.info); 
})



module.exports = route