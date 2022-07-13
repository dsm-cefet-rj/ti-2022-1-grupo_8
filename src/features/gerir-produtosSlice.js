import { createSlice } from "@reduxjs/toolkit";

const geirProdutosSlice = createSlice({
    name: "geirProdutos",
    initialState: {
        idSelecinado: 0,
        nome: "",
        ingredientes: [],
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
        setIngredientes: (state, action) => {
            state.ingredientes = action.payload;
        },
        setPreco: (state, action) => {
            state.preco = action.payload;
        },
        setDescricao: (state, action) => {
            state.descricao = action.payload;
        },
    },
});

export const { setIdSelecinado,
    setNome,
    setIngredientes,
    setPreco,
    setDescricao } = geirProdutosSlice.actions;

// para ser usado com o UseSelector
export const selectIdSelecinado = state => state.geirProdutos.idSelecinado;
export const selectNome = state => state.geirProdutos.nome;
export const selectIngredientes = state => state.geirProdutos.ingredientes;
export const selectPreco = state => state.geirProdutos.preco;
export const selectDescricao = state => state.geirProdutos.descricao;

const reducer = geirProdutosSlice.reducer;
export default reducer;
