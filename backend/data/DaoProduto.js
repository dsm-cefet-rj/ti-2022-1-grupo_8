/*
Esse arquivo disponibiliza as funções que acessam o banco de dados para a entidade Produto.
Os campos da entidade Produto são:
    _id: ObjectId
    nome: string
    descrição: string
    imagem: string
    preco: number
    quant_comprada: number
*/
const { getConnection } = require("./DaoConexão");
const { ObjectId } = require("mongodb");
require("dotenv").config();
const { IngredienteValidTypes } = require("../negocio");

// Função para validar o produto
const validaçãoPedido = (produto) => {
    // ProdutoValidTypes keys
    const keys = Object.keys(IngredienteValidTypes);
    keys.forEach((key) => {
        if (!produto[key]) {
            throw new Error(`${key} é um campo obrigatório`);
        }
        if (typeof produto[key] !== ProdutoValidTypes[key]) {
            throw new Error(
                `${key} deve ser do tipo ${ProdutoValidTypes[key]}`
            );
        }
    });
    if (produto.id) delete produto.id;
};

/******** PRODUTOS ********/

const getAllProdutos = async () => {
    const connection = await getConnection();
    let produtos = await connection.collection("produtos").find({}).toArray();
    // transformar _id para string
    produtos.map((produto) => {
        produto._id = produto._id.toString(); // conectar ao banco de dados
        produto.id = produto._id;
        return produto;
    });
    return produtos;
};

const getProduto = async (_id) => {
    const connection = await getConnection(); // conectar ao banco de dados
    // Busca o produto com o _id passado
    let produto = connection
        .collection("produtos")
        .findOne({ _id: new ObjectId(_id) });
    produto._id = produto._id.toString();
    return produto;
};

const addProduto = async (produto) => {
    const connection = await getConnection(); // conectar ao banco de dados
    validaçãoPedido(produto);
    // Inserir produto na coleção produtos
    await connection.collection("produtos").insertOne(produto);
};

const editProduto = async (id, produto) => {
    const connection = await getConnection(); // conectar ao banco de dados
    // remove id e manter _id
    validaçãoPedido(produto);
    // Na coleção produtos, atualizar o produto com o id passado
    await connection
        .collection("produtos")
        .updateOne({ _id: new ObjectId(id) }, { $set: produto });
};

const removeProduto = async (_id) => {
    const connection = await getConnection(); // conectar ao banco de dados
    // Da coleção produtos remove o produto com o id passado
    connection.collection("produtos").deleteOne({ _id: new ObjectId(_id) });
};

module.exports = {
    getAllProdutos,
    getProduto,
    addProduto,
    editProduto,
    removeProduto,
};
