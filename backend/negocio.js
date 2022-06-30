/*
Esse arquivo contém estruturas para a validação de dados.
*/
const UsuarioValidTypes = {
    _id: "string",
    nome: "string",
    email: "string",
    senha: "string",
    type: "string",
};

const IngredienteValidTypes = {
    _id: "string",
    imagem: "string",
    nome: "string",
    preco: "number",
    usados: "number",
    descricao: "string",
    pesoPorcao: "number",
};

const PizzaValidTypes = {
    _id: "string",
    nome: "string",
    descricao: "string",
    imagem: "string",
    ingredientes: "object",
    quant_comprada: "number",
    preco: "number",
};

const ProdutoValidTypes = {
    _id: "string",
    nome: "string",
    descricao: "string",
    imagem: "string",
    preco: "number",
    quant_comprada: "number",
};

const PedidoValidTypes = {
    _id: "string",
    email: "string",
    dataHora: "string",
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
