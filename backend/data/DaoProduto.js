import { getConnection } from "./DAOConexão";
const { ObjectId } = require("mongodb");
require("dotenv").config();

/******** PRODUTOS ********/

const clearProduto = (produto) => {
    if (produto.id) delete produto.id;
};

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
    // Inserir produto na coleção produtos
    await connection.collection("produtos").insertOne(produto);
};

const editProduto = async (id, produto) => {
    const connection = await getConnection(); // conectar ao banco de dados
    // remove id e manter _id
    clearProduto(produto);
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
    removeProduto
}