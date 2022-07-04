/*
Esse arquivo disponibiliza as funções que acessam o banco de dados para a entidade Pedido.
Os campos da entidade Pedido são:
    _id: ObjectId
    email: string
    data: number
    endereco: string
    carrinho: array
    status: string
*/
const { getConnection } = require("./DaoConexão");
const { ObjectId } = require("mongodb");
require("dotenv").config();
const { PedidoValidTypes } = require("../negocio");

// Função para validar o pedido
const validaçãoPedido = (pedido) => {
    // ProdutoValidTypes keys
    const keys = Object.keys(PedidoValidTypes);
    keys.forEach((key) => {
        if (!pedido[key]) {
            throw new Error(`${key} é um campo obrigatório`);
        }
        if (typeof pedido[key] !== PedidoValidTypes[key]) {
            throw new Error(`${key} deve ser do tipo ${PedidoValidTypes[key]}`);
        }
        const email_re =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (key === "email" && !email_re.test(pedido[key])) {
            throw new Error(`${key} deve ser um email válido`);
        }
    });
};

/******** Pedidos ********/

// Função retorna todos os pedidos do banco de dados
const getAllPedidos = async () => {
    const connection = await getConnection(); // conectar ao banco de dados
    let pedidos = await connection
        .collection("pedidos")
        .find()
        .sort({ dataHora: 1 })
        .toArray();
    // transformar _id para string
    pedidos.map((pedido) => {
        pedido._id = pedido._id.toString();
        pedido.id = pedido._id;
        return pedido;
    });
    return pedidos;
};

// Função retorna todos os pedidos do banco de dados com status = "Feito"
const getAllPedidosFeito = async () => {
    const connection = await getConnection(); // conectar ao banco de dados
    let pedidos = await connection
        .collection("pedidos")
        .find({
            status: "Feito",
        })
        .sort({ dataHora: 1 })
        .toArray();
    // transformar _id para string
    pedidos.map((pedido) => {
        pedido._id = pedido._id.toString();
        pedido.id = pedido._id;
        return pedido;
    });
    return pedidos;
};

// Função retorna todos os pedidos do banco de dados com status = "Em andamento"
const getAllPedidosEmAndamento = async () => {
    const connection = await getConnection(); // conectar ao banco de dados
    let pedidos = await connection
        .collection("pedidos")
        .find({
            status: "Em andamento",
        })
        .sort({ dataHora: 1 })
        .toArray();
    // transformar _id para string
    pedidos.map((pedido) => {
        pedido._id = pedido._id.toString();
        pedido.id = pedido._id;
        return pedido;
    });
    return pedidos;
};

// Função retorna todos os pedidos do banco de dados com status = "Concluído"
const getAllPedidosConcluido = async () => {
    const connection = await getConnection(); // conectar ao banco de dados
    let pedidos = await connection
        .collection("pedidos")
        .find({
            status: "Concluído",
        })
        .sort({ dataHora: 1 })
        .toArray();
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
        .sort({ dataHora: -1 })
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
    validaçãoPedido(pedido);
    // Na coleção pedidos, inserir um novo pedido
    await connection.collection("pedidos").insertOne(pedido);
};

// Função edita um pedido no banco de dados
const editPedido = async (_id, pedido) => {
    const connection = await getConnection();
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
    getAllPedidosFeito,
    getAllPedidosEmAndamento,
    getAllPedidosConcluido,
};
