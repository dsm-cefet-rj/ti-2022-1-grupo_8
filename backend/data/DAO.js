const { Usuario, Ingrediente, Pizza, Produto } = require("../negocio");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

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

// URI do banco de dados
const uri = process.env.MONGODB_URI.replace("<username>", username).replace(
    "<password>",
    password
);

// Cliente de conexão com o MongoDB
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
// Função para buscar todos os ingredientes do banco de dados
const getAllIngredientes = async () => {
    const connection = await getConnection(); // conectar ao banco de dados
    // Pegar da coleção ingredientes todos os ingredientes
    let ingredientes = await connection
        .collection("ingredientes")
        .find()
        .toArray();
    // transformar _id para string e adicionar campo id
    ingredientes.map((ingrediente) => {
        ingrediente._id = ingrediente._id.toString();
        ingrediente.id = ingrediente._id;
        return ingrediente;
    });
    return ingredientes;
};

const getIngrediente = async (id) => {
    const connection = await getConnection(); // conectar ao banco de dados
    let ingrediente = await connection.collection("ingredientes").findOne({
        _id: new ObjectId(id),
    });
    ingrediente._id = ingrediente._id.toString();
    ingrediente.id = ingrediente._id;
    return ingrediente;
};

const addIngrediente = async (ingrediente) => {
    const connection = await getConnection(); // conectar ao banco de dados
    // Inserir ingrediente na coleção ingredientes
    await connection.collection("ingredientes").insertOne(ingrediente);
};

const editIngrediente = async (id, ingrediente) => {
    const connection = await getConnection(); // conectar ao banco de dados
    // edita o ingrediente com o id passado da coleção ingredientes
    await connection
        .collection("ingredientes")
        .updateOne({ _id: new ObjectId(id) }, ingrediente);
};

const removeIngrediente = async (id) => {
    const connection = await getConnection(); // conectar ao banco de dados
    // Remove o ingrediente com o _id passado da coleção ingredientes
    connection
        .collection("ingredientes")
        .deleteOne({ _id: new ObjectId(id) });
};

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
        .updateOne({ _id: new ObjectId(id) }, pizza);
};

const removePizza = async (id) => {
    const connection = await getConnection(); // conectar ao banco de dados
    connection.collection("pizzas").deleteOne({ _id: new ObjectId(id) });
};

/******** PRODUTOS ********/

const clearProduto = (produto) => {
    if (produto.id) delete produto.id;
};

const getAllProdutos = async () => {
    const connection = await getConnection();
    let produtos = await connection.collection("produtos").find({}).toArray();
    // transformar _id para string
    produtos.map((produto) => {
        produto._id = produto._id.toString(); // conectar ao banco de dados
        produto.id = produto._id;
        return produto;
    });
    return produtos;
};

const getProduto = async (_id) => {
    const connection = await getConnection(); // conectar ao banco de dados
    // Busca o produto com o _id passado
    let produto = connection
        .collection("produtos")
        .findOne({ _id: new ObjectId(_id) });
    produto._id = produto._id.toString();
    return produto;
};

const addProduto = async (produto) => {
    const connection = await getConnection(); // conectar ao banco de dados
    // Inserir produto na coleção produtos
    await connection.collection("produtos").insertOne(produto);
};

const editProduto = async (id, produto) => {
    const connection = await getConnection(); // conectar ao banco de dados
    // remove id e manter _id
    clearProduto(produto);
    // Na coleção produtos, atualizar o produto com o id passado
    await connection
        .collection("produtos")
        .updateOne({ _id: new ObjectId(id) }, produto);
};

const removeProduto = async (_id) => {
    const connection = await getConnection(); // conectar ao banco de dados
    // Da coleção produtos remove o produto com o id passado
    connection
        .collection("produtos")
        .deleteOne({ _id: new ObjectId(_id) });
};

/******** Usuários ********/

const clearUsuarios = (usuario) => {
    if (usuario.id) delete usuario.id;
};

const getAllUsuarios = async () => {
    const connection = await getConnection();
    // Pega todos os usuários da coleção usuarios
    let usuarios = await connection.collection("usuarios").find().toArray();

    // transformar _id para string
    usuarios.map((usuario) => {
        usuario._id = usuario._id.toString();
        usuario.id = usuario._id;
        return usuario;
    });
    return usuarios;
};

const getUsuario = async (email) => {
    const connection = await getConnection(); // conectar ao banco de dados
    // Pega um usuário pelo email da coleção usuarios
    const usuario = await connection.collection("usuarios").findOne({
        email: email,
    });
    // transformar _id para string
    usuario._id = usuario._id.toString();
    usuario.id = usuario._id;
    return usuario;
};

const addUsuario = async (usuario) => {
    const connection = await getConnection(); // conectar ao banco de dados
    // Verifica se o email já existe
    const usuarioExistente = await connection.collection("usuarios").findOne({
        email: usuario.email,
    });
    // Usuário já existe, erro
    if (usuarioExistente) {
        throw new Error("Email já existe");
    }
    // Inserir usuário na coleção usuarios
    await connection.collection("usuarios").insertOne(usuario);
};

const editUsuario = async (usuario) => {
    const connection = await getConnection(); // conectar ao banco de dados
    const email = usuario.email;
    clearUsuarios(usuario);
    // Atualizar usuário na coleção usuarios
    await connection
        .collection("usuarios")
        .updateOne({ email: email }, usuario);
};

// Função remove um usuário pelo email
const removeUsuario = async (email) => {
    const connection = await getConnection(); // conectar ao banco de dados
    connection.collection("usuarios").deleteOne({ email: email });
};

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
    await connection
        .collection("pedidos")
        .updateOne({ _id: new ObjectId(_id) }, pedido);
};

// Função para remover um pedido
const removePedido = async (_id) => {
    const connection = await getConnection(); // conectar ao banco de dados
    connection
        .collection("pedidos")
        .deleteOne({ _id: new ObjectId(_id) });
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
