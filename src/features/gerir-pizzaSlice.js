import { createSlice } from "@reduxjs/toolkit";

const gerirPizzaSlice = createSlice({
    name: "gerirPizza",
    initialState: {
        idSelecionado: 0,
        nome: "",
        descricao: "",
        ingredientes: [],
    },
    reducers: {
        setIdSelecionado: (state, action) => {
            state.idSelecionado = action.payload;
        },
        setNome: (state, action) => {
            state.nome = action.payload;
        },
        setDescricao: (state, action) => {
            state.descricao = action.payload;
        },
        setIngredientes: (state, action) => {
            state.ingredientes = action.payload;
        },
        addIngrediente: (state, action) => {
            state.ingredientes.push(action.payload);
        },
        removeIngrediente: (state, action) => {
            state.ingredientes.splice(action.payload, 1);
        },
    },
});

export const {
    setIdSelecionado,
    setNome,
    setDescricao,
    setIngredientes,
    addIngrediente,
    removeIngrediente,
} = gerirPizzaSlice.actions;

// para ser usado com o UseSelector
export const selectIdSelecionado = (state) => state.gerirPizza.idSelecionado;
export const selectNome = (state) => state.gerirPizza.nome;
export const selectDescricao = (state) => state.gerirPizza.descricao;
export const selectIngredientesPizza = (state) => state.gerirPizza.ingredientes;

const reducer = gerirPizzaSlice.reducer;
export default reducer;
