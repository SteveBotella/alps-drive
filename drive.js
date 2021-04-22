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

// Open a selected file or folder
function openFileOrFolder(name) {
    const pathValue = path.join(ALPS_DRIVE_ROOT, name)
    const stat = fs.stat(pathValue)
        return stat.then(resultFile => {
            return resultFile.isFile() //Return true or false
        })
}

// Display file
function displayContent(name) {
    const pathValue = path.join(ALPS_DRIVE_ROOT, name);
    const read = fs.readFile(pathValue, 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
    });
    console.log(ALPS_DRIVE_ROOT)
    return read
}

function createFolder(name) {
    const pathValue = path.join(ALPS_DRIVE_ROOT, name);
    const createdFolder = fs.mkdir(pathValue)
    return createdFolder
}

function deleteFolder(name) {
    const pathValue = path.join(ALPS_DRIVE_ROOT, name);
    const deleteDirectory = fs.rmdir(pathValue)
    return deleteDirectory
}

module.exports = {
    createRootFolder: createRootFolder,
    listAll: listAll,
    openFileOrFolder: openFileOrFolder,
    displayContent: displayContent ,
    createFolder: createFolder,
    deleteFolder: deleteFolder,
};