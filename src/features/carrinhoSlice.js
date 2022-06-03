import { createSlice } from "@reduxjs/toolkit";

// recupera os itens do localStorage
export const getFromLocalStorage = () => {
  const carrinho = localStorage.getItem("carrinho");
  if (carrinho) {
    return JSON.parse(carrinho);
  }
  return [];
};

// salva os itens no localStorage
export const saveToLocalStorage = (carrinho) => {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
};

const carrinhoSlice = createSlice({
  name: "carrinho",
  initialState: {
    itens: [],
  },
  reducers: {
    // redefine a lista de itens
    setCarrinho: (state, { payload }) => {
      state.itens = payload;
      // salva no localStorage
      saveToLocalStorage(carrinho);
    },
    // adiciona um item ao carrinho
    adicionarAoCarrinho: (state, { payload }) => {
      //Carrega o carrinho do localStorage
      let carrinho = getFromLocalStorage();
      // Verificar se ja esta no carrinho
      if (!state.itens.find((item) => item.id === payload.id)) {
        // Adiciona o item ao carrinho
        carrinho.push(payload);
        // Salva no localStorage
        saveToLocalStorage(carrinho);
        // Atualiza o estado
        state.itens = carrinho;
      }
    },
    // remove um item do carrinho
    removerDoCarrinho: (state, { payload }) => {
      //Carrega o carrinho do localStorage
      let carrinho = getFromLocalStorage();
      // Remove o item do carrinho
      carrinho = carrinho.filter((item) => item.id !== payload.id);
      // Salva no localStorage
      saveToLocalStorage(carrinho);
      // Atualiza o estado
      state.itens = carrinho;
    },
    // carrega os itens do localStorage
    carregarCarrinho: (state) => {
      state.itens = getFromLocalStorage();
    },
  },
});

export const {
  setCarrinho,
  adicionarAoCarrinho,
  removerDoCarrinho,
  carregarCarrinho,
} = carrinhoSlice.actions;

export const selectCarrinho = (state) => state.carrinho.itens;

const reducer = carrinhoSlice.reducer;
export default reducer;
