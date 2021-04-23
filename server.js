const express = require('express');
const bb = require('express-busboy');
const app = express();
const drive = require('./drive');

bb.extend(app, {
        upload: true,
        path: 'C:/Users/steve/AppData/Local/Temp/alpsDrive'
    })

function start() {
    app.use(express.static('frontend'));
    app.listen(3000, () => {
    })
}

// List all folders and files
app.get("/api/drive/", (req, res) => {
    drive.listAll("/").then(list => {
        res.send(list);
    })
});


// Open folder or file
app.get("/api/drive/:name", (req, res) => {
    let name = req.params.name;
    let promise = drive.isFileOrFolder(name);

    promise.then((isFile) => {
        if (isFile) {
            let file = drive.displayContent(name);
            file.then((name) => {
                res.send(name)
                //return data;
            }).catch((err) => {
                console.log(err)
            })
        } else {
            drive.listAll("/" + name).then((list) => {
                res.send(list);
            })
        }
    })
        .catch((err) => {
        console.log(err)
    })
})

// Create folder in root
app.post("/api/drive", (req, res) => {
    const newDirectory = drive.createFolder(req.query.name)
    newDirectory.then((newFolder) => {
        res.end(newFolder)
    })
})

// Delete Folder in root
app.delete("/api/drive/:name", (req, res) => {
    const deleteDirectory = drive.deleteFolder(req.params.name)
    deleteDirectory.then((oldFolder) => {
        res.send(oldFolder)
    })
})

// Create folder in folder
app.post("/api/drive/*/:name", (req, res) => {
    //let actualUrl = req.url
})

module.exports = {
    start: start,
};