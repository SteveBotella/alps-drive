const path = require('path')
const fs = require('fs/promises')
const os = require('os')
const ALPS_DRIVE_ROOT = path.join(os.tmpdir(), 'alpsDrive')
let actualPath = "/";

function logFolderExist() {
    console.log("Folder exist");
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
        //console.log(folderAndFilesTab)
        return folderAndFilesTab
    })
}

// Open a selected file or folder
function openFileOrFolder(name) {
    const path = path.join(ALPS_DRIVE_ROOT, name)
    const stat = fs.stat(path)
        .then(resultFile => {
            return resultFile.isFile() //Return true or false
        })
    return stat;
}

// Display file
function displayContent(name) {
    const path = path.join(ALPS_DRIVE_ROOT, name);
    const read = fs.readFile(path)
        .then((data) => {
            return data;
        })
    return read;
}

module.exports = {
    createRootFolder: createRootFolder,
    listAll: listAll,
    openFileOrFolder: openFileOrFolder,
    displayContent: displayContent ,
};