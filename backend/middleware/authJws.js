const jwt = require("jsonwebtoken");

require("dotenv").config();

const jwt_secret = process.env.JWT_SECRET;
// verifica se o token está válido e se o usuário é o mesmo que o token
const verificarToken = (req, res, next) => {
    let token =
        req.headers["x-access-token"] ||
        req.headers["authorization"] ||
        req.headers["x-auth-token"];

    if (!token) {
        // se não existir token
        return res
            .status(401)
            .send({ auth: false, message: "No token provided." });
    } else {
        token = token.replace("Bearer ", ""); // remove o Bearer do token
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
                const tokenPayload = jwt.decode(token); // decodifica o token. Conteúdo: email, type, iat, exp
                req.user = tokenPayload;

                next(); // continua a execução da rota
            }
        });
    }
};

// verifica se o usuário é admin
const isAdmin = (req, res, next) => {
    let token =
        req.headers["x-access-token"] ||
        req.headers["authorization"] ||
        req.headers["x-auth-token"];
    if (token) {
        token = token.replace("Bearer ", ""); // remove o Bearer do token
        const tokenPayload = jwt.decode(token); // decodifica o token. Conteúdo: email, type, iat, exp
        const type = tokenPayload.type;
        if (type === "admin") {
            next();
            return;
        }
    }

    res.status(401).json({
        // Usuário não é admin 401
        auth: false,
        message: "Acesso negado , não é admin",
    }).end();
    return;
};

// verifica se o usuário é funcionário
const isFuncionario = (req, res, next) => {
    let token =
        req.headers["x-access-token"] ||
        req.headers["authorization"] ||
        req.headers["x-auth-token"];
    if (token) {
        token = token.replace("Bearer ", ""); // remove o Bearer do token
        const tokenPayload = jwt.decode(token); // decodifica o token. Conteúdo: email, type, iat, exp
        const type = tokenPayload.type;
        if (type == "funcionario") {
            next();
            return;
        }
    }
    res.status(401).json({
        // Usuário não é admin 401
        auth: false,
        message: "Acesso negado",
    }).end();
    return;
};

const authMiddlewares = {
    verificarToken,
    isAdmin,
    isFuncionario,
};
module.exports = authMiddlewares;
