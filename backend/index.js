const express = require("express");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { getAllUsuarios, addUsuario } = require("./data/DAO");


const saltRounds = 10;

require("dotenv").config();

const port = process.env.BACKEND_PORT || 3001;
const server = express();
const rotasUsuario = require("./usuario");

server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
    next();
});

server.use(express.json());

server.get("/", (req, res) => {
    res.status(400).send("Bad Request");
});

server.post("/criar-usuario", (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        res.status(400).json({
            erro: "Dados insuficientes",
        });
        return;
    }

    const usuario = {
        nome,
        email,
        senha,
        type: "user",
        pedidos: [],
    };

    // usuário ja existe?
    const usuarios = getAllUsuarios();

    const usuarioExistente = usuarios.find((usuario) => usuario.email == email);

    if (usuarioExistente) {
        res.status(400).json({
            erro: "E-mail já cadastrado",
        });
        return;
    }

    // adicionar usuário
    // hash the password
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(usuario.senha, salt, (err, hash) => {
            if (err) {
                res.status(500).json({
                    erro: "Erro desconhecido",
                });
                console.log(err);
                return;
            }
            usuario.senha = hash;
            addUsuario(usuario);
            res.status(201).json({
                mensagem: "Usuário cadastrado com sucesso",
            });
        });
    });
});

server.post("/login", (req, res) => {
    const { email, senha } = req.body;

    console.log(email, senha);

    if (!email || !senha) {
        res.status(400).json({
            erro: "Dados insuficientes",
        });
        return;
    }

    const usuarios = getAllUsuarios();

    const usuarioExistente = usuarios.find((usuario) => usuario.email == email);

    if (!usuarioExistente) {
        res.status(400)
            .json({
                erro: "Usuário não cadastrado",
            })
            .end();
        return;
    }

    bcrypt.compare(senha, usuarioExistente.senha, (err, result) => {
        if (err) {
            res.status(500)
                .json({
                    erro: "Erro desconhecido",
                })
                .end();
            console.log(err);
            return;
        }
        if (result) {
            const token = jwt.sign(
                {
                    email: usuarioExistente.email,
                    type: usuarioExistente.type,
                    id: usuarioExistente.id,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1h",
                }
            );
            res.status(200)
                .json({
                    token,
                    usuario: usuarioExistente,
                    type: usuarioExistente.type,
                })
                .end();
        } else {
            res.status(400)
                .json({
                    erro: "Senha incorreta",
                })
                .end();
        }
    });
});

server.use("/usuario", rotasUsuario);

server.listen(port, () => {
    console.log(
        `⚠️ ❗ Servidor aberto no endereço http://localhost:${port} ❗⚠️`
    );
});
