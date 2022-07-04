/*
Esse arquivo disponibiliza as funções que acessam o banco de dados para a entidade Usuario.
Os campos da entidade Usuario são:
    _id: ObjectId
    nome: string
    email: string
    senha: string
    type: string
*/
const { getConnection } = require("./DaoConexão");
const { ObjectId } = require("mongodb");
require("dotenv").config();
const { UsuarioValidTypes } = require("../negocio");

// Função para validar o usuário
const validaçãoUsuário = (usuario) => {
    // ProdutoValidTypes keys
    const keys = Object.keys(UsuarioValidTypes);

    if (usuario.id) delete usuario.id;
};

/******** Usuários ********/

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
    if (usuario) {
        usuario._id = usuario._id.toString();
        usuario.id = usuario._id;
    } else {
        throw new Error("Usuário não encontrado");
    }
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
    validaçãoUsuário(usuario);
    // Inserir usuário na coleção usuarios
    await connection.collection("usuarios").insertOne(usuario);
};

const editUsuario = async (usuario) => {
    const connection = await getConnection(); // conectar ao banco de dados
    const email = usuario.email;

    validaçãoUsuário(usuario);
    // Atualizar usuário na coleção usuarios
    if (usuario._id) {
        delete usuario._id;
    }
    await connection
        .collection("usuarios")
        .updateOne({ email: email }, { $set: usuario });
};

// Função remove um usuário pelo email
const removeUsuario = async (email) => {
    const connection = await getConnection(); // conectar ao banco de dados
    connection.collection("usuarios").deleteOne({ email: email });
};

module.exports = {
    getAllUsuarios,
    getUsuario,
    addUsuario,
    editUsuario,
    removeUsuario,
};
