import { configureStore } from "@reduxjs/toolkit";
import carrinhoSlice from "./carrinhoSlice";
import criarPizzaSlice from "./criar-pizzaSlice";


export default configureStore({
    reducer: {
        carrinho: carrinhoSlice,
        criarPizza: criarPizzaSlice,
    },
});
