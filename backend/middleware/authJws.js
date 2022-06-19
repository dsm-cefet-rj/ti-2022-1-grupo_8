const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getAllUsuarios } = require("../data/DAO");

require("dotenv").config();

const jwt_secret = process.env.JWT_SECRET;
// verifica se o token está válido e se o usuário é o mesmo que o token
verificarToken = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        return res.status(401).json({
            auth: false,
            message: "Token não encontrado"
        });

    } else {
        jwt.verify(token, jwt_secret, (err, decoded) => {
            if (err) {
                return res.status(500).json({
                    auth: false,
                    message: "Token inválido"
                });
            }
            req.userId = decoded.id;
            next();
        });
    }

    return res.status(200).json({
        auth: true
    });
}

// verifica se o usuário é admin
isAdmin = (req, res, next) => {
    const usuarios = getAllUsuarios();
    const usuario = usuarios.find((usuario) => usuario.email == req.user.email);
    if (usuario.type == "admin") {
        next();
    }
    return res.status(401).json({
        auth: false,
        message: "Acesso negado"
    });
}

// verifica se o usuário é funcionário
isFuncionario = (req, res, next) => {
    const usuarios = getAllUsuarios();
    const usuario = usuarios.find((usuario) => usuario.email == req.user.email);
    if (usuario.type == "funcionario") {
        next();
    }
    return res.status(401).json({
        auth: false,
        message: "Usuário não autorizado"
    });
}

const authMiddlewares = {
    verificarToken,
    isAdmin,
    isFuncionario,
};
module.exports = authMiddlewares;
