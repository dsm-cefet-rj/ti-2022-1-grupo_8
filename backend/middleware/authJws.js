const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getAllUsuarios } = require("../data/DAO");

require("dotenv").config();

const jwt_secret = process.env.JWT_SECRET;
// verifica se o token está válido e se o usuário é o mesmo que o token
verificarToken = (req, res, next) => {
    const token = (
        req.headers["x-access-token"] ||
        req.headers["authorization"] ||
        req.headers["x-auth-token"]
    ).replace("Bearer ", "");
    if (!token) {
        // se não existir token
        return res
            .status(401)
            .send({ auth: false, message: "No token provided." });
    } else {
        jwt.verify(token, jwt_secret, (err, decoded) => {
            if (err) {
                // se o token estiver inválido
                return res.status(500).send({
                    auth: false,
                    message: "Failed to authenticate token.",
                });
            } else {
                // se o token estiver válido
                req.user = decoded;
                // Adicionar informações do payload do token no request
                const tokenPayload = jwt.decode(token); // decodifica o token
                req.user = tokenPayload;

                next(); // continua a execução da rota
            }
        });
    }
};

// verifica se o usuário é admin
isAdmin = (req, res, next) => {
    const usuarios = getAllUsuarios();
    const usuario = usuarios.find((usuario) => usuario.email == req.user.email);
    if (usuario.type == "admin") {
        next();
    }
    return res.status(401).json({
        auth: false,
        message: "Acesso negado",
    });
};

// verifica se o usuário é funcionário
isFuncionario = (req, res, next) => {
    const usuarios = getAllUsuarios();
    const usuario = usuarios.find((usuario) => usuario.email == req.user.email);
    if (usuario.type == "funcionario") {
        next();
    }
    return res.status(401).json({
        auth: false,
        message: "Usuário não autorizado",
    });
};

const authMiddlewares = {
    verificarToken,
    isAdmin,
    isFuncionario,
};
module.exports = authMiddlewares;
