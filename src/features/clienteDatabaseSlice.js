import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const fetchProdutos = async () => {
    let url = "http://localhost:3001/usuario/produtos";
    const response = await axios.get(url);
    return response.data;
};

const fetchIngredientes = async () => {
    let url = "http://localhost:3001/usuario/ingredientes";
    const response = await axios.get(url);
    return response.data;
};

const fetchPizzas = async () => {
    let url = "http://localhost:3001/usuario/pizzas";
    const response = await axios.get(url);
    return response.data;
};

const clienteDatabaseSlice = createSlice({
    name: "clienteDatabase",
    initialState: {
        ingredientes: [],
        pizzas: [],
        produtos: [],
    },
    reducers: {
        getIngredientes: (state) => {
            state.ingredientes = fetchIngredientes();
        },
        getPizzas: (state) => {
            state.pizzas = fetchPizzas();
        },
        getProdutos: (state) => {
            state.produtos = fetchProdutos();
        },
    },
});

export const { getIngredientes, getPizzas, getProdutos } =
    clienteDatabaseSlice.actions;

export const selectIngredientes = (state) =>
    state.clienteDatabaseSlice.ingredientes;

export const selectPizzas = (state) => state.clienteDatabaseSlice.pizzas;

export const selectProdutos = (state) => state.clienteDatabaseSlice.produtos;

export default clienteDatabaseSlice.reducer;
