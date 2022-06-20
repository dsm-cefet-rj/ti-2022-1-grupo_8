const {
    getAllIngredientes,
    getAllPizzas,
    getAllProdutos,
    getPedidos,
    addPedido,
} = require("../data/DAO");

const express = require("express");
const router = express.Router();
require("dotenv").config();

router.get("/ingredientes", (req, res) => {
    res.status(200).json(getAllIngredientes()).end();
});

router.get("/pizzas", (req, res) => {
    let pizzas = getAllPizzas();
    let ingredientes = getAllIngredientes();
    pizzas.map((pizza) => {
        pizza.preco = 20;
        pizza.ingredientes.forEach((id) => {
            let ingrediente = ingredientes.find(
                (ingrediente) => ingrediente.id == id
            );
            /* console.log(ingrediente.preco); */ // Por algum motivo o preço esta como undefined
            pizza.preco += Math.random() * 10;
            // 2 decimais
            pizza.preco = Math.round(pizza.preco * 100) / 100;
        });
    });
    // sort by preco
    pizzas.sort((a, b) => {
        return a.preco - b.preco;
    });

    res.status(200).json(pizzas).end();
});

router.get("/produtos", (req, res) => {
    res.status(200).json(getAllProdutos()).end();
});

router.put("/fazer-pedido", (req, res) => { // Permite um cliente fazer um pedido
    const cliente = req.user; // email,type,iat,exp
    const pedido = {
        email: cliente.email,
        dataHora: Date.now(),
        endereco: req.body.endereco,
        carrinho: req.body.carrinho,
        estatus: "Feito",
    };
    addPedido(pedido);
    res.status(200).json(pedido).end();
});

router.get("/pedido" , (req, res) => { // Permite um cliente ver todos os pedidos que fez
    //O usuário está logado e o email é armazenado no objeto req.user.
    const cliente = req.user; // email,type,iat,exp
    const email = cliente.email; //O email é extraído do objeto req.user.
    const pedidos = getPedidos(email); //A matriz pedidos do email é recuperada do banco de dados.
    res.status(200).json(pedidos).end(); //A matriz de pedidos é enviada ao cliente.
});

module.exports = router;
