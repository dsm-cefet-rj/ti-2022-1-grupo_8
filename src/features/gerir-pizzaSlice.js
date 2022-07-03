import { createSlice } from "@reduxjs/toolkit";

const gerirPizzaSlice = createSlice({
    name: "gerirPizza",
    initialState: {
        ingrediente: [],
    },
    reducers: {
        addIngrediente: (state, action) => {
            state.ingrediente.push(action.payload);
        },
        removeIngrediente: (state, action) => {
            state.ingrediente.splice(action.payload, 1);
        },
    },
});

export const { removeIngrediente, addIngrediente } = gerirPizzaSlice.actions;

export const selectGerirPizza = (state) => state.gerirPizza;

const reducer = gerirPizzaSlice.reducer;
export default reducer;
