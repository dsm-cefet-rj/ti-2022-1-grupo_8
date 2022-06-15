import { createSlice } from "@reduxjs/toolkit";

export const fetchProdutos = async () => {
    let url = "http://localhost:3001/usuario/produtos";
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    return data;
}

export const fetchIngredientes = async () => {
    let url = "http://localhost:3001/usuario/ingredientes";
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    return data;
}
export const fetchPizzas = async () => {
    let url = "http://localhost:3001/usuario/pizzas";
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    return data;
}


const clienteDatabaseSlice = createSlice({
    name: "clienteDatabase",
    initialState: {
        ingredientes: [],
        pizzas: [],
        produtos: []
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
        }
    },
});

export const { getIngredientes, getPizzas, getProdutos } = clienteDatabaseSlice.actions;

export const selectIngredientes = (state) => state.clienteDatabaseSlice.ingredientes;
export const selectPizzas = (state) => state.clienteDatabaseSlice.pizzas;
export const selectProdutos = (state) => state.clienteDatabaseSlice.produtos;

export default clienteDatabaseSlice.reducer;