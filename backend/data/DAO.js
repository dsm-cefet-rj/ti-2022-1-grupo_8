var database = require('./database.json');

const getIngredientes = () => {
    return database.ingredientes;
}

const getPizzas = () => {
    return database.pizzas;
}

const getProdutos = () => {
    return database.produtos;
}

export { getIngredientes , getPizzas, getProdutos };