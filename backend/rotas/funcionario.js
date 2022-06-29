const express = require("express");
const { getAllPedidos, editPedido } = require("../data/DAO");
const validarIdPedido = require("../middleware/validacao");
const router = express.Router();
require("dotenv").config();

router.get("/pedidos/feitos", async (req, res) => {
    // Permite ao funcionário ver todos os pedidos feitos
    let pedidos = await getAllPedidos();
    // filtra todos os pedidos com pedido.status = "Feito"
    pedidos = pedidos.filter((pedido) => pedido.status === "Feito");
    res.status(200).json(pedidos).end();
});

router.get("/pedidos/em-andamento", async (req, res) => {
    // Permite ao funcionário ver todos os pedidos que estão em andamento
    let pedidos = await getAllPedidos();
    // filtra todos os pedidos com pedido.status = "Em andamento"
    pedidos = pedidos.filter((pedido) => {
        return pedido.status == "Em andamento";
    });
    res.status(200).json(pedidos).end();
});

router.get("/pedidos/concluidos", async (req, res) => {
    // Permite ao funcionário ver todos os pedidos que foram concluídos
    let pedidos = await getAllPedidos();
    // filtra todos os pedidos com pedido.status = "Concluído"
    pedidos = pedidos.filter((pedido) => {
        return pedido.status == "Concluído";
    });
    res.status(200).json(pedidos).end();
});

router.get("/pedidos", async (req, res) => {
    // Permite ao funcionário ver todos os pedidos
    let pedidos =  await getAllPedidos();
    // retorna todos os pedidos
    res.status(200).json(pedidos).end();
});

router.use("/iniciar-pedido/:id", validarIdPedido);
router.post("/iniciar-pedido/:id", async (req, res) => {
    // Permite ao funcionário marcar um pedido como em andamento
    let id = parseInt(req.params.id);
    let dados = {
        status: "Em andamento",
    };
    // atualiza o status do pedido com o id passado como parâmetro
    let pedidoAtualizado =  editPedido(id, dados);
    res.status(200).json(pedidoAtualizado).end();
});

router.use("/finalizar-pedido/:id", validarIdPedido);
router.post("/finalizar-pedido/:id", async (req, res) => {
    // Permite ao funcionário marcar um pedido como concluído
    let id = parseInt(req.params.id);
    let dados = {
        status: "Concluído",
    };
    // atualiza o status do pedido com o id passado como parâmetro
    let pedidoAtualizado = editPedido(id, dados);
    res.status(200).json(pedidoAtualizado).end();
});

module.exports = router;
