//store.js
// Banco de dados falso

let ingredientes = [
  {
    id: -2,
    imagem: "imgs/igrediente/molho_de_tomate.jpg",
    nome: "Molho",
    preco: 0.75,
    usados: 452,
  },
  {
    id: -1,
    imagem: "imgs/igrediente/queijo-musssarela.jpg",
    nome: "Queijo",
    preco: 0.75,
    usados: 452,
  },
  {
    id: 0,
    imagem: "imgs/igrediente/Calabresa.jpg",
    nome: "Calabresa",
    preco: 6.45,
    usados: 452,
  },
  {
    id: 1,
    imagem: "imgs/igrediente/Presunto.jpg",
    nome: "Presunto",
    preco: 8.5,
    usados: 785,
  },
  {
    id: 2,
    imagem: "imgs/igrediente/Camarao.webp",
    nome: "Camarão",
    preco: 4.86,
    usados: 785,
  },
  {
    id: 3,
    imagem: "imgs/igrediente/Alho.jpg",
    nome: "Alho",
    preco: 4.75,
    usados: 123,
  },
  {
    id: 4,
    imagem: "imgs/igrediente/Ovo.jpg",
    nome: "Ovo",
    preco: 5.32,
    usados: 752,
  },
  {
    id: 5,
    imagem: "imgs/igrediente/Azeitona verde.webp",
    nome: "Azeitona verde",
    preco: 5.86,
    usados: 756,
  },
  {
    id: 6,
    imagem: "imgs/igrediente/Azeitona preta.jpg",
    nome: "Azeitona preta",
    preco: 4.0,
    usados: 75,
  },
  {
    id: 7,
    imagem: "imgs/igrediente/Tomate.jpg",
    nome: "Tomate",
    preco: 4.5,
    usados: 75,
  },
  {
    id: 8,
    imagem: "imgs/igrediente/Cebola.png",
    nome: "Cebola",
    preco: 2.0,
    usados: 15,
  },
  {
    id: 9,
    imagem: "imgs/igrediente/Frango desfiado.jpg",
    nome: "Frango desfiado",
    preco: 7.99,
    usados: 75,
  },
  {
    id: 10,
    imagem: "imgs/igrediente/Requeijão.jpg",
    nome: "Requeijão",
    preco: 5.0,
    usados: 48,
  },
  {
    id: 11,
    imagem: "imgs/igrediente/Pimentão verde.webp",
    nome: "Pimentão verde",
    preco: 5.66,
    usados: 42,
  },
  {
    id: 12,
    imagem: "imgs/igrediente/Manjericão.jpg",
    nome: "Manjericão",
    preco: 6.6,
    usados: 26,
  },
  {
    id: 13,
    imagem: "imgs/igrediente/Bacon.webp",
    nome: "Bacon",
    preco: 5.0,
    usados: 85,
  },
  {
    id: 14,
    imagem: "imgs/igrediente/Brócolis.jpg.crdownload",
    nome: "Brócolis",
    preco: 6.0,
    usados: 74,
  },
  {
    id: 15,
    imagem: "imgs/igrediente/Pepperoni.webp",
    nome: "Pepperoni",
    preco: 8.55,
    usados: 74,
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
    descricao: "Deliciosa pizza com molho de tomate, mussarela e manjericão.",
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
