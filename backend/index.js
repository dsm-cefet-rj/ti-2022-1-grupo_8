const express = require("express");
require('dotenv').config();

const port = process.env.BACKEND_PORT || 3001;

const server = express();

server.get("/", (req, res) => {
    res.send("Hello👋 World🌎!");
});

server.listen(port, () => {
    console.log(`⚠️❗ Backend listening on port ${port} ❗⚠️`);
});
