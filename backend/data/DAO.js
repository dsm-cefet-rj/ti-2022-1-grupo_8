const { Usuario, Ingrediente, Pizza, Produto } = require('../negocio');
var database = require('./database.json');

const getIngredientes = () => {
    let ingredientes = database.ingredientes;
    for (let i = 0; i < ingredientes.length; i++) {
        ingredientes[i] = Object.assign(new Ingrediente, ingredientes[i]);
    }
    return ingredientes;
}

const getPizzas = () => {
    return database.pizzas;
}

const getProdutos = () => {
    return database.produtos;
}

module.exports = {
    getIngredientes,
    getPizzas,
    getProdutos
}