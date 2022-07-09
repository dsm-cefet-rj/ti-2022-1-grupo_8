const express = require("express");
require("dotenv").config();

const cors = require("cors");
const port = process.env.BACKEND_PORT || 3001;
const server = express();
const rotasUsuario = require("./rotas/usuario");
const rotasFuncionario = require("./rotas/funcionario");
const rotasAdministrador = require("./rotas/admin");
const rotasLogin = require("./rotas/login");
const authMiddlewares = require("./middleware/authJws");
const formidable = require("express-formidable");

// Cors middleware
server.use(cors());

// application/json middleware
server.use(express.json());

// multipart/form-data middleware
server.use(
    formidable({
        encoding: "utf-8",
        uploadDir: "./uploads",
        keepExtensions: true,
        maxFieldsSize: 2 * 1024 * 1024,
        maxFields: 1000,
        multiples: true,
    })
);
require("fs").mkdirSync("./uploads", { recursive: true });

// Rotas de Login
server.use("/login", rotasLogin);

// usar o middleware verificarToken nas rotas de rotasUsuario
server.use("/usuario", authMiddlewares.verificarToken, rotasUsuario);

// usar o middleware verificarToken nas rotas de rotasFuncionario
server.use(
    "/funcionario",
    [authMiddlewares.verificarToken, authMiddlewares.isFuncionario],
    rotasFuncionario
);

// usar o middleware verificarToken nas rotas de rotasAdministrador
server.use(
    "/admin",
    [authMiddlewares.verificarToken, authMiddlewares.isAdmin],
    rotasAdministrador
);

// definir mensagem de erro para rotas não ultilizadas
server.use((req, res, next) => {
    res.status(404).json({
        message: "Não existe pizzas 🍕 nessa rota 😠",
    });
});

server.listen(port, () => {
    console.log(
        `⚠️ ❗ Servidor aberto no endereço http://localhost:${port} ❗⚠️`
    );

    console.log(
        `⚠️ ❗ Acesse o endereço http://localhost:3000 para acessar o frontend ❗⚠️`
    );
});
