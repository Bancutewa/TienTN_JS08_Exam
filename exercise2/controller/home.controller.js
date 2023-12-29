const express = require("express")
const home = express.Router()
var path = require('path')

const publicPath = path.join(__dirname, '../public')
home.use(express.static(publicPath));

home.get("/", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
})

module.exports = home