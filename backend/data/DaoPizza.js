const { getConnection } = require ("./DaoConexão");
const { ObjectId } = require("mongodb");
require("dotenv").config();
const {PizzaValidTypes} = require("../negocio");

// Função para validar o pizza
const validaçãoPedido = (pizza) => {
    // ProdutoValidTypes keys
    const keys = Object.keys(PizzaValidTypes);
    keys.forEach((key) => {
        if (!pizza[key]) {
            throw new Error(`${key} é um campo obrigatório`);
        }
        if (typeof pizza[key] !== ProdutoValidTypes[key]) {
            throw new Error(`${key} deve ser do tipo ${ProdutoValidTypes[key]}`);
        }
    });
    if (pizza.id) delete pizza.id;
}

/******** PIZZAS ********/

const getAllPizzas = async () => {
    const connection = await getConnection(); // conectar ao banco de dados
    let pizzas = await connection.collection("pizzas").find().toArray();
    // transformar _id para string
    pizzas.map((pizza) => {
        pizza._id = pizza._id.toString();
        pizza.id = pizza._id;
        return pizza;
    });
    return pizzas;
};

const getPizza = async (id) => {
    const connection = await getConnection(); // conectar ao banco de dados
    let pizza = await connection
        .collection("pizzas")
        .findOne({ _id: new ObjectId(id) });
    pizza._id = pizza._id.toString();
    pizza.id = pizza._id;
    return pizza;
};

const addPizza = async (pizzas) => {
    const connection = await getConnection(); // conectar ao banco de dados
    validaçãoPedido(pizzas);
    await connection.collection("pedidos").insertOne(pizzas);
};

const editPizza = async (id, pizza) => {
    const connection = await getConnection(); // conectar ao banco de dados
    validaçãoPedido(pizza);
    await connection
        .collection("pizzas")
        .updateOne({ _id: new ObjectId(id) }, { $set: pizza });
};

const removePizza = async (id) => {
    const connection = await getConnection(); // conectar ao banco de dados
    connection.collection("pizzas").deleteOne({ _id: new ObjectId(id) });
};

module.exports = {
    getAllPizzas,
    getPizza,
    addPizza,
    editPizza,
    removePizza
}