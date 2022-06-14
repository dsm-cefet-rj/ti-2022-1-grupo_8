var express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = process.env.BACKEND_PORT || 3001;

const ingredientes = require("./data/ingredientes.json");
const pizzas = require("./data/pizzas.json");
const produtos = require("./data/produtos.json");
const usuarios = require("./data/usuarios.json");

const server = express();

server.get("/", (req, res) => {
    res.status(400).send("Bad Request");
});

server.set("/criar-usuario", (req, res) => {});

server.set("/criar-pizza", (req, res) => {});

server.set("/criar-pedido", (req, res) => {});

server.get("/pizza", (req, res) => {
    res.status(200).send(pizzas);
});

server.get("/produtos", (req, res) => {
    res.status(200).json(produtos);
});

server.get("/ingredientes", (req, res) => {
    res.status(200).json(ingredientes);
});

server.listen(port, () => {
    console.log(
        `⚠️ ❗ Servidor aberto no endereço http://localhost:${port} ❗⚠️`
    );
});
