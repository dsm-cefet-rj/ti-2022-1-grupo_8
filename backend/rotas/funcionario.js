const express = require("express");
const { getAllPedidos } = require("../data/DAO");
const router = express.Router();
require("dotenv").config();

router.get("/pedidos/feitos", (req, res) => {
    let pedidos = getAllPedidos();
    pedidos.filter((pedido) => {
        return pedido.status == "Feito";
    });
    res.status(200).json(pedidos).end();
});

router.get("/pedidos/em-andamento", (req, res) => {
    let pedidos = getAllPedidos();
    pedidos = pedidos.filter((pedido) => {
        return pedido.status == "Em andamento";
    });
    res.status(200).json(pedidos).end();
});

router.get("/pedidos/concluidos", (req, res) => {
    let pedidos = getAllPedidos();
    pedidos = pedidos.filter((pedido) => {
        return pedido.status == "Concluído";
    });
    res.status(200).json(pedidos).end();
});

router.get("/pedidos", (req, res) => {
    let pedidos = getAllPedidos();
    res.status(200).json(pedidos).end();
});

router.post("/iniciar-pedido", (req, res) => {
    // Permite ao funcionário marcar um pedido como em andamento
    let id = req.query.id;
    pedido = {
        status: "Em andamento",
    };
    editarPedido(pedido);
    res.status(200).json({ pedido }).end();
});

router.post("/finalizar-pedido", (req, res) => {
    // Permite ao funcionário marcar um pedido como concluído
    pedido = {
        status: "Concluído",
    };
    editarPedido(pedido);
    res.status(200).json({ pedido }).end();
});

module.exports = router;
