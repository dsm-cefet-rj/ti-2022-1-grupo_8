import { createSlice } from "@reduxjs/toolkit";

const gerirProdutosSlice = createSlice({
    name: "geirProdutos",
    initialState: {
        idSelecinado: 0,
        nome: "",
        preco: 0,
        descricao: "",
    },
    reducers: {
        setIdSelecinado: (state, action) => {
            state.idSelecinado = action.payload;
        },
        setNome: (state, action) => {
            state.nome = action.payload;
        },
        setPreco: (state, action) => {
            state.preco = action.payload;
        },
        setDescricao: (state, action) => {
            state.descricao = action.payload;
        },
    },
});

export const { setIdSelecinado, setNome, setPreco, setDescricao } =
    gerirProdutosSlice.actions;

// para ser usado com o UseSelector
export const selectIdSelecinado = (state) => state.gerirProdutos.idSelecinado;
export const selectNome = (state) => state.gerirProdutos.nome;
export const selectPreco = (state) => state.gerirProdutos.preco;
export const selectDescricao = (state) => state.gerirProdutos.descricao;

const reducer = gerirProdutosSlice.reducer;
export default reducer;
