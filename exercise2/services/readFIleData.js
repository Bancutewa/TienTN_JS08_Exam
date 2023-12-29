
const fs = require("fs")
const path = require("path")
const readFileData = () => {
    console.log(__dirname);
    const dataString = fs.readFileSync(path.join(__dirname, '../data/todos.json'))
    const data = JSON.parse(dataString)
    return data
}

module.exports = readFileData