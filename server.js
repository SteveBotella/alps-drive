const express = require('express');
const app = express();

app.use(express.static('frontend'));
app.use((req, res) => {
    res.json({message: "Ca marche toujours"});
});
app.get("/api/drive", (req, res) => {
    res.send(drive.listAll());
});

module.exports = app;