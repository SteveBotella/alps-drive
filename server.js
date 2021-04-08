//app.js

const express = require('express');
const app = express();

app.use((req, res) => {
    res.json({message: "Ca marche"});
});

module.exports = app;