const { Usuario, Ingrediente, Pizza, Produto } = require("../negocio");
var database = require("./database.json");

const saveDatabase = () => {
    const prettier = require("prettier");
    require("fs").writeFileSync("./backend/data/database.json", prettier.format(JSON.stringify(database), { parser: "json" }));
};

/******** INGREDIENTES ********/

const getAllIngredientes = () => {
    return database.ingredientes;
};

const getIngrediente = (id) => {
    let ingrediente = database.ingredientes.find(
        (ingrediente) => ingrediente.id === id
    );
    return Object.assign(new Ingrediente(), ingrediente);
};

const addIngrediente = (ingrediente) => {
    let ingredienteDB = database.ingredientes;
    ingredienteDB.push(ingrediente);
    saveDatabase();
    return ingredienteDB[ingredienteDB.length - 1];
};

const editIngrediente = (id, ingrediente) => {
    let ingredienteDB = database.ingredientes;
    let index = ingredienteDB.findIndex((ingrediente) => ingrediente.id === id);
    saveDatabase();
    return Object.assign(ingredienteDB[index], ingrediente);
};

const removeIngrediente = (id) => {
    let ingredienteDB = database.ingredientes;
    let index = ingredienteDB.findIndex((ingrediente) => ingrediente.id === id);
    let removido = ingredienteDB.splice(index, 1);
    saveDatabase();
    return removido;
};

/******** PIZZAS ********/

const getAllPizzas = () => {
    return database.pizzas;
};

const getPizza = (id) => {
    let pizza = database.pizzas.find((pizza) => pizza.id === id);
    return Object.assign(new Pizza(), pizza);
};

const addPizza = (pizzas) => {
    let pizzaDB = database.pizzas;
    pizzaDB.push(pizzas);
    saveDatabase();
    return pizzaDB[pizzaDB.length - 1];
};

const editPizza = (id, pizza) => {
    let pizzaDB = database.pizzas;
    let index = pizzaDB.findIndex((pizza) => pizza.id === id);
    saveDatabase();
    return Object.assign(pizzaDB[index], pizza);
};

const removePizza = (id) => {
    let pizzaDB = database.pizzas;
    let index = pizzaDB.findIndex((pizza) => pizza.id === id);
    let removido = pizzaDB.splice(index, 1);
    saveDatabase();
    return removido;
};

/******** PRODUTOS ********/

const getAllProdutos = () => {
    return database.produtos;
};

const getProduto = (id) => {
    let produto = database.produtos.find((produto) => produto.id === id);
    return Object.assign(new Produto(), produto);
};

const addProduto = (produto) => {
    let produtoDB = database.produtos;
    produtoDB.push(produto);
    saveDatabase();
    return produtoDB[database.produtos.length - 1];
};

const editProduto = (id, produto) => {
    let produtoDB = database.produtos;
    let index = produtoDB.findIndex((produto) => produto.id === id);
    saveDatabase();
    return Object.assign(produtoDB[index], produto);
};

const removeProduto = (id) => {
    let produtoDB = database.produtos;
    let index = produtoDB.findIndex((produto) => produto.id === id);
    let removido = produtoDB.splice(index, 1);
    saveDatabase();
    return removido;
};

/******** Usuários ********/

const getAllUsuarios = () => {
    return database.usuarios;
};

const getUsuario = (id) => {
    let usuario = database.usuarios.find((usuario) => usuario.id === id);
    return Object.assign(new Usuario(), usuario);
};

const addUsuario = (usuario) => {
    let usuarioDB = database.usuarios;
    usuarioDB.push(usuario);
    saveDatabase();
    return usuarioDB[database.usuarios.length - 1];
};

const editUsuario = (id, usuario) => {
    let usuarioDB = database.usuarios;
    let index = usuarioDB.findIndex((usuario) => usuario.id === id);
    saveDatabase();
    return Object.assign(usuarioDB[index], usuario);
};

const removeUsuario = (id) => {
    let usuarioDB = database.usuarios;
    let index = usuarioDB.findIndex((usuario) => usuario.id === id);
    let removido = usuarioDB.splice(index, 1);
    saveDatabase();
    return removido;
};

module.exports = {
    getAllIngredientes,
    getIngrediente,
    addIngrediente,
    editIngrediente,
    removeIngrediente,
    getAllPizzas,
    getPizza,
    addPizza,
    editPizza,
    removePizza,
    getAllProdutos,
    getProduto,
    editProduto,
    addProduto,
    removeProduto,
    getAllUsuarios,
    getUsuario,
    addUsuario,
    editUsuario,
    removeUsuario,
};
