const express = require("express")
const app = expess()
const config=require('config')

app.use(express.json())


app.use('/user',user)
app.use('/book',book)

