const express = require("express");
const fs = require("fs");

const router = express.Router();
const {
    removeIngrediente,
    getIngrediente,
    editIngrediente,
    addIngrediente,
} = require("../data/DaoIngrediente");
const {
    removePizza,
    getAllPizzas,
    getPizza,
    editPizza,
    addPizza,
} = require("../data/DaoPizza");
const {
    removeProduto,
    getAllProdutos,
    getProduto,
    editProduto,
    addProduto,
} = require("../data/DaoProduto");
const {
    editUsuario,
    removeUsuario,
    getUsuario,
} = require("../data/DaoUsuario");
const { getPedidos } = require("../data/DaoPedidos");
const { gerarRelatorios } = require("../data/DaoRelatorio");
require("dotenv").config();

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

const checkFiles = (files) => {
    if (!files) {
        return false;
    }
    if (!files.image) {
        return false;
    }
    if (!files.image.mimetype.startsWith("image")) {
        return false;
    }
    if (files.image.size > 1024 * 1024 * 2) {
        return false;
    }
    return true;
};

const moveFile = (tipo, file, nome) => {
    const tipos = {
        pizza: "./public/imgs/pizzas/",
        produto: "./public/imgs/produtos/",
        ingrediente: "./public/imgs/ingredientes/",
    };
    const path = tipos[tipo];
    const newPath = path + nome + file.name.split(".").at(-1);
    fs.renameSync(file.path, newPath);
};

// Rota para adicionar ou editar um ingrediente
router.post("/editar-ingrediente", async (req, res) => {
    const files = req.files;
    const { nome, preco, descricao, pesoPorcao, _id } = req.fields;

    if (!(nome && preco && descricao && pesoPorcao)) {
        res.status(400).json({ error: "Dados incompletos" });
        return;
    }
    let ingrediente = getIngrediente(_id);
    if (ingrediente) {
        ingrediente.nome = nome;
        ingrediente.preco = preco;
        ingrediente.descricao = descricao;
        ingrediente.pesoPorcao = pesoPorcao;
        if (checkFiles(files)) {
            moveFile("ingrediente", files.image, _id);
            ingrediente.image = _id + files.image.name.split(".").at(-1);
        }

        await editIngrediente(ingrediente);

        res.status(200).json(ingrediente).end();
        return;
    } else {
        ingrediente = {
            nome: nome,
            preco: preco,
            descricao: descricao,
            pesoPorcao: pesoPorcao,
        };
        if (!checkFiles(files)) {
            res.status(400).json({ error: "Arquivo inválido" });
            return;
        }

        addIngrediente(ingrediente);

        res.status(200).json(ingrediente).end();
    }
});

// Rota para adicionar ou editar uma pizza
router.patch("/editar-pizza", async (req, res) => {
    const files = req.files;
    const { _id, nome, descricao, ingredientes, preco } = req.fields;
    if (!(nome && descricao && ingredientes && preco)) {
        res.status(400).json({ error: "Dados incompletos" });
        return;
    }
    let pizza = getPizza(_id);
    if (pizza) {
        pizza.nome = nome;
        pizza.descricao = descricao;
        pizza.ingredientes = ingredientes;
        pizza.preco = preco;
        if (checkFiles(files)) {
            moveFile("pizza", files.image, _id);
            pizza.image = _id + files.image.name.split(".").at(-1);
        }

        await editPizza(pizza);

        res.status(200).json(pizza).end();
        return;
    } else {
        pizza = {
            nome: nome,
            descricao: descricao,
            ingredientes: ingredientes,
            preco: preco,
        };
        if (!checkFiles(files)) {
            res.status(400).json({ error: "Arquivo inválido" });
            return;
        }

        addPizza(pizza);

        res.status(200).json(pizza).end();
    }
});

// Rota para adicionar ou editar um produto
router.patch("/editar-produto", async (req, res) => {
    const files = req.files;
    const { _id, nome, imagem, preco, descricao } = req.fields;
    if (!(nome && imagem && preco && descricao)) {
        res.status(400).json({ error: "Dados incompletos" });
        return;
    }
    let produto = getProduto(_id);
    if (produto) {
        produto.nome = nome;
        produto.preco = preco;
        produto.descricao = descricao;
        if (checkFiles(files)) {
            moveFile("produto", files.image, _id);
            produto.image = _id + files.image.name.split(".").at(-1);
        }

        await editProduto(produto);

        res.status(200).json(produto).end();
        return;
    } else {
        produto = {
            nome: nome,
            preco: preco,
            descricao: descricao,
        };
        if (!checkFiles(files)) {
            res.status(400).json({ error: "Arquivo inválido" });
            return;
        }

        addProduto(produto);

        res.status(200).json(produto).end();
    }
});

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

    gerarRelatorios(dataInicio, dataFim).then((relatorio) =>
        res.status(200).json(relatorio)
    );
});

module.exports = router;
