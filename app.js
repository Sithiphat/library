const express = require("express")
const app = express()
const config=  require('config')
//const user=require('./routes/user.js')
const book=require('./routes/book.js')





app.use(express.json())




//sapp.use('/user',user)
app.use('/book',book)

app.listen(config.get("port"))