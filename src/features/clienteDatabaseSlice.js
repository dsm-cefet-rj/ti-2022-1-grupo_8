import { createSlice } from "@reduxjs/toolkit";

export const fetchProdutos = () => {
    let url = "http://localhost:3001/usuario/produtos";
    return fetch(url).then(response => response.json()).then(data => {
        console.log(data);
        return data;
    }).catch(error => {
        console.log(error);
    });
}

export const fetchIngredientes = () => {
    let url = "http://localhost:3001/usuario/ingredientes";
    return fetch(url).then(response => response.json()).then(data => {
        return data;
    }).catch(error => {
        console.log(error);
    });
}
export const fetchPizzas = () => {
    let url = "http://localhost:3001/usuario/pizzas";
    return fetch(url).then(response => response.json()).then(data => {
        return data;
    }).catch(error => {
        console.log(error);
    });
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
    },
});

export const { getIngredientes, getPizzas, getProdutos } =
    clienteDatabaseSlice.actions;

export const selectIngredientes = (state) => state.clienteDatabase.ingredientes;
export const selectPizzas = (state) => state.clienteDatabase.pizzas;
export const selectProdutos = (state) => state.clienteDatabase.produtos;

export default clienteDatabaseSlice.reducer;
