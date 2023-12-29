const express = require("express")
const path = require('path');
const app = express()


const homeRouter = require("./router/home.router")


// Page Router
app.use("/", homeRouter)

app.listen("8082", console.log("Hello world"))