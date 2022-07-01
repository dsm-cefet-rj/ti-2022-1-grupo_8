import { createSlice } from "@reduxjs/toolkit";

const gerirPizzaSlice = createSlice({
    name: "gerirPizza",
    initialState: {
        ingrediente: [],
    },
    reducers: {
        setMetades: (state, { payload }) => {
            state.ingrediente = payload;
        },
    },
});

export const { setMetades } = gerirPizzaSlice.actions;

export const selectGerirPizza = (state) => state.gerirPizza;

const reducer = gerirPizzaSlice.reducer;
export default reducer;
