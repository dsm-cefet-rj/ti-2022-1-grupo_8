import { configureStore } from "@reduxjs/toolkit";
import carrinhoSlice from "./carrinhoSlice";
import criarPizzaSlice from "./criar-pizzaSlice";
import gerirIngredientesSlice from "./gerir-ingredientesSlice";
import gerirPizzaSlice from "./gerir-pizzaSlice";

export default configureStore({
    reducer: {
        carrinho: carrinhoSlice,
        criarPizza: criarPizzaSlice,
        gerirIngredientes: gerirIngredientesSlice,
        gerirPizzaSlice: gerirPizzaSlice,
    },
});
