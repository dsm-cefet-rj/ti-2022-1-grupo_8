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
    new Promise((resolve, reject) => {
        client.connect((err) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log("Connected successfully to server");
                resolve(client);
            }
        });
    })
        .then((client) => {
            return client;
        })
        .catch((err) => {
            console.log(err);
        });
};

/******** INGREDIENTES ********/

const getAllIngredientes = () => {
    new Promise((resolve, reject) => {
        getConnection(client)
            .db("PizzariaOn")
            .collection("ingredientes")
            .find({})
            .toArray((err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    console.log("Ingredientes recuperados com sucesso");
                    resolve(result);
                }
            });
    })
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.log(err);
        });
};

const getIngrediente = (id) => {
    new Promise((resolve, reject) => {
        getConnection(client)
            .db("PizzariaOn")
            .collection("ingredientes")
            .findOne({ id: id }, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    console.log("Ingrediente recuperado com sucesso");
                    resolve(result);
                }
            });
    })
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.log(err);
        });
};

const addIngrediente = (ingrediente) => {
    new Promise((resolve, reject) => {
        getConnection(client)
            .db("PizzariaOn")
            .collection("ingredientes")
            .insertOne(ingrediente, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    console.log("Ingrediente adicionado com sucesso");
                    resolve(result);
                }
            });
    })
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.log(err);
        });
};

const editIngrediente = (id, ingrediente) => {
    new Promise((resolve, reject) => {
        getConnection(client)
            .db("PizzariaOn")
            .collection("ingredientes")
            .updateOne({ id: id }, ingrediente, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    console.log("Ingrediente editado com sucesso");
                    resolve(result);
                }
            });
    })
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.log(err);
        });
};

const removeIngrediente = (id) => {
    new Promise((resolve, reject) => {
        getConnection(client)
            .db("PizzariaOn")
            .collection("ingredientes")
            .deleteOne({ id: id }, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    console.log("Ingrediente removido com sucesso");
                    resolve(result);
                }
            });
    })
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.log(err);
        });
};

/******** PIZZAS ********/

const getAllPizzas = () => {
    new Promise((resolve, reject) => {
        getConnection(client)
            .db("PizzariaOn")
            .collection("pizzas")
            .find({})
            .toArray();
    })
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.log(err);
        });
};

const getPizza = (id) => {
    new Promise((resolve, reject) => {
        getConnection(client)
            .db("PizzariaOn")
            .collection("pizzas")
            .findOne({ _id: id });
    })
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.log(err);
        });
};

const addPizza = (pizzas) => {
    new Promise((resolve, reject) => {
        getConnection(client)
            .db("PizzariaOn")
            .collection("pizzas")
            .insertOne(pizzas);
    })
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.log(err);
        });
};

const editPizza = (id, pizza) => {
    new Promise((resolve, reject) => {
        getConnection(client)
            .db("PizzariaOn")
            .collection("pizzas")
            .updateOne({ _id: id }, { $set: pizza });
    })
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.log(err);
        });
};

const removePizza = (id) => {
    new Promise((resolve, reject) => {
        getConnection(client)
            .db("PizzariaOn")
            .collection("pizzas")
            .deleteOne({ _id: id });
    })
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.log(err);
        });
};

/******** PRODUTOS ********/

const getAllProdutos = () => {
    new Promise((resolve, reject) => {
        getConnection(client)
            .db("PizzariaOn")
            .collection("produtos")
            .find({})
            .toArray();
    })
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.log(err);
        });
};

const getProduto = (id) => {
    new Promise((resolve, reject) => {
        getConnection(client)
            .db("PizzariaOn")
            .collection("produtos")
            .findOne({ _id: id });
    })
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.log(err);
        });
};

const addProduto = (produto) => {
    new Promise((resolve, reject) => {
        getConnection(client)
            .db("PizzariaOn")
            .collection("produtos")
            .insertOne(produto);
    })
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.log(err);
        });
};

const editProduto = (id, produto) => {
    new Promise((resolve, reject) => {
        getConnection(client)
            .db("PizzariaOn")
            .collection("produtos")
            .updateOne({ _id: id }, { $set: produto });
    })
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.log(err);
        });
};

const removeProduto = (id) => {
    new Promise((resolve, reject) => {
        getConnection(client)
            .db("PizzariaOn")
            .collection("produtos")
            .deleteOne({ _id: id });
    })
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.log(err);
        });
};

/******** Usuários ********/

const getAllUsuarios = () => {
    new Promise((resolve, reject) => {
        getConnection(client)
            .db("PizzariaOn")
            .collection("usuarios")
            .find({})
            .toArray();
    })
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.log(err);
        });
};

const getUsuario = (email) => {
    new Promise((resolve, reject) => {
        getConnection(client)
            .db("PizzariaOn")
            .collection("usuarios")
            .findOne({ email: email });
    })
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.log(err);
        });
};

const addUsuario = (usuario) => {
    new Promise((resolve, reject) => {
        getConnection(client)
            .db("PizzariaOn")
            .collection("usuarios")
            .insertOne(usuario);
    })
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.log(err);
        });
};

const editUsuario = (email, usuario) => {
    new Promise((resolve, reject) => {
        getConnection(client)
            .db("PizzariaOn")
            .collection("usuarios")
            .updateOne({ email: email }, { $set: novoUsuario });
    })
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.log(err);
        });
};

const removeUsuario = (email) => {
    new Promise((resolve, reject) => {
        getConnection(client)
            .db("PizzariaOn")
            .collection("usuarios")
            .deleteOne({ email: email });
    })
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.log(err);
        });
};

/******** Pedidos ********/

const getAllPedidos = () => {
    // retorna todos os pedidos
    new Promise((resolve, reject) => {
        getConnection(client)
            .db("PizzariaOn")
            .collection("pedidos")
            .find({})
            .toArray();
    })
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.log(err);
        });
};

const getPedidos = (email) => {
    // retorna todos os pedidos do usuário pelo email
    new Promise((resolve, reject) => {
        getConnection(client)
            .db("PizzariaOn")
            .collection("pedidos")
            .find({ email: email })
            .toArray();
    })
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.log(err);
        });
};

const addPedido = (pedido) => {
    new Promise((resolve, reject) => {
        getConnection(client)
            .db("PizzariaOn")
            .collection("pedidos")
            .insertOne(pedido);
    })
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.log(err);
        });
};

const editPedido = (id, pedido) => {
    new Promise((resolve, reject) => {
        getConnection(client)
            .db("PizzariaOn")
            .collection("pedidos")
            .updateOne({ _id: id }, { $set: novoPedido });
    })
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.log(err);
        });
};

const removePedido = (id) => {
    new Promise((resolve, reject) => {
        getConnection(client)
            .db("PizzariaOn")
            .collection("pedidos")
            .deleteOne({ _id: id });
    })
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.log(err);
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
