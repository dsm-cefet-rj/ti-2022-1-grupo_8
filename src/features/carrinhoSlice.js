import { createSlice } from "@reduxjs/toolkit";

const carrinhoSlice = createSlice({
    name: "carrinho",
    initialState: {
        itens: [],
    },
    reducers: {
        adicionarAoCarrinho: (state, {payload}) => {
            state.itens.push(payload);
        },
        removerDoCarrinho: (state, {payload}) => {
            state.itens = state.itens.filter(item => item.id !== payload.id);
        },
        limparCarrinho: (state) => {
            state.itens = [];
        },
        getItensCarrinho: (state) => {
            return state.itens;
        }
    }
});

export const {
    adicionarAoCarrinho,
    removerDoCarrinho,
    limparCarrinho,
    getItensCarrinho } = carrinhoSlice.actions;

const reducer = carrinhoSlice.reducer;
export default reducer;
