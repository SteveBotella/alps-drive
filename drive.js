const path = require('path')
const fs = require('fs/promises')
const os = require('os')
const ALPS_DRIVE_ROOT = path.join(os.tmpdir(), 'alpsDrive')

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
function listAll() {
    const allFoldersAndFilesPromise = fs.readdir(ALPS_DRIVE_ROOT, {withFileTypes:true})
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
function openFileOrFolder() {

}

module.exports = {
    createRootFolder: createRootFolder,
    listAll: listAll,
    openFileOrFolder: openFileOrFolder,
};