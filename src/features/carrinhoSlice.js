import { createSlice } from "@reduxjs/toolkit";

// recupera os itens do localStorage
export const getFromLocalStorage = () => {
    const carrinho = localStorage.getItem("carrinho");
    if (carrinho) {
        return JSON.parse(carrinho);
    }
    return [];
}

const carrinhoSlice = createSlice({
    name: "carrinho",
    initialState: {
        itens: [],
    },
    reducers: {
        // redefine a lista de itens
        setCarrinho: (state, { payload }) => {
            state.itens = payload;
            // salva no localStorage
            localStorage.setItem("carrinho", JSON.stringify(state.itens));
        },
        // adiciona um item ao carrinho
        adicionarAoCarrinho: (state, { payload }) => {
            // Verificar se ja esta no carrinho
            if (!state.itens.find(item => item.id === payload.id)) {
                state.itens.push(payload);
                // salva no localStorage
                localStorage.setItem("carrinho", JSON.stringify(state.itens));
            }
        },
        // remove um item do carrinho
        removerDoCarrinho: (state, { payload }) => {
            state.itens = state.itens.filter(item => item.id !== payload);
            // salva no localStorage
            localStorage.setItem("carrinho", JSON.stringify(state.itens));
        },
        // carrega os itens do localStorage
        carregarCarrinho: (state) => {
            state.itens = getFromLocalStorage();
        }

    }
});

export const {
    setCarrinho,
    adicionarAoCarrinho,
    removerDoCarrinho,
    carregarCarrinho
} = carrinhoSlice.actions;

export const selectCarrinho = state => state.carrinho.itens;

const reducer = carrinhoSlice.reducer;
export default reducer;
