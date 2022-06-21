const express = require("express");
require("dotenv").config();

const cors = require("cors");
const port = process.env.BACKEND_PORT || 3001;
const server = express();
const rotasUsuario = require("./rotas/usuario");
const rotasFuncionario = require("./rotas/funcionario");
const rotasLogin = require("./rotas/login");
const authMiddlewares = require("./middleware/authJws");

server.use(cors());

server.use(express.json());

server.use("/login", rotasLogin);

// usar o middleware verificarToken nas rotas de rotasUsuario
server.use("/usuario", authMiddlewares.verificarToken, rotasUsuario);

// usar o middleware verificarToken nas rotas de rotasFuncionario
server.use("/funcionario", authMiddlewares.verificarToken, rotasFuncionario);
// verificar se o usuário logado é um funcionário
server.use("/funcionario", authMiddlewares.isFuncionario, rotasFuncionario);

// rota para verificar se o usuário está logado
server.get("/session", (req, res) => {
    // use cors para permitir acesso de qualquer origem

    console.log(req.session);
    if (req.session == undefined) {
        res.status(401).json({
            erro: "Nem um usuário logado",
        });
        return;
    }

    if (req.session.usuario) {
        res.status(200)
            .json({
                usuario: req.session.usuario,
                type: req.session.type,
            })
            .end();
    } else {
        res.status(401)
            .json({
                erro: "Não autorizado",
            })
            .end();
    }
});

// definir mensagem de erro para rotas não ultilizadas
server.use((req, res, next) => {
    res.status(404).json({
        message: "Rota não existe 😔",
    });
});

server.listen(port, () => {
    console.log(
        `⚠️ ❗ Servidor aberto no endereço http://localhost:${port} ❗⚠️`
    );
});
