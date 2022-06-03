import { createSlice } from "@reduxjs/toolkit";

const criarPizzaSlice = createSlice({
        name: "criarPizza",
        initialState: {
                tamanho: "",
                metades: [],
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
        },
});

export const { setTamanho, setMetades } = criarPizzaSlice.actions;

export const selectCriarPizza = (state) => state.criarPizza;

const reducer = criarPizzaSlice.reducer;
export default reducer;
