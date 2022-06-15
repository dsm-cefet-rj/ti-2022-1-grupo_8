import { createSlice } from "@reduxjs/toolkit";

export const fetchProdutos = () => {
    let url = "http://localhost:3001/usuario/produtos/json";
    let produtos = [];
    fetch(url).then(response => response.json()).then(data => {
        produtos = data;
    });
    return produtos;
}

export const fetchIngredientes = () => {
    let url = "http://localhost:3001/usuario/ingredientes";
    let ingredientes = [];
    fetch(url).then(response => response.json()).then(data => {
        return data;
    });
    return ingredientes;
}
export const fetchPizzas = () => {
    let url = "http://localhost:3001/usuario/pizzas";
    let pizzas = [];
    fetch(url).then(response => response.json()).then(data => {
        pizzas = data;
    });
    return pizzas;
}


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
    }
});

export const { getIngredientes, getPizzas, getProdutos } = clienteDatabaseSlice.actions;



export const selectIngredientes = state => state.clienteDatabase.ingredientes;
export const selectPizzas = state => state.clienteDatabase.pizzas;
export const selectProdutos = state => state.clienteDatabase.produtos;

export default clienteDatabaseSlice.reducer;
