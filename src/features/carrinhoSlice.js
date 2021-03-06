import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getSessionFromLocalStorage } from "./sessionSlice";

// recupera os itens do localStorage
export const getFromLocalStorage = () => {
    const carrinho = localStorage.getItem("carrinho");
    if (carrinho) {
        return JSON.parse(carrinho);
    }
    return [];
};

// salva os itens no localStorage
export const saveToLocalStorage = (carrinho) => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
};

export const fazerPedido = createAsyncThunk(
    // função que faz o pedido do cliente
    "carrinho/fazerPedido",
    async (arg, { getState }) => {
        const state = getState();
        const token = getSessionFromLocalStorage();
        const url = "http://localhost:3001/usuario/fazer-pedido";
        const carinho = getFromLocalStorage();
        const endereco = state.carrinho.endereco;
        const body = {
            endereco: endereco,
            carrinho: carinho,
        };
        const response = await axios(url, {
            method: "PUT",
            headers: {
                "x-access-token": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            data: body,
        });
        return response.data;
    }
);

const carrinhoSlice = createSlice({
    name: "carrinho",
    initialState: {
        itens: [],
        endereco: "",
    },
    reducers: {
        // redefine a lista de itens
        setCarrinho: (state, { payload }) => {
            state.itens = payload;
            // salva no localStorage
            saveToLocalStorage(state.itens);
        },
        // adiciona um item ao carrinho
        adicionarAoCarrinho: (state, { payload }) => {
            //Carrega o carrinho do localStorage
            let carrinho = getFromLocalStorage();
            // Verificar se ja esta no carrinho
            if (!state.itens.find((item) => item.id === payload.id)) {
                // Adiciona o item ao carrinho
                carrinho.push(payload);
                // Salva no localStorage
                saveToLocalStorage(carrinho);
                // Atualiza o estado
                state.itens = carrinho;
            }
        },
        // remove um item do carrinho
        removerDoCarrinho: (state, { payload }) => {
            //Carrega o carrinho do localStorage
            let carrinho = getFromLocalStorage();
            // Remove o item do carrinho
            carrinho = carrinho.filter((item) => item.id !== payload.id);
            // Salva no localStorage
            saveToLocalStorage(carrinho);
            // Atualiza o estado
            state.itens = carrinho;
        },
        // carrega os itens do localStorage
        carregarCarrinho: (state) => {
            state.itens = getFromLocalStorage();
        },
        // define o endereço do cliente
        setEndereco: (state, { payload }) => {
            state.endereco = payload;
        },
    },
    extraReducers: {
        [fazerPedido.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.itens = []; // limpa o carrinho
            state.endereco = ""; // limpa o endereço
            saveToLocalStorage(state.itens);
            // Redireciona para a página de pedidos
            window.location.href = "/meus-pedidos";
        },
    },
});

export const {
    setCarrinho,
    adicionarAoCarrinho,
    removerDoCarrinho,
    carregarCarrinho,
    setEndereco,
} = carrinhoSlice.actions;

// para ser usado com o UseSelector
export const selectCarrinho = (state) => state.carrinho.itens;

const reducer = carrinhoSlice.reducer;
export default reducer;
