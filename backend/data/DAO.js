const { Usuario, Ingrediente, Pizza, Produto } = require("../negocio");
var database = require("./database.json");

const saveDatabase = () => {
    const prettier = require("prettier");
    require("fs").writeFileSync(
        "./backend/data/database.json",
        prettier.format(JSON.stringify(database), { parser: "json" })
    );
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
    let novoIngrediente = Object.assign(ingredienteDB[index], ingrediente);
    saveDatabase();
    return novoIngrediente;
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
    let novaPizza = Object.assign(pizzaDB[index], pizza);
    saveDatabase();
    return novaPizza;
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
    let novoProduto = Object.assign(produtoDB[index], produto);
    saveDatabase();
    return novoProduto;
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

const getUsuario = (email) => {
    let usuario = database.usuarios.find((usuario) => usuario.email === email);
    return Object.assign(new Usuario(), usuario);
};

const addUsuario = (usuario) => {
    let usuarioDB = database.usuarios;
    usuarioDB.push(usuario);
    saveDatabase();
    return usuarioDB[database.usuarios.length - 1];
};

const editUsuario = (email, usuario) => {
    let usuarioDB = database.usuarios;
    let index = usuarioDB.findIndex((usuario) => usuario.email === email);
    let novoUsuario = Object.assign(usuarioDB[index], usuario);
    saveDatabase();
    return novoUsuario;
};

const removeUsuario = (email) => {
    let usuarioDB = database.usuarios;
    let index = usuarioDB.findIndex((usuario) => usuario.email === email);
    let removido = usuarioDB.splice(index, 1);
    saveDatabase();
    return removido;
};

/******** Pedidos ********/

const getAllPedidos = () => {
    // retorna todos os pedidos
    return database.pedidos;
};

const getPedidos = (email) => {
    // retorna todos os pedidos do usuário pelo email
    let pedidos = [];
    database.pedidos.forEach((pedido) => {
        if (pedido.email === email) {
            pedidos.push(pedido);
        }
    });
    return pedidos;
};

const addPedido = (pedido) => {
    // adiciona um pedido
    let pedidoDB = database.pedidos;
    let id = pedidoDB.length + 1;
    pedido.id = id;
    pedidoDB.push(pedido);
    saveDatabase();
    return pedidoDB[database.pedidos.length - 1];
};

const editPedido = (id, pedido) => {
    let pedidoDB = database.pedidos;
    let index = pedidoDB.findIndex((pedido) => pedido.id === id);
    let novoPedido = Object.assign(pedidoDB[index], pedido);
    saveDatabase();
    return novoPedido;
};

const removePedido = (id) => {
    let pedidoDB = database.pedidos;
    let index = pedidoDB.findIndex((pedido) => pedido.id === id);
    let removido = pedidoDB.splice(index, 1);
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
    getAllPedidos,
    getPedidos,
    addPedido,
    editPedido,
    removePedido,
};
