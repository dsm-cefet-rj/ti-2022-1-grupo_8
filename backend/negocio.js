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
    imagem: "string",
    nome: "string",
    preco: "number",
    usados: "number",
    descricao: "string",
    pesoPorcao: "number",
};

const PizzaValidTypes = {
    nome: "string",
    descricao: "string",
    imagem: "string",
    ingredientes: "object",
    quant_comprada: "number",
    preco: "number",
};

const ProdutoValidTypes = {
    nome: "string",
    descricao: "string",
    imagem: "string",
    preco: "number",
    quant_comprada: "number",
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
