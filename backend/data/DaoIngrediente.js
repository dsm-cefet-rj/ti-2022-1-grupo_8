/*
Esse arquivo disponibiliza as funções que acessam o banco de dados para a entidade Ingrediente.
Os campos da entidade Ingrediente são:
    _id: ObjectId
    nome: string
    preco: number
    imagem: string
    usados: number
    descrição: string
    pesoPorcao: number
*/
const { getConnection } = require("./DaoConexão");
const { ObjectId } = require("mongodb");
require("dotenv").config();
const { IngredienteValidTypes } = require("../negocio");

// Função para validar o ingrediente
const validaçãoPedido = (ingrediente) => {
    // ProdutoValidTypes keys
    const keys = Object.keys(IngredienteValidTypes);
    keys.forEach((key) => {
        if (!ingrediente[key]) {
            throw new Error(`${key} é um campo obrigatório`);
        }
        if (typeof ingrediente[key] !== ProdutoValidTypes[key]) {
            throw new Error(
                `${key} deve ser do tipo ${ProdutoValidTypes[key]}`
            );
        }
    });
    if (ingrediente.id) delete ingrediente.id;
};

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
    // Valida o ingrediente
    validaçãoPedido(ingrediente);
    // Inserir ingrediente na coleção ingredientes
    await connection.collection("ingredientes").insertOne(ingrediente);
};

const editIngrediente = async (ingrediente) => {
    const connection = await getConnection(); // conectar ao banco de dados
    // Valida o ingrediente
    validaçãoPedido(ingrediente);
    // edita o ingrediente com o id passado da coleção ingredientes
    await connection
        .collection("ingredientes")
        .updateOne(
            { _id: new ObjectId(ingrediente.id) },
            { $set: ingrediente }
        );
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
};
