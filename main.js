const express = require('express');

const main = express();

main.use((req, res) => {
    res.json({message: "Request done"});
});

module.exports = main;