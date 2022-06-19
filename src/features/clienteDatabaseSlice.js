import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getSessionFromLocalStorage} from "./sessionSlice";
import axios from "axios";

export const fetchProdutos = createAsyncThunk(
    "clienteDatabase/fetchProdutos",
    async () => {
        const token = getSessionFromLocalStorage();
        const url = "http://localhost:3001/usuario/produtos";
        const response = await axios({
            method: "GET",
            url: url,
            headers: {
                "x-access-token": `Bearer ${token}`,
            },
        });
        return response.data;
    }
);

export const fetchIngredientes = createAsyncThunk(
    "clienteDatabase/fetchIngredientes",
    async () => {
        const token = getSessionFromLocalStorage();
        const url = "http://localhost:3001/usuario/ingredientes";
        const response = await axios({
            method: "GET",
            url: url,
            headers: {
                "x-access-token": `Bearer ${token}`,
            },
        });
        return response.data;
    }
);

export const fetchPizzas = createAsyncThunk(
    "clienteDatabase/fetchPizzas",
    async () => {
        const token = getSessionFromLocalStorage();
        const url = "http://localhost:3001/usuario/pizzas";
        const response = await axios({
            method: "GET",
            url: url,
            headers: {
                "x-access-token": `Bearer ${token}`,
            },
        });
        return response.data;
    }
);

const clienteDatabaseSlice = createSlice({
    name: "clienteDatabase",
    initialState: {
        ingredientes: [],
        pizzas: [],
        produtos: [],
    },
    extraReducers: {
        [fetchProdutos.fulfilled]: (state, action) => {
            state.produtos = action.payload;
        },
        [fetchIngredientes.fulfilled]: (state, action) => {
            state.ingredientes = action.payload;
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.pizzas = action.payload;
        },
    },
});

export const selectIngredientes = (state) =>
    state.clienteDatabaseSlice.ingredientes;

export const selectPizzas = (state) => state.clienteDatabaseSlice.pizzas;

export const selectProdutos = (state) => state.clienteDatabaseSlice.produtos;

export default clienteDatabaseSlice.reducer;
