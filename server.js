//modules
const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const morgan = require('morgan')
dotenv.config() //get variables from our env file
const methodOverride = require('method-override')
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev")); //new
app.use(methodOverride("_method")); // 
//verifying server connection
app.listen(3000, () => {
    console.log("listening on port 3000")
})


//import model to talk to the db
const FlowerModel = require('./models/flower')
//connecting to express server to the database
mongoose.connect(process.env.MONGODB_URI)

//event listener for "connected" event
mongoose.connection.on('connected', function () {
    console.log('Express has established a connection with mongoDB <3')
})

//middleware to process form requests
//routes can access req.body to get content about our flowers
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
    res.render("index.ejs")
})
//action - index all plants list! - WORKS
app.get('/flowers', async (req,res) => {
    const bouquet = await FlowerModel.find({})
    console.log(bouquet) //all flowers
    res.render("flowers/index.ejs",{flowerDoc: bouquet} )
})

app.get('/flowers', (req,res) => {
    res.render("flowers/show.ejs")
})  
//render always look in views folder for ejs files
app.get("/flowers/new", (req, res) => {
    res.render("flowers/new.ejs")
})
//create functionality
app.post('/flowers', async function (req, res){
    console.log(req.body, "body of request")
    req.body.isPerfect = !!req.body.isPerfect
    flowerDoc = await FlowerModel.create(req.body)
    console.log(flowerDoc)
    res.redirect("/flowers")
    })

//SHOW specific ID
app.get('/flowers/:flowersId', async (req,res) => {
  //  http://localhost:3000/flowers/?flowersId:678f03bb5a62912de0a885ac
    console.log(req.params.flowersId)
    const flowerDoc = await FlowerModel.findById(req.params.flowersId)
    console.log(flowerDoc)
    res.render('flowers/show.ejs', {flowerDoc: flowerDoc})
})
app.get('/flowers/:flowersId/edit', async (req,res) =>{
    console.log(req.params.flowersId)
    const flowerDoc = await FlowerModel.findById(req.params.flowersId)
    console.log(flowerDoc)
    res.render('flowers/edit.ejs')
})
app.put('/flowers/:flowersId/edit', async (req,res) =>{
    console.log(req.params.flowersId)
    const updatedFlower = await FlowerModel.findByIdAndUpdate(req.params.flowersId)
    console.log(flowerDoc)
    res.render('/flowers/updatedflower')

})

//DELETE
//works
app.delete('/flowers/:flowersId', async function(req, res){
	const deletedFlower = await FlowerModel.findByIdAndDelete(req.params.flowersId)
	res.redirect('/flowers')
    console.log('deleted',deletedFlower)
    

})
