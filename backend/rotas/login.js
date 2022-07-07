const express = require("express");
const router = express.Router();
const session = require("express-session");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { getAllUsuarios, addUsuario } = require("../data/DaoUsuario");

const saltRounds = 10;

require("dotenv").config();

// Rota de login
router.post("/auth", async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        res.status(400).json({
            erro: "Dados insuficientes",
        });
        return;
    }
    const usuarios = await getAllUsuarios();

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

// Rota para cadastrar um novo usuário
router.post("/criar", async (req, res) => {
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
    const usuarios = await getAllUsuarios();

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

module.exports = router;
