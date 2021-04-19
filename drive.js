const path = require("path")
const fs = require("fs/promises")

function listAll() {
    console.log("Tete de bite");
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

module.exports = {
    listAll: listAll,
};