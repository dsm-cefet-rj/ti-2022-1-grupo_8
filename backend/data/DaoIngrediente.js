import { getConnection } from "./DAOConexão";
const { ObjectId } = require("mongodb");
require("dotenv").config();

/******** INGREDIENTES ********/
// Função para buscar todos os ingredientes do banco de dados
const getAllIngredientes = async () => {
    const connection = await getConnection(); // conectar ao banco de dados
    // Pegar da coleção ingredientes todos os ingredientes
    let ingredientes = await connection
        .collection("ingredientes")
        .find()
        .toArray();
    // transformar _id para string e adicionar campo id
    ingredientes.map((ingrediente) => {
        ingrediente._id = ingrediente._id.toString();
        ingrediente.id = ingrediente._id;
        return ingrediente;
    });
    return ingredientes;
};

const getIngrediente = async (id) => {
    const connection = await getConnection(); // conectar ao banco de dados
    let ingrediente = await connection.collection("ingredientes").findOne({
        _id: new ObjectId(id),
    });
    ingrediente._id = ingrediente._id.toString();
    ingrediente.id = ingrediente._id;
    return ingrediente;
};

const addIngrediente = async (ingrediente) => {
    const connection = await getConnection(); // conectar ao banco de dados
    // Inserir ingrediente na coleção ingredientes
    await connection.collection("ingredientes").insertOne(ingrediente);
};

const editIngrediente = async (id, ingrediente) => {
    const connection = await getConnection(); // conectar ao banco de dados
    // edita o ingrediente com o id passado da coleção ingredientes
    await connection
        .collection("ingredientes")
        .updateOne({ _id: new ObjectId(id) }, { $set: ingrediente });
};

const removeIngrediente = async (id) => {
    const connection = await getConnection(); // conectar ao banco de dados
    // Remove o ingrediente com o _id passado da coleção ingredientes
    connection.collection("ingredientes").deleteOne({ _id: new ObjectId(id) });
};

module.exports = {
    getAllIngredientes,
    getIngrediente,
    addIngrediente,
    editIngrediente,
    removeIngrediente,
}