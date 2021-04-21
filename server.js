const express = require('express');
const app = express();
const drive = require('./drive');

function start() {
    app.use(express.static('frontend'));
    app.listen(3000, () => {
    })
}

app.get("/api/drive/", (req, res) => {
    drive.listAll("/").then(list => {
        res.send(list);
    })
});

app.get("/api/drive/:name", (req, res) => {
    let name = req.params.name;
    let promise = drive.openFileOrFolder(name);

    promise.then((isFile) => {
        if (isFile) {
            let file = drive.displayContent(name);
            file.then((data) => {
                console.log(data)
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

module.exports = {
    start: start,
};