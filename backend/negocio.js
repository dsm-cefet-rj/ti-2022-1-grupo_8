/*
Esse arquivo contém estruturas para a validação de dados.
*/
const UsuarioValidTypes = {
    nome: "string",
    email: "string",
    senha: "string",
    type: "string",
};

const IngredienteValidTypes = {
    nome: "string",
    preco: "number",
    descricao: "string",
    pesoPorcao: "number",
};

const PizzaValidTypes = {
    nome: "string",
    descricao: "string",
    ingredientes: "object",
    preco: "number",
};

const ProdutoValidTypes = {
    nome: "string",
    descricao: "string",
    preco: "number",
};

const PedidoValidTypes = {
    email: "string",
    dataHora: "number",
    endereco: "string",
    carrinho: "object",
    status: "string",
};

module.exports = {
    UsuarioValidTypes,
    IngredienteValidTypes,
    PizzaValidTypes,
    ProdutoValidTypes,
    PedidoValidTypes,
};
