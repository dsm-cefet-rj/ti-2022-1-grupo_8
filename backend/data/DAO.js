const { Usuario, Ingrediente, Pizza, Produto } = require("../negocio");
var database = require("./database.json");

/******** INGREDIENTES ********/

const getAllIngredientes = () => {
    let ingredientes = database.ingredientes;
    for (let i = 0; i < ingredientes.length; i++) {
        ingredientes[i] = Object.assign(new Ingrediente(), ingredientes[i]);
    }
    return ingredientes;
};

const getIngrediente = (id) => {
    let ingrediente = database.ingredientes.find(
        (ingrediente) => ingrediente.id === id
    );
    return Object.assign(new Ingrediente(), ingrediente);
};

const addIngrediente = (ingrediente) => {
    database.ingredientes.push(ingrediente);
    return database.ingredientes[database.ingredientes.length - 1];
};

const removeIngrediente = (id) => {
    let ingredientes = database.ingredientes;
    let index = ingredientes.findIndex((ingrediente) => ingrediente.id === id);
    let removido = ingredientes.splice(index, 1);
    return removido;
};

/******** PIZZAS ********/

const getAllPizzas = () => {
    return database.pizzas;
};

const getPizza = (id) => {
    let pizza = database.pizzas.find((pizza) => pizza.id === id);
    return Object.assign(new pizzas(), pizzas);
};

const addPizza = (pizzas) => {
    database.pizzas.push(pizzas);
    return database.pizzas[database.pizzas.length - 1];
};

const removePizza = (id) => {
    let pizzas = database.pizzas;
    let index = pizzas.findIndex((pizza) => pizza.id === id);
    let removido = pizzas.splice(index, 1);
    return removido;
};

/******** PRODUTOS ********/

const getAllProdutos = () => {
    return database.produtos;
};

const getProduto = (id) => {
    let produto = database.produtos.find((produto) => produto.id === id);
    return Object.assign(new produto(), produto);
};

const addProduto = (produto) => {
    database.produtos.push(produto);
    return database.produtos[database.produtos.length - 1];
};

const removeProduto = (id) => {
    let produtos = database.produtos;
    let index = produtos.findIndex((produto) => produto.id === id);
    let removido = produtos.splice(index, 1);
    return removido;
};

module.exports = {
    getAllIngredientes,
    getIngrediente,
    addIngrediente,
    removeIngrediente,
    getAllPizzas,
    getPizza,
    addPizza,
    removePizza,
    getAllProdutos,
    getProduto,
    addProduto,
    removeProduto,
};
