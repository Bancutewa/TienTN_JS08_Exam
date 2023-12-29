

const fs = require("fs")
const path = require("path")
const ReWriteData = (data) => {
    fs.writeFileSync(path.join(__dirname, '../data/todos.json'), JSON.stringify(data, null, 2), { encoding: "utf-8" })
}

module.exports = ReWriteData