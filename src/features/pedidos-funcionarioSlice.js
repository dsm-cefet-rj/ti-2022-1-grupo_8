import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getSessionFromLocalStorage } from "./sessionSlice";

export const fetchPedidosFeitos = createAsyncThunk(
    // função que busca os pedidos feitos
    "pedidosFuncionario/fetchPedidosFeitos",
    async () => {
        const token = getSessionFromLocalStorage();
        const url = "http://localhost:3001/funcionario/pedidos/feitos";
        const response = await axios.get(url, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
);

export const fetchPedidosEmAndamento = createAsyncThunk(
    // função que busca os pedidos em andamento
    "pedidosFuncionario/fetchPedidosEmAndamento",
    async () => {
        const token = getSessionFromLocalStorage();
        const url = "http://localhost:3001/funcionario/pedidos/em-andamento";
        const response = await axios.get(url, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
);

export const fetchPedidosConcluidos = createAsyncThunk(
    // função que busca os pedidos em andamento
    "pedidosFuncionario/fetchPedidosConcluidos",
    async () => {
        const token = getSessionFromLocalStorage();
        const url = "http://localhost:3001/funcionario/pedidos/concluidos";
        const response = await axios.get(url, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
);

const pedidosFuncionarioSlice = createSlice({
    name: "pedidosFuncionario",
    initialState: {
        feitos: [],
        emAndamento: [],
        concluidos: [],
    },
    extraReducers: {
        [fetchPedidosFeitos.fulfilled]: (state, action) => {
            state.feitos = action.payload;
        },
        [fetchPedidosEmAndamento.fulfilled]: (state, action) => {
            state.emAndamento = action.payload;
        },
        [fetchPedidosConcluidos.fulfilled]: (state, action) => {
            state.concluidos = action.payload;
        },
    },
});

export const selectPedidosFeitos = (state) => state.pedidosFuncionario.feitos;
export const selectPedidosEmAndamento = (state) =>
    state.pedidosFuncionario.emAndamento;
export const selectPedidosConcluidos = (state) =>
    state.pedidosFuncionario.concluidos;

const reducer = pedidosFuncionarioSlice.reducer;

export default reducer;
