import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getSessionFromLocalStorage } from "./sessionSlice";

export const fetchRelatorio = createAsyncThunk(
    // função que solicita os relatórios
    "relatorio/fetchRelatorio",
    async () => {
        const token = getSessionFromLocalStorage();
        const url = "http://localhost:3001/admin/relatorios";
        const response = await axios.get(url, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
);

const relatorioSlice = createSlice({
    name: "relatorio",
    initialState: {
        produtos: [],
        ingredientes: [],
        pizzas: [],
    },
    extraReducers: {
        [fetchRelatorio.fulfilled]: (state, action) => {
            state.produtos = action.payload.produtos;
            state.ingredientes = action.payload.ingredientes;
            state.pizzas = action.payload.pizzas;
        },
    },
});

export const selectRelatorio = (state) => state.relatorio;

const reducer = relatorioSlice.reducer;

export default reducer;
