const { getAllPedidos } = require("./DaoPedidos");
const { getAllIngredientes } = require("./DaoIngrediente");

let relatorioIngredientes = {};
let relatorioPizzas = {};
let relatorioProdutos = {};

const filtrarPedidosPorData = (pedidos, dataInicio, dataFim) => {
    // Filtra os pedidos entre duas datas.
    return pedidos.filter((pedido) => {
        return pedido.dataHora >= dataInicio && pedido.dataHora <= dataFim;
    });
};

const atualizarRelatorioIngredientes = (ingredientesBD, relatorio, pizza) => {
    // Recebe um objeto contendo um relatório de ingredientes e uma pizza,
    // e atualiza o relatório com os ingredientes da pizza recebida.

    for (let metade of pizza.Metades) {
        for (let ingredienteID of metade) {
            //
            // TODO: gambiarra para lidar com IDs numéricos que ainda estão no banco
            const ingrediente = Number.isInteger(Number(ingredienteID))
                ? ingredientesBD[Number.parseInt(ingredienteID) - 1]
                : ingredientesBD.find(
                      (ingrediente) => ingrediente.id === ingredienteID
                  );
            //end of gambiarra

            if (ingrediente == undefined) {
                // Ingrediente não existe mais.
                console.log(`Ingrediente não encontrado: ${ingredienteID}`);
                continue;
            }

            console.log(`Ingrediente ENCONTRADO: ${ingredienteID}`);

            id = ingrediente.id;
            if (relatorio[id] == undefined) {
                relatorio[id] = {
                    id: ingrediente.id,
                    nome: ingrediente.nome,
                    quantidade: 0,
                    lucro: 0,
                };
            }
            relatorio[id]["quantidade"] += pizza.quantidade;
            relatorio[id]["lucro"] += ingrediente.preco * pizza.quantidade;
        }
    }
};

const atualizarRelatorioPizzas = (relatorio, pizza) => {
    // Recebe um objeto contendo um relatório de pizzas e uma pizza,
    // e atualiza o relatório com a pizza recebida.
    id = pizza.id;
    if (!relatorio[id]) {
        relatorio[id] = {
            id: pizza.id,
            nome: pizza.nome,
            porcoes: 0,
            custo: 0,
        };
    }
    relatorio[id]["porcoes"] += pizza.quantidade;
    relatorio[id]["custo"] += pizza.preco * pizza.quantidade;
};

const atualizarRelatorioProdutos = (relatorio, produto) => {
    // Recebe um objeto contendo um relatório de produtos e um produto,
    // e atualiza o relatório com o produto recebido.
    id = produto.id;
    if (relatorio[id] == undefined) {
        relatorio[id] = {
            id: produto.id,
            nome: produto.nome,
            quantidade: 0,
            lucro: 0,
        };
    }
    relatorio[id]["quantidade"] += produto.quantidade;
    relatorio[id]["lucro"] += produto.preco * produto.quantidade;
};

const gerarRelatorios = async function (dataInicio, dataFim) {
    // Gera o relatório de ingredientes, pizzas e produtos dos pedidos entre duas datas.

    const pedidos = await getAllPedidos();
    const ingredientes = await getAllIngredientes();

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
                // Consolidar pizzas padrão
                atualizarRelatorioPizzas(relatorioPizzas, item);
            } else if (item.Metades) {
                // Consolidar ingredientes das pizzas customizadas
                // (pizzas customizadas têm o atributo Metades)
                console.log(Object.values(relatorioIngredientes).length);
                atualizarRelatorioIngredientes(
                    ingredientes,
                    relatorioIngredientes,
                    item
                );
            } else if (item.tipo === "produto") {
                atualizarRelatorioProdutos(relatorioProdutos, item);
            }
        }
    }

    return {
        ingredientes: Object.values(relatorioIngredientes).sort(
            (a, b) => b.quantidade - a.quantidade
        ),
        pizzas: Object.values(relatorioPizzas).sort(
            (a, b) => b.porcoes - a.porcoes
        ),
        produtos: Object.values(relatorioProdutos).sort(
            (a, b) => b.quantidade - a.quantidade
        ),
    };
};

module.exports = {
    gerarRelatorios,
};
