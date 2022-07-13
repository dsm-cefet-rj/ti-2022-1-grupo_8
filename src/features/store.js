import { configureStore } from "@reduxjs/toolkit";
import carrinhoSlice from "./carrinhoSlice";
import clienteDatabaseSlice from "./clienteDatabaseSlice";
import criarPizzaSlice from "./criar-pizzaSlice";
import gerirIngredientesSlice from "./gerir-ingredientesSlice";
import ingredientesMetadeSlice from "./ingredientes-metadeSlice";
import sessionSlice from "./sessionSlice";
import pedidosClienteSlice from "./pedidos-clienteSlice";
import pedidosFuncionarioSlice from "./pedidos-funcionarioSlice";
import gerirPizzaSlice from "./gerir-pizzaSlice";
import gerirProdutosSlice from "./gerir-produtosSlice";
import relatorioSlice from "./relatorioSlice";

export default configureStore({
    reducer: {
        carrinho: carrinhoSlice,
        criarPizza: criarPizzaSlice,
        gerirIngredientes: gerirIngredientesSlice,
        ingredientesMetade: ingredientesMetadeSlice,
        clienteDatabaseSlice: clienteDatabaseSlice,
        session: sessionSlice,
        pedidosCliente: pedidosClienteSlice,
        pedidosFuncionario: pedidosFuncionarioSlice,
        gerirPizza: gerirPizzaSlice,
        gerirProdutos: gerirProdutosSlice,
        relatorio: relatorioSlice,
    },
});
