const { getAllPedidos } = require("./DaoPedidos");

let relatorioIngredientes = {};
let relatorioPizzas = {};
let relatorioProdutos = {};

const filtrarPedidosPorData = (pedidos, dataInicio, dataFim) => {
    // Filtra os pedidos entre duas datas.
    return pedidos.filter((pedido) => {
        return pedido.dataHora >= dataInicio && pedido.dataHora <= dataFim;
    });
};

const atualizarRelatorioIngredientes = (relatorio, ingrediente) => {
    // Recebe um objeto contendo um relatório de ingredientes e um ingrediente,
    // e atualiza o relatório com o ingrediente recebido.
    id = ingrediente.id;
    if (!relatorio[id]) {
        relatorio[id] = {
            nome: ingrediente.nome,
            quantidade: 0,
            lucro: 0,
        };
        relatorio[id]["quantidade"] += ingrediente.quantidade;
        relatorio[id]["lucro"] += ingrediente.preco;
    }
};

const atualizarRelatorioPizzas = (relatorio, pizza) => {
    // Recebe um objeto contendo um relatório de pizzas e uma pizza,
    // e atualiza o relatório com a pizza recebida.
    id = pizza.id;
    if (!relatorio[id]) {
        relatorio[id] = {
            nome: pizza.nome,
            porcoes: 0,
            custo: 0,
        };
        relatorio[id]["porcoes"] += pizza.quantidade;
        relatorio[id]["custo"] += pizza.preco;
    }
};

const atualizarRelatorioProdutos = (relatorio, produto) => {
    // Recebe um objeto contendo um relatório de produtos e um produto,
    // e atualiza o relatório com o produto recebido.
    id = produto.id;
    if (!relatorio[id]) {
        relatorio[id] = {
            nome: produto.nome,
            quantidade: 0,
            lucro: 0,
        };
        relatorio[id]["quantidade"] += produto.quantidade;
        relatorio[id]["lucro"] += produto.preco;
    }
};

const gerarRelatorios = async function (dataInicio, dataFim) {
    // Gera o relatório de ingredientes, pizzas e produtos dos pedidos entre duas datas.

    const pedidos = await getAllPedidos();

    const pedidosIntervalo = filtrarPedidosPorData(
        pedidos,
        dataInicio,
        dataFim
    );

    relatorioIngredientes = {};
    relatorioPizzas = {};
    relatorioProdutos = {};

    for (let pedido of pedidosIntervalo) {
        for (let item of pedido.carrinho) {
            if (item.tipo === "pizza") {
                // Consolidar ingredientes
                atualizarRelatorioIngredientes(relatorioIngredientes, item);

                // Consolidar pizzas
                if (item.descricao !== "") {
                    // Pizzas customizadas têm a descrição vazia
                    atualizarRelatorioPizzas(relatorioPizzas, item);
                }
            } else if (item.tipo === "produto") {
                atualizarRelatorioProdutos(relatorioProdutos, item);
            }
        }
    }

    return {
        ingredientes: Object.values(relatorioIngredientes),
        pizzas: Object.values(relatorioPizzas),
        produtos: Object.values(relatorioProdutos),
    };
};

module.exports = {
    gerarRelatorios,
};
