const express = require("express");
require("dotenv").config();

const port = process.env.BACKEND_PORT || 3001;
const server = express();
const rotasUsuario = require("./rotas/usuario");
const rotasLogin = require("./rotas/login");

server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
    next();
});

server.use(express.json());

server.get("/", (req, res) => {
    res.status(400).send("Bad Request");
});

server.use("/login", rotasLogin);

server.use("/usuario", rotasUsuario);

server.listen(port, () => {
    console.log(
        `⚠️ ❗ Servidor aberto no endereço http://localhost:${port} ❗⚠️`
    );
});
