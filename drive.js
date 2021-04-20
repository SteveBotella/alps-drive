const path = require("path")
const fs = require("fs/promises")
const os = require("os")
const ALPS_DRIVE_ROOT = path.join(os.tmpdir(), "alpsDrive")
//Path tmp
console.log("truc", ALPS_DRIVE_ROOT)

function logFolderExist() {
    console.log("Folder exist");
}

function createRootFolderNoVerify() {
    return fs.mkdir(ALPS_DRIVE_ROOT);
}

function rootFolderExists() {
    return fs.access(ALPS_DRIVE_ROOT);
}

function createRootFolder() {
    return rootFolderExists()
        .then(logFolderExist)
        .catch(createRootFolderNoVerify);
}

function listAll() {
    // directory path
    const directoryPath = path.join(__dirname, "files")

    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            console.log("Error getting directory information.")
        } else {
            files.forEach(function (file) {
                console.log(file)
            })
        }
    });
}

module.exports = {
    createRootFolder: createRootFolder,
    listAll: listAll,
};