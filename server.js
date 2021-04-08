//app.js

const express = require('express');
const app = express();

app.use(express.static('frontend'));
app.use((req, res) => {
    res.json({message: "Ca marche toujours"});
});

module.exports = app;