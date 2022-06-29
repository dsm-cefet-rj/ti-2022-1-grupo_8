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

router.get("/ingredientes", async (req, res) => {
    const ingredientes = await getAllIngredientes();
    res.status(200).json(ingredientes).end();
});

router.get("/pizzas", async (req, res) => {
    let pizzas = await getAllPizzas();
    let ingredientes = await getAllIngredientes();
    pizzas.map((pizza) => {
        pizza.preco = 20;
        pizza.ingredientes.forEach((id) => {
            let ingrediente = ingredientes.find((i) => {
                console.log(i._id, id);
                return i.id === id;
            });

            if (ingrediente)
                pizza.preco += ingrediente.preco;
            else
                pizza.preco += 0;
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

router.get("/produtos", async (req, res) => {
    const produtos = await getAllProdutos();
    res.status(200).json(produtos).end();
});

router.put("/fazer-pedido", async (req, res) => {
    // Permite um cliente fazer um pedido
    const cliente = req.user; // email,type,iat,exp
    const pedido = {
        email: cliente.email,
        dataHora: Date.now(),
        endereco: req.body.endereco,
        carrinho: req.body.carrinho,
        status: "Feito",
    };
    await addPedido(pedido);
    res.status(200).json(pedido).end();
});

router.get("/pedido", async (req, res) => {
    // Permite um cliente ver todos os pedidos que fez
    //O usuário está logado e o email é armazenado no objeto req.user.
    const cliente = req.user; // email,type,iat,exp
    const email = cliente.email; //O email é extraído do objeto req.user.
    const pedidos = await getPedidos(email); //A matriz pedidos do email é recuperada do banco de dados.
    res.status(200) //A matriz de pedidos é enviada ao cliente.
        .json(pedidos)
        .end();
});

module.exports = router;
