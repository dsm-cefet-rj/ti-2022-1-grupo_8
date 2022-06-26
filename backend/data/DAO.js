const { Usuario, Ingrediente, Pizza, Produto } = require("../negocio");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

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

var uri = process.env.MONGODB_URI.replace("<username>", username).replace(
    "<password>",
    password
);

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

const getConnection = (client) => {
    return new Promise((resolve, reject) => {
        client.connect((err) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log("Connected successfully to server");
                resolve(client);
            }
        });
    });
};

/******** INGREDIENTES ********/

const getAllIngredientes = () => {
    return getConnection(client).then((client) => {
        return client
            .db("PizzariaOn")
            .collection("ingredientes")
            .find({})
            .toArray();
    });
};

const getIngrediente = (id) => {
    let ingrediente = getConnection(client).then((client) => {
        return client
            .db("PizzariaOn")
            .collection("ingredientes")
            .findOne({ _id: id });
    });
};

const addIngrediente = (ingrediente) => {
    return getConnection(client).then((client) => {
        return client
            .db("PizzariaOn")
            .collection("ingredientes")
            .insertOne(ingrediente);
    });
};

const editIngrediente = (id, ingrediente) => {
    return getConnection(client).then((client) => {
        return client
            .db("PizzariaOn")
            .collection("ingredientes")
            .updateOne({ _id: id }, { $set: ingrediente });
    });
};

const removeIngrediente = (id) => {
    return getConnection(client).then((client) => {
        return client
            .db("PizzariaOn")
            .collection("ingredientes")
            .deleteOne({ _id: id });
    });
};

/******** PIZZAS ********/

const getAllPizzas = () => {
    return getConnection(client).then((client) => {
        return client.db("PizzariaOn").collection("pizzas").find({}).toArray();
    });
};

const getPizza = (id) => {
    return getConnection(client).then((client) => {
        return client
            .db("PizzariaOn")
            .collection("pizzas")
            .findOne({ _id: id });
    });
};

const addPizza = (pizzas) => {
    return getConnection(client).then((client) => {
        return client.db("PizzariaOn").collection("pizzas").insertOne(pizzas);
    });
};

const editPizza = (id, pizza) => {
    return getConnection(client).then((client) => {
        return client
            .db("PizzariaOn")
            .collection("pizzas")
            .updateOne({ _id: id }, { $set: pizza });
    });
};

const removePizza = (id) => {
    return getConnection(client).then((client) => {
        return client
            .db("PizzariaOn")
            .collection("pizzas")
            .deleteOne({ _id: id });
    });
};

/******** PRODUTOS ********/

const getAllProdutos = () => {
    return getConnection(client).then((client) => {
        return client
            .db("PizzariaOn")
            .collection("produtos")
            .find({})
            .toArray();
    });
};

const getProduto = (id) => {
    return getConnection(client).then((client) => {
        return client
            .db("PizzariaOn")
            .collection("produtos")
            .findOne({ _id: id });
    });
};

const addProduto = (produto) => {
    return getConnection(client).then((client) => {
        return client
            .db("PizzariaOn")
            .collection("produtos")
            .insertOne(produto);
    });
};

const editProduto = (id, produto) => {
    return getConnection(client).then((client) => {
        return client
            .db("PizzariaOn")
            .collection("produtos")
            .updateOne({ _id: id }, { $set: produto });
    });
};

const removeProduto = (id) => {
    return getConnection(client).then((client) => {
        return client
            .db("PizzariaOn")
            .collection("produtos")
            .deleteOne({ _id: id });
    });
};

/******** Usuários ********/

const getAllUsuarios = () => {
    return getConnection(client).then((client) => {
        return client
            .db("PizzariaOn")
            .collection("usuarios")
            .find({})
            .toArray();
    });
};

const getUsuario = (email) => {
    return getConnection(client).then((client) => {
        return client
            .db("PizzariaOn")
            .collection("usuarios")
            .findOne({ email: email });
    });
};

const addUsuario = (usuario) => {
    return getConnection(client).then((client) => {
        return client
            .db("PizzariaOn")
            .collection("usuarios")
            .insertOne(usuario);
    });
};

const editUsuario = (email, usuario) => {
    return getConnection(client).then((client) => {
        return client
            .db("PizzariaOn")
            .collection("usuarios")
            .updateOne({ email: email }, { $set: novoUsuario });
    });
};

const removeUsuario = (email) => {
    return getConnection(client).then((client) => {
        return client
            .db("PizzariaOn")
            .collection("usuarios")
            .deleteOne({ email: email });
    });
};

/******** Pedidos ********/

const getAllPedidos = () => {
    // retorna todos os pedidos
    return getConnection(client).then((client) => {
        return client.db("PizzariaOn").collection("pedidos").find({}).toArray();
    });
};

const getPedidos = (email) => {
    // retorna todos os pedidos do usuário pelo email
    return getConnection(client).then((client) => {
        return client
            .db("PizzariaOn")
            .collection("pedidos")
            .find({ email: email })
            .toArray();
    });
};

const addPedido = (pedido) => {
    return getConnection(client).then((client) => {
        return client.db("PizzariaOn").collection("pedidos").insertOne(pedido);
    });
};

const editPedido = (id, pedido) => {
    return getConnection(client).then((client) => {
        return client
            .db("PizzariaOn")
            .collection("pedidos")
            .updateOne({ _id: id }, { $set: novoPedido });
    });
};

const removePedido = (id) => {
    return getConnection(client).then((client) => {
        return client
            .db("PizzariaOn")
            .collection("pedidos")
            .deleteOne({ _id: id });
    });
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
