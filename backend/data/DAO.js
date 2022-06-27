const { Usuario, Ingrediente, Pizza, Produto } = require("../negocio");
const { MongoClient, ServerApiVersion } = require("mongodb");

require("dotenv").config();

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

/*
DataBase: PizzariaOn
Database collections:
- ingredientes
- pizzas
- produtos
- usuarios
- pedidos
*/

const uri = process.env.MONGODB_URI.replace("<username>", username).replace(
    "<password>",
    password
);

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

const getConnection = async () => {
    const connection = await client.connect();
    return connection.db("PizzariaOn");
};

/******** INGREDIENTES ********/

const getAllIngredientes = async () => {
    const connection = await getConnection();
    let ingredientes = await connection.collection("ingredientes").find().toArray();
    // transformar _id para string 
    ingredientes.map((ingrediente) => {
        ingrediente._id = ingrediente._id.toString();
        return ingrediente;
    });
    return ingredientes;
};

const getIngrediente = async (id) => {
    const connection = await getConnection();
    let ingrediente = await connection.collection("ingredientes").findOne({
        _id: new Mongo.ObjectID(id),
    });
    ingrediente["_id"] = ingrediente["_id"].toString();
    return ingrediente;
};

const addIngrediente = async (ingrediente) => {
    const connection = await getConnection();
    await connection.insertOne(ingrediente);
};

const editIngrediente = async (id, ingrediente) => {
    const connection = await getConnection();
    await connection.collection("ingredientes").updateOne({ _id: new Mongo.ObjectID(id) }, ingrediente);
};

const removeIngrediente = async (id) => {
    const connection = await getConnection();
    connection.collection("ingredientes").deleteOne({ _id: new Mongo.ObjectID(id) });
};

/******** PIZZAS ********/

const getAllPizzas = async () => {
    const connection = await getConnection();
    let pizzas = await connection.collection("pizzas").find().toArray();
    // transformar _id para string
    pizzas.map((pizza) => {
        pizza._id = pizza._id.toString();
        return pizza;
    });
    return pizzas;
};

const getPizza = async (id) => {
    const connection = await getConnection();
    let pizza = await connection.collection("pizzas").findOne({ _id: new Mongo.ObjectID(id) });
    pizza["_id"] = pizza["_id"].toString();
    return pizza;
};

const addPizza = async (pizzas) => {
    const connection = await getConnection();
    await connection.collection("pedidos").insertOne(pizzas);
};

const editPizza = async (id, pizza) => {
    const connection = await getConnection();
    await connection.collection("pizzas").updateOne({ _id: new Mongo.ObjectID(id) }, pizza);
};

const removePizza = async (id) => {
    const connection = await getConnection();
    connection.collection("pizzas").deleteOne({ _id: new Mongo.ObjectID(id) });
};

/******** PRODUTOS ********/

const getAllProdutos = async () => {
    const connection = await getConnection();
    let produtos = await connection.collection("produtos").find({}).toArray();
    // transformar _id para string
    produtos.map((produto) => {
        produto._id = produto._id.toString();
        return produto;
    });
    return produtos;
};

const getProduto = async (id) => {
    const connection = await getConnection();
    let produto = connection.collection("produtos").findOne({ _id: new Mongo.ObjectID(id) });
    produto["_id"] = produto["_id"].toString();
    return produto;
};

const addProduto = async (produto) => {
    const connection = await getConnection();
    await connection.collection("produtos").insertOne(produto);
};

const editProduto = async (id, produto) => {
    const connection = await getConnection();
    await connection.collection("produtos").updateOne({ _id: new Mongo.ObjectID(id) }, produto);
};

const removeProduto = async (id) => {
    const connection = await getConnection();
    connection.collection("produtos").deleteOne({ _id: new Mongo.ObjectID(id) });
};

/******** Usuários ********/

const getAllUsuarios = async () => {
    const connection = await getConnection();
    let usuarios = await connection.collection("usuarios")
        .find()
        .toArray();

    // transformar _id para string 
    usuarios.map((usuario) => {
        usuario._id = usuario._id.toString();
        return usuario;
    });
    return usuarios;
};

const getUsuario = async (email) => {
    const connection = await getConnection();
    const usuario = await connection.collection("usuarios").findOne({
        email: email,
    });
    usuario["_id"] = usuario["_id"].toString();
    return usuario;
};

const addUsuario = async (usuario) => {
    const connection = await getConnection();
    await connection.collection("usuarios").insertOne(usuario);
};

const editUsuario = async (email, usuario) => {
    const connection = await getConnection();
    await connection.collection("usuarios").updateOne({ email: email }, usuario);
};

const removeUsuario = async (email) => {
    const connection = await getConnection();
    connection.collection("usuarios").deleteOne({ email: email });
};

/******** Pedidos ********/

const getAllPedidos = async () => {
    const connection = await getConnection();
    let pedidos = connection.collection("pedidos").find().toArray();
    // transformar _id para string
    pedidos.map((pedido) => {
        pedido._id = pedido._id.toString();
        return pedido;
    });
    return pedidos;
};

const getPedidos = async (email) => {
    const connection = await getConnection();
    let pedidos = connection.collection("pedidos").find({ email: email }).toArray();
    // transformar _id para string
    pedidos.map((pedido) => {
        pedido._id = pedido._id.toString();
        return pedido;
    });
    return pedidos;
};

const addPedido = async (pedido) => {
    const connection = await getConnection();
    await connection.collection("pedidos").insertOne(pedido);
};

const editPedido = async (id, pedido) => {
    const connection = await getConnection();
    await connection.collection("pedidos").updateOne({ _id: new Mongo.ObjectID(id) }, pedido);
};

const removePedido = async (id) => {
    const connection = await getConnection();
    connection.collection("pedidos").deleteOne({ _id: new Mongo.ObjectID(id) });
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
