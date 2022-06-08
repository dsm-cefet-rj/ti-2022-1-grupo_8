import { createSlice } from "@reduxjs/toolkit";

//store.js
// Banco de dados falso

let ingredientes = [
    {
        id: 1,
        imagem: "imgs/igrediente/molho_de_tomate.jpg",
        nome: "Molho",
        preco: 0.6,
        usados: 15,
        descricao: "Molho - 0.75",
        pesoPorcao: 53,
    },
    {
        id: 2,
        imagem: "imgs/igrediente/queijo-musssarela.jpg",
        nome: "Queijo",
        preco: 0.52,
        usados: 16,
        descricao: "Queijo - 0.75",
        pesoPorcao: 29,
    },
    {
        id: 3,
        imagem: "imgs/igrediente/Calabresa.jpg",
        nome: "Calabresa",
        preco: 0.99,
        usados: 18,
        descricao: "Calabresa - 6.45",
        pesoPorcao: 86,
    },
    {
        id: 4,
        imagem: "imgs/igrediente/Presunto.jpg",
        nome: "Presunto",
        preco: 0.78,
        usados: 35,
        descricao: "Presunto - 8.5",
        pesoPorcao: 90,
    },
    {
        id: 5,
        imagem: "imgs/igrediente/Camarao.webp",
        nome: "Camarão",
        preco: 0.81,
        usados: 20,
        descricao: "Camarão - 4.86",
        pesoPorcao: 18,
    },
    {
        id: 6,
        imagem: "imgs/igrediente/Alho.jpg",
        nome: "Alho",
        preco: 0.92,
        usados: 92,
        descricao: "Alho - 4.75",
        pesoPorcao: 22,
    },
    {
        id: 7,
        imagem: "imgs/igrediente/Ovo.jpg",
        nome: "Ovo",
        preco: 0.82,
        usados: 13,
        descricao: "Ovo - 5.32",
        pesoPorcao: 95,
    },
    {
        id: 8,
        imagem: "imgs/igrediente/Azeitona verde.webp",
        nome: "Azeitona verde",
        preco: 0.85,
        usados: 1,
        descricao: "Azeitona verde - 5.86",
        pesoPorcao: 9,
    },
    {
        id: 9,
        imagem: "imgs/igrediente/Azeitona preta.jpg",
        nome: "Azeitona preta",
        preco: 0.55,
        usados: 13,
        descricao: "Azeitona preta - 4",
        pesoPorcao: 80,
    },
    {
        id: 10,
        imagem: "imgs/igrediente/Tomate.jpg",
        nome: "Tomate",
        preco: 0.95,
        usados: 23,
        descricao: "Tomate - 4.5",
        pesoPorcao: 67,
    },
    {
        id: 11,
        imagem: "imgs/igrediente/Cebola.png",
        nome: "Cebola",
        preco: 0.69,
        usados: 39,
        descricao: "Cebola - 2",
        pesoPorcao: 98,
    },
    {
        id: 12,
        imagem: "imgs/igrediente/Frango desfiado.jpg",
        nome: "Frango desfiado",
        preco: 0.62,
        usados: 79,
        descricao: "Frango desfiado - 7.99",
        pesoPorcao: 82,
    },
    {
        id: 13,
        imagem: "imgs/igrediente/Requeijão.jpg",
        nome: "Requeijão",
        preco: 0.92,
        usados: 77,
        descricao: "Requeijão - 5",
        pesoPorcao: 81,
    },
    {
        id: 14,
        imagem: "imgs/igrediente/Pimentão verde.webp",
        nome: "Pimentão verde",
        preco: 0.51,
        usados: 23,
        descricao: "Pimentão verde - 5.66",
        pesoPorcao: 66,
    },
    {
        id: 15,
        imagem: "imgs/igrediente/Manjericão.jpg",
        nome: "Manjericão",
        preco: 0.72,
        usados: 47,
        descricao: "Manjericão - 6.6",
        pesoPorcao: 88,
    },
    {
        id: 16,
        imagem: "imgs/igrediente/Bacon.webp",
        nome: "Bacon",
        preco: 0.86,
        usados: 16,
        descricao: "Bacon - 5",
        pesoPorcao: 21,
    },
    {
        id: 17,
        imagem: "imgs/igrediente/Brócolis.jpg.crdownload",
        nome: "Brócolis",
        preco: 0.6,
        usados: 25,
        descricao: "Brócolis - 6",
        pesoPorcao: 78,
    },
    {
        id: 18,
        imagem: "imgs/igrediente/Pepperoni.webp",
        nome: "Pepperoni",
        preco: 0.64,
        usados: 23,
        descricao: "Pepperoni - 8.55",
        pesoPorcao: 46,
    },
];

let pizzas = [
    {
        nome: "Calabresa",
        descricao:
            "Deliciosa pizza com molho de tomate, mussarela, calabresa, azeitona e orégano.",
        imagem: "/imgs/pizza-calabresa.jpg",
        quant_queijo: 1.0,
        quant_molho: 1.0,
        id: 0,
        ingredientes: [0],
        quant_comprada: 175,
    },
    {
        nome: "Pizza de Mussarela",
        descricao:
            "Básica mas ainda gostosa, pizza com molho de tomate, mussarela e orégano.",
        imagem: "/imgs/pizza-mussarela.webp",
        quant_queijo: 1.0,
        quant_molho: 1.0,
        id: 1,
        ingredientes: [5],
        quant_comprada: 142,
    },
    {
        nome: "Da Casa",
        descricao:
            "Sabor original da pizzaria, contendo molho de tomate, mussarela, peperoni, cebola e pimentão verde.",
        imagem: "/imgs/pizza-da-casa.webp",
        quant_queijo: 1.0,
        quant_molho: 1.0,
        id: 2,
        ingredientes: [15, 6, 7, 8, 11],
        quant_comprada: 120,
    },
    {
        nome: "Frango com Requeijão",
        descricao:
            "A mais querida! Pizza com molho de tomate, frango desfiado, queijo, requeijão e orégano",
        imagem: "/imgs/Frango com Requeijão.jpeg",
        quant_queijo: 1.0,
        quant_molho: 1.0,
        id: 3,
        ingredientes: [9, 10, 14, 15],
        quant_comprada: 115,
    },
    {
        nome: "Brócolis",
        descricao:
            "Deliciosa pizza com molho de tomate, mussarela, brócolis e orégano.",
        imagem: "/imgs/brocolis.jpg",
        quant_queijo: 1.0,
        quant_molho: 1.0,
        id: 4,
        ingredientes: [14, 15, 6],
        quant_comprada: 45,
    },
    {
        nome: "Brócolis com Alho",
        descricao:
            "Deliciosa pizza com molho de tomate, mussarela, brócolis, alho e orégano.",
        imagem: "/imgs/brocolis e alho.jpeg",
        quant_queijo: 1.0,
        quant_molho: 1.0,
        id: 5,
        ingredientes: [14, 15, 3],
        quant_comprada: 75,
    },
    {
        nome: "Margherita",
        descricao:
            "Deliciosa pizza com molho de tomate, mussarela de búfala, manjericão, queijo parmesão ralado, tomates e azeite.",
        imagem: "/imgs/Margherita.jpg",
        quant_queijo: 1.0,
        quant_molho: 1.0,
        id: 6,
        ingredientes: [5, 14, 15, 11],
        quant_comprada: 74,
    },
    {
        nome: "Bacon",
        descricao:
            "Deliciosa pizza com molho de tomate, mussarela, bacon e orégano.",
        imagem: "/imgs/bacon.jpg",
        quant_queijo: 1.0,
        quant_molho: 1.0,
        id: 7,
        ingredientes: [13, 14, 15],
        quant_comprada: 76,
    },
    {
        nome: "Portuguesa",
        descricao:
            "Uma pizza com calabresa, tomates, mussarela, cebolas e azeitonas pretas.",
        imagem: "/imgs/Portuguesa.jpg",
        quant_queijo: 1.0,
        quant_molho: 1.0,
        id: 8,
        ingredientes: [0, 6, 7, 8, 11],
        quant_comprada: 23,
    },
    {
        nome: "Napolitana",
        descricao:
            "Deliciosa pizza com molho de tomate, mussarela e manjericão.",
        imagem: "/imgs/pizza-napolitana.jpg",
        quant_queijo: 1.0,
        quant_molho: 1.0,
        id: 9,
        ingredientes: [5, 14, 15],
        quant_comprada: 85,
    },
    {
        nome: "4 Queijos",
        descricao:
            "Deliciosa pizza com molho de tomate, mussarela, gorgonzola, requeijão e parmesão.",
        imagem: "/imgs/4 Queijos.webp",
        quant_queijo: 1.0,
        quant_molho: 1.0,
        id: 10,
        ingredientes: [5, 14, 15, 6, 11],
        quant_comprada: 56,
    },
    {
        nome: "Tropical",
        descricao: "Deliciosa pizza com mussarela, camarão, bacon e abacaxi.",
        imagem: "/imgs/Tropical.jpg",
        quant_queijo: 1.0,
        quant_molho: 1.0,
        id: 11,
        ingredientes: [5, 13, 14, 15],
        quant_comprada: 14,
    },
];

let produtos = [
    {
        nome: "Coca Cola 2L",
        descricao: "Refrigerante sabor cola de 2L.",
        imagem: "imgs/coca-cola.webp",
        preco: 8.0,
        id: 100,
        quant_comprada: 125,
    },
    {
        nome: "Fanta Laranja 2L",
        descricao: "Refrigerante sabor laranja de 2L.",
        imagem: "imgs/fanta.webp",
        preco: 8.0,
        id: 102,
        quant_comprada: 125,
    },
    {
        nome: "Guaraná 2L",
        descricao: "Refrigerante sabor guaraná de 2L.",
        imagem: "imgs/guarana.webp",
        preco: 8.0,
        id: 103,
        quant_comprada: 125,
    },
];

const getPizzasUsuario = () => {
    return pizzas.map((pizza) => {
        let preco = 0;
        for (let i = 0; i < pizza.ingredientes.length; i++) {
            preco += ingredientes[pizza.ingredientes[i]].preco;
        }
        preco += 20;
        return {
            nome: pizza.nome,
            descricao: pizza.descricao,
            imagem: pizza.imagem,
            preco: preco,
            id: pizza.id,
            ingredientes: pizza.ingredientes,
            quant_comprada: pizza.quant_comprada,
        };
    });
};

const produtosSlice = createSlice({
    name: "produtos",
    initialState: {
        pizzas: [],
        produtos: [],
        ingredientes: [],
    },
    reducers: {
        setPizzas: (state, action) => {
            state.pizzas = action.payload;
        },
        setProdutos: (state, action) => {
            state.produtos = action.payload;
        },
        setIngredientes: (state, action) => {
            state.ingredientes = action.payload;
        },
        getPizzasUsuario: (state, action) => {
            state.pizzas = getPizzasUsuario();
        },
        getProdutosUsuario: (state, action) => {
            state.produtos = produtos;
        },
        getIngredientesUsuario: (state, action) => {
            state.ingredientes = ingredientes;
        },
        getPizzas: (state, action) => {
            state.pizzas = pizzas;
        },
        getProdutos: (state, action) => {
            state.produtos = produtos;
        },
        getIngredientes: (state, action) => {
            state.ingredientes = ingredientes;
        },
        addPizza: (state, action) => {
            state.pizzas.push(action.payload);
        },
        addProduto: (state, action) => {
            state.produtos.push(action.payload);
        },
        addIngrediente: (state, action) => {
            state.ingredientes.push(action.payload);
        },
    },
});

export const {
    setPizzas,
    setProdutos,
    setIngredientes,
    getPizzasUsuario,
    getProdutosUsuario,
    getIngredientesUsuario,
    getPizzas,
    getProdutos,
    getIngredientes,
    addPizza,
    addProduto,
    addIngrediente,
} = produtosSlice.actions;

const reducer = produtosSlice.reducer;
export default reducer;