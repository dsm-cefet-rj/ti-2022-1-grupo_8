const { getConnection } = require ("./DaoConexão");
const { ObjectId } = require("mongodb");
require("dotenv").config();

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
    await connection.collection("pedidos").insertOne(pizzas);
};

const editPizza = async (id, pizza) => {
    const connection = await getConnection(); // conectar ao banco de dados
    // remove id e manter _id
    delete pizza.id;
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