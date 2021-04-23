const path = require('path')
const fs = require('fs/promises')
const os = require('os')
const ALPS_DRIVE_ROOT = path.join(os.tmpdir(), 'alpsDrive')
let actualPath = "/";

function logFolderExist() {
}

// Create a folder alpsDrive
function createRootFolderNoVerify() {
    return fs.mkdir(ALPS_DRIVE_ROOT);
    console.log(ALPS_DRIVE_ROOT)
}

// Check if foler exist
function rootFolderExists() {
    return fs.access(ALPS_DRIVE_ROOT);
}

// Create a folder or not if already exist
function createRootFolder() {
    return rootFolderExists()
        .then(logFolderExist)
        .catch(createRootFolderNoVerify);
}

// List all the files and folder
function listAll(newPath) {
    actualPath = newPath
    let folder = ALPS_DRIVE_ROOT + actualPath;
    const allFoldersAndFilesPromise = fs.readdir(folder, {withFileTypes:true})
    return allFoldersAndFilesPromise.then((folderAndFilesList) => {
        //console.log(folderAndFilesList)
        const folderAndFilesTab = []
        folderAndFilesList.forEach((result) => {
            folderAndFilesTab.push({
                name: result.name,
                isFolder: result.isDirectory(),
            })
        })
        //console.log(folderAndFilesList)
        return folderAndFilesTab
    })
}

// Is file or folder
function isFileOrFolder(name) {
    const pathValue = path.join(ALPS_DRIVE_ROOT, name)
    const stat = fs.stat(pathValue)
        return stat.then(resultFile => {
            return resultFile.isFile() //Return true or false
        })
}

// Display file or open folder
function displayContent(name) {
    const pathValue = path.join(ALPS_DRIVE_ROOT, name);
    const read = fs.readFile(pathValue, 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
    });
    return read
}

// Create folder
function createFolder(name) {
    const pathValue = path.join(ALPS_DRIVE_ROOT, name);
    const createdFolder = fs.mkdir(pathValue)
    return createdFolder
}

// Delete folder
function deleteFolder(name) {
    const pathValue = path.join(ALPS_DRIVE_ROOT, name);
    const deleteDirectory = fs.rmdir(pathValue)
    return deleteDirectory
}

module.exports = {
    createRootFolder: createRootFolder,
    listAll: listAll,
    isFileOrFolder: isFileOrFolder,
    displayContent: displayContent ,
    createFolder: createFolder,
    deleteFolder: deleteFolder,
};