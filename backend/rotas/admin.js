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
        res.status(404).json({ error: err.message });
        return;
    }
    delete usuario.senha;
    usuario.pedidos = await getPedidos(email);
    res.status(200).json(usuario);
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
router.post("/editar-ingrediente", // Caminho da rota
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
router.patch("/editar-pizza", // Caminho da rota
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
router.patch("/editar-produto", // Caminho da rota
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

//Rota para excluir um usuário pelo email
router.delete("/usuario-excluir/:email", async (req, res) => {
    const email = req.params.email;
    let usuario;
    try {
        usuario = await getUsuario(email);
    } catch (err) {
        res.status(404).json({ error: err.message }).end();
        return;
    }
    await removeUsuario(email);
    res.status(200).json(usuario).end();
}); 

// Rota para excluir um ingrediente pelo id
router.delete("/excluir-ingrediente/:id", async (req, res) => {
    const id = req.params.id;
    let ingrediente;
    try {
        ingrediente = await getIngrediente(id);
    } catch (err) {
        res.status(404).json({ error: err.message }).end();
        return;
    }
    await removeIngrediente(id);
    res.status(200).json(ingrediente).end();
});

// Rota para excluir uma pizza pelo id
router.delete("/excluir-pizza/:id", async (req, res) => {
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

// Rota para excluir um produto pelo id
router.delete("/excluir-produto/:id", async (req, res) => {
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

    const relatorio = gerarRelatorios(dataInicio, dataFim);
    res.status(200).json(relatorio);
});

module.exports = router;
