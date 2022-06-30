import { getConnection } from "./DAOConexão";
const { ObjectId } = require("mongodb");
require("dotenv").config();

/******** Pedidos ********/

// Função faz um pequeno tratamento do objeto pedido
const cleanPedidos = (pedido) => {
    if (pedido.id) {
        // Se o pedido tiver id então remove o id mantendo o _id
        delete pedido.id;
    }
};

// Função retorna todos os pedidos do banco de dados
const getAllPedidos = async () => {
    const connection = await getConnection(); // conectar ao banco de dados
    let pedidos = await connection.collection("pedidos").find().toArray();
    // transformar _id para string
    pedidos.map((pedido) => {
        pedido._id = pedido._id.toString();
        pedido.id = pedido._id;
        return pedido;
    });
    return pedidos;
};

// Função retorna todos os pedidos de um email do banco de dados
const getPedidos = async (email) => {
    const connection = await getConnection(); // conectar ao banco de dados
    // Na coleção pedidos, retorna todos os pedidos onde o email for igual
    let pedidos = await connection
        .collection("pedidos")
        .find({ email: email })
        .toArray();
    // transformar _id para string
    pedidos.map((pedido) => {
        pedido._id = pedido._id.toString();
        pedido.id = pedido._id;
        return pedido;
    });
    return pedidos;
};

// Função adiciona um pedido no banco de dados
const addPedido = async (pedido) => {
    const connection = await getConnection(); // conectar ao banco de dados
    cleanPedidos(pedido);
    // Na coleção pedidos, inserir um novo pedido
    await connection.collection("pedidos").insertOne(pedido);
};

// Função edita um pedido no banco de dados
const editPedido = async (_id, pedido) => {
    const connection = await getConnection();
    cleanPedidos(pedido);
    // Atualiza o pedido na coleção de pedidos
    let result = await connection
        .collection("pedidos")
        .updateOne({ _id: new ObjectId(_id) }, { $set: pedido });
};

// Função para remover um pedido
const removePedido = async (_id) => {
    const connection = await getConnection(); // conectar ao banco de dados
    connection.collection("pedidos").deleteOne({ _id: new ObjectId(_id) });
};

module.exports = {
    getAllPedidos,
    getPedidos,
    addPedido,
    editPedido,
    removePedido,
}