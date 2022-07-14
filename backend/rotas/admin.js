const express = require("express");
const fs = require("fs");
const uuid = require("uuid");
const formidable = require("express-formidable");
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

// multipart/form-data middleware
const formData = formidable({
    encoding: "utf-8",
    uploadDir: "./uploads",
    keepExtensions: true,
    maxFieldsSize: 2 * 1024 * 1024,
    maxFields: 1000,
    multiples: true,
});

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
    if (!files.imagem) {
        console.log("Não foi enviado nenhuma imagem");
        return false;
    }
    if (files.imagem.bytesWritten <= 12 * 1024 * 1024) {
        console.log("O arquivo é muito grande");
        return false;
    }
    return true;
};
// Move e renomeia um arquivo com base no tipo e retorna o caminho do arquivo
const moveFile = (tipo, imagem, nome) => {
    const tipos = {
        pizza: "./public/imgs/pizzas/",
        produto: "./public/imgs/produtos/",
        ingrediente: "./public/imgs/ingredientes/",
    };
    const path = tipos[tipo];
    let newPath = `${path}${nome}.${imagem.path.split(".").at(-1)}`;
    try {
        fs.renameSync(imagem.path, newPath);
        console.log("Arquivo movido com sucesso");
    } catch (err) {
        console.log(err);
    }
    // remove ./public form tme newPath
    return newPath.replace("./public", "");
};

// Rota para adicionar ou editar um ingrediente
router.post("/editar-ingrediente", formData, async (req, res) => {
    const files = req.files;
    const { nome, preco, descricao, pesoPorcao, _id } = req.fields;

    if (!(nome && preco && descricao && pesoPorcao)) {
        res.status(400).json({
            error: `Dados incompletos, fields: ${Object.keys(req.fields)}`,
        });
        return;
    }
    let ingrediente = await getIngrediente(_id);
    if (ingrediente) {
        ingrediente.nome = nome;
        ingrediente.preco = parseFloat(preco);
        ingrediente.descricao = descricao;
        ingrediente.pesoPorcao = parseFloat(pesoPorcao);
        if (checkFiles(files)) {
            ingrediente.imagem = moveFile("ingrediente", files.imagem, _id);
        }
        await editIngrediente(ingrediente);

        res.status(200).json(ingrediente).end();
        return;
    } else {
        ingrediente = {
            nome: nome,
            preco: parseFloat(preco),
            descricao: descricao,
            pesoPorcao: parseFloat(pesoPorcao),
        };
        if (checkFiles(files)) {
            ingrediente.imagem = moveFile(
                "ingrediente",
                files.imagem,
                uuid.v4()
            );
        } else {
            res.status(400).json({
                error: "Não foi enviado nenhuma imagem",
            });
            return;
        }
        await addIngrediente(ingrediente);

        res.status(200).json(ingrediente).end();
    }
});

// Rota para adicionar ou editar uma pizza
router.post("/editar-pizza", formData, async (req, res) => {
    const files = req.files;
    const { _id, nome, descricao, ingredientes } = req.fields;
    if (!(nome && descricao && ingredientes)) {
        res.status(400).json({
            error: `Dados incompletos, fields: ${Object.keys(req.fields)}`,
        });
        return;
    }
    let pizza = getPizza(_id);
    if (pizza) {
        pizza.nome = nome;
        pizza.descricao = descricao;
        pizza.ingredientes = ingredientes.split(",");
        if (checkFiles(files)) {
            moveFile("pizza", files.imagem, _id);
            pizza.imagem = _id + files.imagem.name.split(".").at(-1);
        }

        await editPizza(_id, pizza);

        res.status(200).json(pizza).end();
        return;
    } else {
        pizza = {
            nome: nome,
            descricao: descricao,
            ingredientes: ingredientes.split(","),
        };
        if (!checkFiles(files)) {
            res.status(400).json({ error: "Arquivo inválido" });
            return;
        } else {
            pizza.imagem = moveFile("pizza", files.imagem, uuid.v4());
        }

        await addPizza(pizza);

        res.status(200).json(pizza).end();
    }
});

// Rota para adicionar ou editar um produto
router.post("/editar-produto", formData, async (req, res) => {
    const files = req.files;
    const { _id, nome, preco, descricao } = req.fields;
    if (!(nome && preco && descricao)) {
        res.status(400).json({
            error: `Dados incompletos, fields: ${Object.keys(req.fields)}`,
        });
        return;
    }
    let produto = await getProduto(_id);
    if (produto) {
        produto.nome = nome;
        produto.preco = parseFloat(preco);
        produto.descricao = descricao;
        delete produto._id;
        if (checkFiles(files)) {
            produto.imagem = moveFile("produto", files.imagem, _id);
        }
        await editProduto(_id, produto);
        res.status(200).json(produto).end();
        return;
    } else {
        produto = {
            nome: nome,
            preco: parseFloat(preco),
            descricao: descricao,
        };
        if (!checkFiles(files)) {
            res.status(400).json({ error: "Arquivo inválido" });
            return;
        } else {
            produto.imagem = moveFile("produto", files.imagem, uuid.v4());
        }

        await addProduto(produto);

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
        const produto = getProduto(id);
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
