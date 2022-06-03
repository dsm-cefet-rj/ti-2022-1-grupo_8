import { createSlice } from "@reduxjs/toolkit";

const ingredientesMetadeSlice = createSlice({
        name: "GerirPizza",
        initialState: {
                metades: [[], [], [], []],
        },
        reducers: {
                setMetades: (state, { payload }) => {
                        console.log(payload);
                        let id = payload.id;
                        let ingredientes = payload.ingredientes;
                        state.metades[id - 1] = ingredientes;
                },
                getMetades: (state) => {
                        return state.metades;
                },
        },
});

export const { setMetades, getMetades } = ingredientesMetadeSlice.actions;

export const selectMetades = (state) => state.GerirPizza.metades;

const reducer = ingredientesMetadeSlice.reducer;
export default reducer;
