const express = require("express");
const router = express.Router();
const {
    addIngrediente,
    editIngrediente,
    getAllIngredientes,
    removeIngrediente,
} = require("../data/DaoIngrediente");
const {
    addPizza,
    editPizza,
    removePizza,
    getAllPizzas,
} = require("../data/DaoPizza");
const {
    addProduto,
    editProduto,
    removeProduto,
    getAllProdutos,
} = require("../data/DaoProduto");
const {
    editUsuario,
    removeUsuario,
    getAllUsuarios,
    getUsuario,
} = require("../data/DaoUsuario");
const { getPedidos } = require("../data/DaoPedidos");
const { gerarRelatorios } = require("../data/DaoRelatorio");
require("dotenv").config();

// multer para upload de imagens
const multer = require("multer");
const { upload } = require("@testing-library/user-event/dist/upload");
const baseImgPath = "./public/imgs/";
const ingredienteImgDest = multer({ dest: baseImgPath + "ingredientes" });
const pizzaImgDest = multer({ dest: baseImgPath + "pizzas" });
const produtoImgDest = multer({ dest: baseImgPath + "produtos" });

// Rota para o admin ver as informações de um usuário pelo email
router.get("/usuario/:email", async (req, res) => {
    const email = req.params.email;
    let usuario;
    try {
        usuario = await getUsuario(email);
    } catch (err) {
        res.status(404).json({ error: err.message }).end();
        return;
    }
    delete usuario.senha;
    usuario.pedidos = await getPedidos(email);
    res.status(200).json(usuario).end();
});

// Rota para um admin ver todos os pedidos de um email
router.get("/pedidos/:email", async (req, res) => {
    const email = req.params.email;
    const pedidos = await getPedidos(email);
    res.status(200).json(pedidos).end();
});

// Rota para uma admin promover um usuário a admin pelo email
router.post("/promover-admin/:email", async (req, res) => {
    const email = req.params.email;
    let usuario;
    try {
        usuario = await getUsuario(email);
    } catch (err) {
        res.status(404).json({ error: err.message }).end();
        return;
    }
    usuario.type = "admin";
    await editUsuario(usuario);
    res.status(200).json(usuario).end();
});

// Rota para uma admin promover um usuário a usuário pelo email
router.post("/promover-user/:email", async (req, res) => {
    const email = req.params.email;
    let usuario;
    try {
        usuario = await getUsuario(email);
    } catch (err) {
        res.status(404).json({ error: err.message }).end();
        return;
    }
    usuario.type = "user";
    await editUsuario(usuario);
    res.status(200).json(usuario).end();
});

// Rota para uma admin promover um usuário a funcionário pelo email
router.post("/promover-funcionario/:email", async (req, res) => {
    const email = req.params.email;
    let usuario;
    try {
        usuario = await getUsuario(email);
    } catch (err) {
        res.status(404).json({ error: err.message }).end();
        return;
    }
    usuario.type = "funcionário";
    await editUsuario(usuario);
    res.status(200).json(usuario).end();
});

// Rota para adicionar ou editar um ingrediente
router.post(
    "/editar-ingrediente", // Caminho da rota
    ingredienteImgDest.single("imagem"), // Middleware para upload de imagens
    async (req, res) => {
        const { _id, imagem, nome, preco, descricao, pesoPorcao } = req.body;
        const ingrediente = {
            _id,
            imagem,
            nome,
            preco: parseFloat(preco),
            usados: 0,
            descricao,
            pesoPorcao: parseFloat(pesoPorcao),
        };
        console.table(ingrediente);
        try {
            await editIngrediente(ingrediente);
        } catch (err) {
            res.status(404).json({ error: err.message }).end();
            return;
        }
        res.sendStatus(200);
    }
);

// Rota para adicionar ou editar uma pizza
router.post(
    "/editar-pizza", // Caminho da rota
    pizzaImgDest.single("imagem"), // Middleware para upload de imagens
    async (req, res) => {
        const {
            id,
            nome,
            descricao,
            imagem,
            ingredientes,
            quant_comprada,
            preco,
        } = req.body;
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
            addPizza(
                nome,
                descricao,
                imagem,
                ingredientes,
                quant_comprada,
                preco
            );
        }
        res.sendStatus(200);
    }
);

// Rota para adicionar ou editar um produto
router.post(
    "/editar-produto", // Caminho da rota
    produtoImgDest.single("imagem"), // Middleware para upload de imagens
    async (req, res) => {
        let { nome, descricao, imagem, preco, id, quant_comprada } = req.body;
        if (id) {
            const produto = getAllProdutos().find(
                (produto) => produto.id === id
            );
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
    }
);

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
router.post("/excluir-pizza/:id", async (req, res) => {
    const { id } = req.params;
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
router.post("/excluir-produto/:id", async (req, res) => {
    const { id } = req.params;
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

router.get("/relatorios", (req, res) => {
    let { dataInicio, dataFim } = req.body;

    if (!dataFim) {
        // Se a data de fim não foi informada, considerar a data de hoje
        dataFim = new Date();
    }
    if (!dataInicio) {
        // Se a data de início não for informada, considerar 30 dias antes da data de fim
        dataInicio = dataFim - 1000 * 60 * 60 * 24 * 30;
    }

    gerarRelatorios(dataInicio, dataFim).then((relatorio) =>
        res.status(200).json(relatorio)
    );
});

module.exports = router;
