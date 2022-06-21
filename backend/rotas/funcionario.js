const express = require("express");
const { getAllPedidos, editPedido } = require("../data/DAO");
const validarIdPedido = require("../middleware/validacao");
const router = express.Router();
require("dotenv").config();

router.get("/pedidos/feitos", (req, res) => {
    // Permite ao funcionário ver todos os pedidos feitos
    let pedidos = getAllPedidos();
    pedidos.filter((pedido) => {
        return pedido.status == "Feito";
    });
    res.status(200).json(pedidos).end();
});

router.get("/pedidos/em-andamento", (req, res) => {
    // Permite ao funcionário ver todos os pedidos que estão em andamento
    let pedidos = getAllPedidos();
    pedidos = pedidos.filter((pedido) => {
        return pedido.status == "Em andamento";
    });
    res.status(200).json(pedidos).end();
});

router.get("/pedidos/concluidos", (req, res) => {
    // Permite ao funcionário ver todos os pedidos que foram concluídos
    let pedidos = getAllPedidos();
    pedidos = pedidos.filter((pedido) => {
        return pedido.status == "Concluído";
    });
    res.status(200).json(pedidos).end();
});

router.get("/pedidos", (req, res) => {
    // Permite ao funcionário ver todos os pedidos
    let pedidos = getAllPedidos();
    res.status(200).json(pedidos).end();
});

router.use("/iniciar-pedido/:id", validarIdPedido);
router.post("/iniciar-pedido/:id", (req, res) => {
    // Permite ao funcionário marcar um pedido como em andamento
    let id = parseInt(req.params.id);
    let dados = {
        status: "Em andamento",
    };
    let pedidoAtualizado = editPedido(id, dados);
    res.status(200).json(pedidoAtualizado).end();
});

router.use("/finalizar-pedido/:id", validarIdPedido);
router.post("/finalizar-pedido/:id", (req, res) => {
    // Permite ao funcionário marcar um pedido como concluído
    let id = parseInt(req.params.id);
    let dados = {
        status: "Concluído",
    };
    let pedidoAtualizado = editPedido(id, dados);
    res.status(200).json(pedidoAtualizado).end();
});

module.exports = router;
