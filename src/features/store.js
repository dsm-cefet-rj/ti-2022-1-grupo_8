import { configureStore } from "@reduxjs/toolkit";
import carrinhoSlice from "./carrinhoSlice";
import criarPizzaSlice from "./criar-pizzaSlice";
import gerirIngredientesSlice from "./gerir-ingredientesSlice";
import ingredientesMetadeSlice from "./ingredientes-metadeSlice";

export default configureStore({
        reducer: {
                carrinho: carrinhoSlice,
                criarPizza: criarPizzaSlice,
                gerirIngredientes: gerirIngredientesSlice,
                ingredientesMetade: ingredientesMetadeSlice,
        },
});
