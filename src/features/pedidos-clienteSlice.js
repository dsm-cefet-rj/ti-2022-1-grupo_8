import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getSessionFromLocalStorage } from "./sessionSlice";

export const fetchPedidos = createAsyncThunk(
    // função que busca os pedidos do cliente
    "pedidosCliente/fetchPedidos",
    async () => {
        const token = getSessionFromLocalStorage();
        const url = "http://localhost:3001/usuario/pedidos";
        const response = await axios.get(url, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
);

const pedidosClienteSlice = createSlice({
    name: "pedidosCliente",
    initialState: {
        pedidos: [],
    },
    extraReducers: {
        [fetchPedidos.fulfilled]: (state, action) => {
            state.pedidos = action.payload;
        },
    },
});

export const selectPedidos = (state) => state.pedidosCliente.pedidos;

const reducer = pedidosClienteSlice.reducer;

export default reducer;
