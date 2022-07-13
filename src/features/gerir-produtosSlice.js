import { createSlice } from "@reduxjs/toolkit";

const geirProdutosSlice = createSlice({
    name: "geirProdutos",
    initialState: {
        ingredientes: [],
        idSelecinado: 0,
    },
    reducers: {
        setProdutos: (state, { payload }) => {
            state.ingredientes = payload;
        },
        setIdSelecinado: (state, { payload }) => {
            state.idSelecinado = payload.id;
        },
    },
});

export const { setIngredientes, setIdSelecinado } = geirProdutosSlice.actions;

// para ser usado com o UseSelector
export const selectIngredientes = (state) => state.geirProdutos.produtos;
export const selectId = (state) => state.geirProdutos.idSelecinado;
const reducer = geirIngredientesSlice.reducer;
export default reducer;
