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

// para ser usado com o UseSelector
export const selectMetades = (state) => state.ingredientesMetade.metades;
export const selectMetade = (state, id) => state.ingredientesMetade.metades[id];
export const selectId = (state) => state.ingredientesMetade.idSelecinado;

const reducer = ingredientesMetadeSlice.reducer;
export default reducer;
