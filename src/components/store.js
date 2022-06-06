//store.js
// Banco de dados falso

let ingredientes = [
    {
        "id": 1,
        "imagem": "imgs/igrediente/molho_de_tomate.jpg",
        "nome": "Molho",
        "preco": 66,
        "usados": 44,
        "descricao": "Molho - 0.75",
        "pesoPorcao": 22
    },
    {
        "id": 2,
        "imagem": "imgs/igrediente/queijo-musssarela.jpg",
        "nome": "Queijo",
        "preco": 34,
        "usados": 13,
        "descricao": "Queijo - 0.75",
        "pesoPorcao": 67
    },
    {
        "id": 3,
        "imagem": "imgs/igrediente/Calabresa.jpg",
        "nome": "Calabresa",
        "preco": 84,
        "usados": 95,
        "descricao": "Calabresa - 6.45",
        "pesoPorcao": 70
    },
    {
        "id": 4,
        "imagem": "imgs/igrediente/Presunto.jpg",
        "nome": "Presunto",
        "preco": 67,
        "usados": 71,
        "descricao": "Presunto - 8.5",
        "pesoPorcao": 22
    },
    {
        "id": 5,
        "imagem": "imgs/igrediente/Camarao.webp",
        "nome": "Camarão",
        "preco": 6,
        "usados": 78,
        "descricao": "Camarão - 4.86",
        "pesoPorcao": 61
    },
    {
        "id": 6,
        "imagem": "imgs/igrediente/Alho.jpg",
        "nome": "Alho",
        "preco": 23,
        "usados": 93,
        "descricao": "Alho - 4.75",
        "pesoPorcao": 39
    },
    {
        "id": 7,
        "imagem": "imgs/igrediente/Ovo.jpg",
        "nome": "Ovo",
        "preco": 79,
        "usados": 82,
        "descricao": "Ovo - 5.32",
        "pesoPorcao": 15
    },
    {
        "id": 8,
        "imagem": "imgs/igrediente/Azeitona verde.webp",
        "nome": "Azeitona verde",
        "preco": 52,
        "usados": 17,
        "descricao": "Azeitona verde - 5.86",
        "pesoPorcao": 51
    },
    {
        "id": 9,
        "imagem": "imgs/igrediente/Azeitona preta.jpg",
        "nome": "Azeitona preta",
        "preco": 45,
        "usados": 45,
        "descricao": "Azeitona preta - 4",
        "pesoPorcao": 68
    },
    {
        "id": 10,
        "imagem": "imgs/igrediente/Tomate.jpg",
        "nome": "Tomate",
        "preco": 58,
        "usados": 17,
        "descricao": "Tomate - 4.5",
        "pesoPorcao": 2
    },
    {
        "id": 11,
        "imagem": "imgs/igrediente/Cebola.png",
        "nome": "Cebola",
        "preco": 90,
        "usados": 94,
        "descricao": "Cebola - 2",
        "pesoPorcao": 28
    },
    {
        "id": 12,
        "imagem": "imgs/igrediente/Frango desfiado.jpg",
        "nome": "Frango desfiado",
        "preco": 4,
        "usados": 26,
        "descricao": "Frango desfiado - 7.99",
        "pesoPorcao": 95
    },
    {
        "id": 13,
        "imagem": "imgs/igrediente/Requeijão.jpg",
        "nome": "Requeijão",
        "preco": 92,
        "usados": 97,
        "descricao": "Requeijão - 5",
        "pesoPorcao": 26
    },
    {
        "id": 14,
        "imagem": "imgs/igrediente/Pimentão verde.webp",
        "nome": "Pimentão verde",
        "preco": 51,
        "usados": 55,
        "descricao": "Pimentão verde - 5.66",
        "pesoPorcao": 8
    },
    {
        "id": 15,
        "imagem": "imgs/igrediente/Manjericão.jpg",
        "nome": "Manjericão",
        "preco": 74,
        "usados": 11,
        "descricao": "Manjericão - 6.6",
        "pesoPorcao": 82
    },
    {
        "id": 16,
        "imagem": "imgs/igrediente/Bacon.webp",
        "nome": "Bacon",
        "preco": 55,
        "usados": 5,
        "descricao": "Bacon - 5",
        "pesoPorcao": 4
    },
    {
        "id": 17,
        "imagem": "imgs/igrediente/Brócolis.jpg.crdownload",
        "nome": "Brócolis",
        "preco": 28,
        "usados": 76,
        "descricao": "Brócolis - 6",
        "pesoPorcao": 75
    },
    {
        "id": 18,
        "imagem": "imgs/igrediente/Pepperoni.webp",
        "nome": "Pepperoni",
        "preco": 35,
        "usados": 14,
        "descricao": "Pepperoni - 8.55",
        "pesoPorcao": 17
    }
]

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

let bebidas = [
    {
        nome: "Coca Cola 2L",
        descricao: "Refrigerante sabor cola de 2L.",
        imagem: "imgs/coca-cola.webp",
        preco: 8.0,
        id: 1,
        quant_comprada: 125,
    },
    {
        nome: "Fanta Laranja 2L",
        descricao: "Refrigerante sabor laranja de 2L.",
        imagem: "imgs/fanta.webp",
        preco: 8.0,
        id: 2,
        quant_comprada: 125,
    },
    {
        nome: "Guaraná 2L",
        descricao: "Refrigerante sabor guaraná de 2L.",
        imagem: "imgs/guarana.webp",
        preco: 8.0,
        id: 3,
        quant_comprada: 125,
    },
];

const getPizzasUsuario = () => {
    return pizzas.map((pizza) => {
        let preco = 0;
        for (let i = 0; i < pizza.ingredientes.length; i++) {
            preco += ingredientes[pizza.ingredientes[i]].preco;
        }
        preco += pizza.quant_molho * ingredientes[0].preco;
        preco += pizza.quant_queijo * ingredientes[1].preco;
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

export { getPizzasUsuario, pizzas, bebidas, ingredientes };
