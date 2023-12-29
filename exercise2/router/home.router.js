const express = require("express")
const home = express.Router()
// var path = require('path')
const homeController = require("../controller/home.controller")
const homeAPI = require("../controller/api/todo.api")


home.use("/", homeController)

home.use("/api/v1/todos", homeAPI)

module.exports = home