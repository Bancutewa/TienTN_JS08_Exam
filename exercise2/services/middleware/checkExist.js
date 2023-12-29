const readFileData = require("../readFIleData")

const checkExist = (req, res, next) => {
    const data = readFileData()
    const todoID = req.params.id
    const title = req.body.title
    const todo = data.find(todo => todo.id == todoID)
    const titleContent = data.find(todo => todo.title == title)

    if (!todo) {
        res.status(404).json("Todo not found")
    }
    else if (titleContent) {
        res.status(404).json("Todo already exists")
    }
    next()
}
module.exports = checkExist