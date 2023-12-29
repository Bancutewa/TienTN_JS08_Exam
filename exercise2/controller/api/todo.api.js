const express = require("express");
const fs = require("fs")
const todoAPI = express.Router()
const bodyParser = require("body-parser");
const readFileData = require("../../services/readFIleData");
const ReWriteData = require("../../services/writeFileData");
const checkExist = require("../../services/middleware/checkExist");


// Use Body parse
// parse application/x-www-form-urlencoded
todoAPI.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
todoAPI.use(bodyParser.json())

todoAPI.get("/", (req, res) => {
    const data = readFileData()
    res.status(200).json(data)
    res.end()
})


todoAPI.get("/:id",
    checkExist,
    (req, res) => {
        const data = readFileData()
        const todoID = req.params.id
        const todo = data.find(todo => todo.id == todoID)
        res.status(200).json(todo)
    })

todoAPI.post("/", (req, res) => {
    const data = readFileData()
    const { userId, title, completed } = req.body
    const id = data[data.length - 1].id + 1;
    const newTodo = {
        "userId": userId,
        "id": id,
        "title": title,
        "completed": completed
    }
    const todoExits = data.find(todo => todo.id == id)

    if (!todoExits) {
        data.push(newTodo)
        ReWriteData(data)
        res.status(201).json(newTodo)
    } else {
        res.status(404).json("todo already exists")
    }

})
todoAPI.put("/:id", checkExist, (req, res) => {
    const data = readFileData()
    const todoID = req.params.id;

    const updatedData = data.map(todo => {
        if (todo.id == todoID) {
            return req.body
        }
        return todo;
    });
    ReWriteData(data)
    const todoUpdated = updatedData.find(todo => todo.id == todoID);
    res.status(200).json(todoUpdated);

});
todoAPI.delete("/:id", checkExist, (req, res) => {
    const data = readFileData()
    const todoID = req.params.id
    const todoIndex = data.findIndex(todo => todo.id == todoID)
    data.splice(todoIndex, 1)
    ReWriteData(data)
    res.status(200).json("Delete successfully")

})

module.exports = todoAPI