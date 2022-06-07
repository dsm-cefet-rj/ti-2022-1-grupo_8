import { createSlice } from "@reduxjs/toolkit";

const geirIngredientesSlice = createSlice({
    name: "geirIngredientes",
    initialState: {
        ingredientes: [],
        idSelecinado: 0,
    },
    reducers: {
        setIngredientes: (state, { payload }) => {
            state.ingredientes = payload;
        },
        setIdSelecinado: (state, { payload }) => {
            state.idSelecinado = payload.id;
        },
    },
});

export const { setIngredientes, setIdSelecinado } =
    geirIngredientesSlice.actions;

// para ser usado com o UseSelector
export const selectIngredientes = (state) =>
    state.geirIngredientes.ingredientes;
export const selectId = (state) => state.gerirIngredientes.idSelecinado;
const reducer = geirIngredientesSlice.reducer;
export default reducer;
