import { createSlice } from "@reduxjs/toolkit";

const carrinhoSlice = createSlice({
    name: "carrinho",
    initialState: {
        itens: [],
    },
    reducers: {
        setCarrinho: (state, { payload }) => {
            state.itens = payload;
        },
        adicionarAoCarrinho: (state, { payload }) => {
            state.itens.push(payload);
        },
    }
});

export const { setCarrinho, adicionarAoCarrinho } = carrinhoSlice.actions;

export const selectCarrinho = state => state.carrinho.itens;

const reducer = carrinhoSlice.reducer;
export default reducer;
