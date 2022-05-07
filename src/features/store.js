import { configureStore } from "@reduxjs/toolkit";
import carrinhoSlice from "./carrinhoSlice";
import criarPizzaSlice from "./criar-pizzaSlice";
import geirIngredientesSlice from "./geir-ingredientesSlice";

export default configureStore({
    reducer: {
        carrinho: carrinhoSlice,
        criarPizza: criarPizzaSlice,
        geirIngredientes: geirIngredientesSlice,
    },
});
