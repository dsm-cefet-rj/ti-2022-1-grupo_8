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

export const fazerPedido = createAsyncThunk( // função que faz o pedido do cliente
    "carrinho/fazerPedido",
    async () => {
        const token = getSessionFromLocalStorage();
        const url = "http://localhost:3001/usuario/fazer-pedido";
        const carinho = getFromLocalStorage();
        const body = {
            endereco: "Um endereço qualquer",
            carrinho: carinho,
        } 
        const response = await axios.post(url, body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
);

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
    },
    extraReducers: {
        [fazerPedido.fulfilled]: (state, action) => {
            state.itens = []; // limpa o carrinho
            saveToLocalStorage(state.itens);
        }
    }
});

export const {
    setCarrinho,
    adicionarAoCarrinho,
    removerDoCarrinho,
    carregarCarrinho,
} = carrinhoSlice.actions;

// para ser usado com o UseSelector
export const selectCarrinho = (state) => state.carrinho.itens;

const reducer = carrinhoSlice.reducer;
export default reducer;
