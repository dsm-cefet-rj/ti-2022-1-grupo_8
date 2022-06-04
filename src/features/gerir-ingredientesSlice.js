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
            state.idSelecinado = payload;
        },
    },
});

export const { setIngredientes, setIdSelecinado } =
    geirIngredientesSlice.actions;

const reducer = geirIngredientesSlice.reducer;
export default reducer;
