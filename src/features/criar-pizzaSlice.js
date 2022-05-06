import { createSlice } from "@reduxjs/toolkit";

const criarPizzaSlice = createSlice({
    name: "criarPizza",
    initialState: {
        QuantidadeDeQueijo:0,
        QuantidadeDeMolho:0,
        tamanho: "",
        metades:[],
    },
    reducers: {
        setQuantidadeDeQueijo: (state, { payload }) => {
            state.QuantidadeDeQueijo = payload;
        },
        setQuantidadeDeMolho: (state, { payload }) => {
            state.QuantidadeDeMolho = payload;
        },
        setTamanho: (state, { payload }) => {
            state.tamanho = payload;
        },
        setMetades: (state, { payload }) => {
            state.metades = payload;
        },
    }
});

export const { setQuantidadeDeQueijo, setQuantidadeDeMolho, setTamanho, setMetades } = criarPizzaSlice.actions;

export const selectCriarPizza = state => state.criarPizza;

const reducer = criarPizzaSlice.reducer;
export default reducer;
