const express = require("express");
const router = express.Router();
require("dotenv").config();
const {
    addIngrediente,
    editIngrediente,
    getAllIngredientes,
    removeIngrediente,
    addPizza,
    editPizza,
    removePizza,
    getAllPizzas,
    addProduto,
    editProduto,
    removeProduto,
    getAllProdutos,
    editUsuario,
    removeUsuario,
    getAllUsuarios,
    getUsuario,
} = require("../data/DAO");

router.get("/usuario", (req, res) => {
    const email = req.query.email;
    if (email) {
        const usuario = getUsuario(email);
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json({
                message: "Usuário não encontrado",
            });
        }
    } else {
        res.status(400).send("Email não encontrado");
    }
});

// Rota para adicionar ou editar um ingrediente
router.post("/editar-ingrediente", (req, res) => {
    const { id, imagem, nome, preco, usados, descricao, pesoPorcao } = req.body;
    if (id) {
        //verificar se ingrediente realmente existe
        const ingrediente = getAllIngredientes().find(
            (ingrediente) => ingrediente.id === id
        );
        if (ingrediente) {
            // se ingrediente existe, editar
            //editar ingrediente
            const novoIngrediente = editIngrediente(
                id,
                imagem,
                nome,
                preco,
                usados,
                descricao,
                pesoPorcao
            );
            res.json(novoIngrediente);
        } else {
            res.status(404).json({
                message: `Ingrediente não existe, id: ${id} 😔`,
            });
        }
    } else {
        addIngrediente(imagem, nome, preco, usados, descricao, pesoPorcao);
    }
    res.sendStatus(200);
});

// Rota para adicionar ou editar uma pizza
router.post("/editar-pizza", (req, res) => {
    const { id, nome, descricao, imagem, ingredientes, quant_comprada, preco } =
        req.body;
    if (id) {
        //verificar se pizza realmente existe
        const pizza = getAllPizzas().find((pizza) => pizza.id === id);
        if (pizza) {
            // se pizza existe, editar
            //editar pizza
            const novaPizza = editPizza(
                id,
                nome,
                descricao,
                imagem,
                ingredientes,
                quant_comprada,
                preco
            );
            res.json(novaPizza);
        } else {
            res.status(404).json({
                message: `Pizza não existe, id: ${id} 😔`,
            });
        }
    } else {
        addPizza(nome, descricao, imagem, ingredientes, quant_comprada, preco);
    }
    res.sendStatus(200);
});

// Rota para adicionar ou editar um produto
router.post("/editar-produto", (req, res) => {
    const { nome, descricao, imagem, preco, id, quant_comprada } = req.body;
    if (id) {
        const produto = getAllProdutos().find((produto) => produto.id === id);
        if (produto) {
            const novoProduto = editProduto(
                id,
                nome,
                descricao,
                imagem,
                preco,
                quant_comprada
            );
            res.json(novoProduto);
        } else {
            res.status(404).json({
                message: `Produto não existe, id: ${id} 😔`,
            });
        }
    } else {
        addProduto(nome, descricao, imagem, preco, quant_comprada);
    }
    res.sendStatus(200);
});

// Rota para editar um usuário
router.post("/editar-usuario", (req, res) => {
    const { nome, email, senha, type, pedidos } = req.body;
    if (email) {
        //verificar se usuário realmente existe
        const usuario = getAllUsuarios().find(
            (usuario) => usuario.email === email
        );
        if (usuario) {
            // se usuário existe, editar
            //editar usuário
            const novoUsuario = editUsuario(nome, email, senha, type, pedidos);
            res.sendStatus(200).json(novoUsuario);
        } else {
            res.status(404).json({
                message: `Usuário não existe, email: ${email} 😔`,
            });
        }
    } else {
        addUsuario(nome, email, senha, type, pedidos);
        res.sendStatus(200).json({
            message: `Usuário adicionado com sucesso! 😃`,
        });
    }
});

// Rota para excluir um funcionário
router.post("/excluir-ingrediente", (req, res) => {
    const { id } = req.body;
    if (id) {
        //verificar se ingrediente realmente existe
        const ingrediente = getAllIngredientes().find(
            (ingrediente) => ingrediente.id === id
        );
        if (ingrediente) {
            // se ingrediente existe, excluir
            //excluir ingrediente
            removeIngrediente(id);
        } else {
            res.status(404).json({
                message: `Ingrediente não existe, id: ${id} 😔`,
            });
        }
    } else {
        res.status(400).json({
            message: "Id não informado 😔",
        });
    }
});

// Rota para excluir um funcionário
router.post("/excluir-pizza", (req, res) => {
    const { id } = req.body;
    if (id) {
        //verificar se pizza realmente existe
        const pizza = getAllPizzas().find((pizza) => pizza.id === id);
        if (pizza) {
            // se pizza existe, excluir
            //excluir pizza
            removePizza(id);
            res.sendStatus(200);
        } else {
            res.status(404).json({
                message: `Pizza não existe, id: ${id} 😔`,
            });
        }
    } else {
        res.status(400).json({
            message: "Id não informado 😔",
        });
    }
});

// Rota para excluir um funcionário
router.post("/excluir-produto", (req, res) => {
    const { id } = req.body;
    if (id) {
        //verificar se produto realmente existe
        const produto = getAllProdutos().find((produto) => produto.id === id);
        if (produto) {
            // se produto existe, excluir
            //excluir produto
            removeProduto(id);
            res.sendStatus(200);
        } else {
            res.status(404).json({
                message: `Produto não existe, id: ${id} 😔`,
            });
        }
    } else {
        res.status(400).json({
            message: "Id não informado 😔",
        });
    }
});

// Rota para excluir um funcionário
router.post("/excluir-usuario", (req, res) => {
    const { email } = req.body;
    if (email) {
        //verificar se usuário realmente existe
        const usuario = getAllUsuarios().find(
            (usuario) => usuario.email === email
        );
        if (usuario) {
            // se usuário existe, excluir
            //excluir usuário
            removeUsuario(email);
            res.sendStatus(200).json({
                message: `Usuário excluído com sucesso! 😃`,
            });
        } else {
            res.status(404).json({
                message: `Usuário não existe, email: ${email} 😔`,
            });
        }
    } else {
        res.status(400).json({
            message: "Email não informado 😔",
        });
    }
});

module.exports = router;
