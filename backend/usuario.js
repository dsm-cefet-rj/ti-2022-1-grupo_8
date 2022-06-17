const {
    getAllIngredientes,
    getAllPizzas,
    getAllProdutos,
    addUsuario,
    getAllUsuarios,
} = require("./data/DAO");

const express = require("express");
const router = express.Router();
require("dotenv").config();

router.get("/ingredientes", (req, res) => {
    res.status(200)
        .set("Access-Control-Allow-Origin", "*")
        .json(getAllIngredientes())
        .end();
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

    res.status(200).set("Access-Control-Allow-Origin", "*").json(pizzas).end();
});

router.get("/produtos", (req, res) => {
    res.status(200)
        .set("Access-Control-Allow-Origin", "*")
        .json(getAllProdutos());
});

router.post("/criar", (req, res) => {
    const { nome, email, senha } = req.body;
    
    if (!nome || !email || !senha) {
        res.status(400).json({
            erro: "Dados insuficientes",
        });
        return;
    }
    
    const usuario = { nome, email, senha};
    
    // usuário ja existe?
    const usuarios = getAllUsuarios();
    
    const usuarioExistente = usuarios.find((usuario) => usuario.email == email);
    
    if (usuarioExistente) {
        res.status(400).json({
            erro: "E-mail já cadastrado",
        });
        return;
    }

    // adicionar usuário
    addUsuario(usuario);
    res.status(201).json({
        mensagem: "Usuário cadastrado com sucesso",
    });
});

module.exports = router;
