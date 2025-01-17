//modules
const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config() //get variables from our env file

//verifying server connection
app.listen(3000, () => {
console.log("listening on port 3000")})



//import model to talk to the db
const FlowerModel = require('./models/flower')
//connecting to express server to the database
mongoose.connect(process.env.MONGODB_URI)

//event listener for "connected" event
mongoose.connection.on('connected', function() {
    console.log('Express has established a connection with mongoDB <3')
})

//middleware to process form requests
//routes can access req.body to get content about our flowers
app.use(express.urlencoded({extended:false}))

app.get("/", (req ,res) => {
    res.render("index.ejs")
})

//render always look in views folder for ejs files
app.get("/roses", (req,res)=>{
    res.render("index.ejs")
})