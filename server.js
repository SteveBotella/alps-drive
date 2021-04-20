const express = require('express');
const app = express();
const drive = require('./drive');

function start() {
    app.use(express.static('frontend'));
    app.listen(3000, () => {
    })
}

app.get("/api/drive", (req, res) => {
    drive.listAll().then(list => {
        res.send(list);
    })
});

app.get("/api/drive/{name}", (req, res) => {
   drive.openFileOrFolder(name).then(result => {
       res.send(result)
   })
});

module.exports = {
    start: start,
};