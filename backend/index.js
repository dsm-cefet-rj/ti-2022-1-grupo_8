const express = require("express");
require("dotenv").config();
const port = process.env.BACKEND_PORT || 3001;

const server = express();
const rotasUsuario = require("./usuario");

server.get("/", (req, res) => {
    res.status(400).send("Bad Request");
});

server.use("/usuario", rotasUsuario);

server.listen(port, () => {
    console.log(
        `⚠️ ❗ Servidor aberto no endereço http://localhost:${port} ❗⚠️`
    );
});
