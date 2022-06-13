var express = require("express");
var router = express.Router();

const ingredientes = require("./data/ingredientes.json");
const pizzas = require("./data/pizzas.json");
const produtos = require("./data/produtos.json");

router.get("/usuario/pizza", (req, res) => {
    const getPrices = (pizzas) => {
        return pizzas.map((pizza) => {
            let preco = 0;
            pizza.ingredientes.forEach((ingrediente) => {
                preco += ingredientes.find((i) => i.id == ingrediente).preco;
            });
            preco += 20;
            return {
                nome: pizza.nome,
                descricao: pizza.descricao,
                imagem: pizza.imagem,
                preco: preco,
                id: pizza.id,
                ingredientes: pizza.ingredientes,
                quant_comprada: pizza.quant_comprada,
            };
        });
    };
    res.status(200).json(getPrices(pizzas));
});

router.get("/usuario/produtos", (req, res) => {
    res.status(200).json(produtos);
});

router.get("/usuario/ingredientes", (req, res) => {
    res.status(200).json(ingredientes);
});

router.set("/usuario/pedido", (req, res) => {
    const carrinho = req.body;
    const usuario = usuarios.find((u) => u.id == carrinho.usuario_id);
    if (usuario) {
        usuario.carrinho = carrinho.carrinho;
        res.status(200).send("Pedido realizado com sucesso!");
    } else {
        res.status(400).send("Usuário não encontrado!");
    }
});
