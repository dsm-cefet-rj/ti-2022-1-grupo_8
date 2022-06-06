import { createSlice } from "@reduxjs/toolkit";

const ingredientesMetadeSlice = createSlice({
    name: "GerirPizza",
    initialState: {
        metades: [[], [], [], []],
    },
    reducers: {
        setMetades: (state, { payload }) => {
            let id = payload.id;
            let ingredientes = payload.ingredientes;
            state.metades[id] = ingredientes;
        },
    },
});

export const { setMetades } = ingredientesMetadeSlice.actions;

export const selectMetades = (state) => state.ingredientesMetade.metades;

const reducer = ingredientesMetadeSlice.reducer;
export default reducer;
