const path = require("path")
const fs = require("fs/promises")

function listAll() {

};

const directoryPath = path.join(__dirname, "files")

fs.readdir(directoryPath, function(err, files) {
    if (err) {
        console.log("Error getting directory information.")
    } else {
        files.forEach(function(file) {
            console.log(file)
        })
    }
})

modules.exports = {
    list: listAll,
}