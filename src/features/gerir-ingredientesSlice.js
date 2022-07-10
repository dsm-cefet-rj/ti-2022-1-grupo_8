import { createSlice } from "@reduxjs/toolkit";

const geirIngredientesSlice = createSlice({
    name: "geirIngredientes",
    initialState: {
        ingredientes: [],
        idSelecinado: 0,
        nomeSelecinado: "",
        precoSelecinado: 0,
        descricaoSelecinado: "",
        pesoPorcaoSelecinado: 0,
    },
    reducers: {
        setIngredientes: (state, { payload }) => {
            state.ingredientes = payload;
        },
        setIdSelecinado: (state, { payload }) => {
            state.idSelecinado = payload.id;
        },
        setnomeSelecinado: (state, { payload }) => {
            state.nomeSelecinado = payload.nome;
        },
        setprecoSelecinado: (state, { payload }) => {
            state.precoSelecinado = payload.preco;
        },
        setdescricaoSelecinado: (state, { payload }) => {
            state.descricaoSelecinado = payload.descricao;
        },
        setpesoPorcaoSelecinado: (state, { payload }) => {
            state.pesoPorcaoSelecinado = payload.pesoPorcao;
        }
    },
});

export const {
    setIdSelecinado,
    setnomeSelecinado,
    setprecoSelecinado,
    setdescricaoSelecinado,
    setpesoPorcaoSelecinado,
} = geirIngredientesSlice.actions;

// para ser usado com o UseSelector
export const selectIngredientes = (state) => state.geirIngredientes.ingredientes;
export const selectId = (state) => state.gerirIngredientes.idSelecinado;
export const selectNome = (state) => state.gerirIngredientes.nomeSelecinado;
export const selectPreco = (state) => state.gerirIngredientes.precoSelecinado;
export const selectDescricao = (state) => state.gerirIngredientes.descricaoSelecinado;
export const selectPesoPorcao = (state) => state.gerirIngredientes.pesoPorcaoSelecinado;

const reducer = geirIngredientesSlice.reducer;
export default reducer;
