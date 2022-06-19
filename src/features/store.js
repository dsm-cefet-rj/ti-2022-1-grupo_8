import { configureStore } from "@reduxjs/toolkit";
import carrinhoSlice from "./carrinhoSlice";
import clienteDatabaseSlice from "./clienteDatabaseSlice";
import criarPizzaSlice from "./criar-pizzaSlice";
import gerirIngredientesSlice from "./gerir-ingredientesSlice";
import ingredientesMetadeSlice from "./ingredientes-metadeSlice";
import sessionSlice from "./sessionSlice";

export default configureStore({
    reducer: {
        carrinho: carrinhoSlice,
        criarPizza: criarPizzaSlice,
        gerirIngredientes: gerirIngredientesSlice,
        ingredientesMetade: ingredientesMetadeSlice,
        clienteDatabaseSlice: clienteDatabaseSlice,
        session: sessionSlice,
    },
});
