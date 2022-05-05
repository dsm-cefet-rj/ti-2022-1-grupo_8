import MenuNav from './menu-nav';
import React from 'react';
import ProdutoCard from '../geral/produto-card';

let pizzas = [
    {
        nome: "Calabresa",
        descricao: "Deliciosa pizza com molho de tomate, mussarela, calabresa, azeitona e orégano.",
        imagem: "/imgs/pizza-calabresa.jpg",
        preco: 25.00,
        id: 0,
    },
    {
        nome: "Pizza de Mussarela",
        descricao: "Básica mas ainda gostosa, pizza com molho de tomate, mussarela e orégano.",
        imagem: "/imgs/pizza-mussarela.webp",
        preco: 25.00,
        id: 1,
    },
    {
        nome: "Da Casa",
        descricao: "Sabor original da pizzaria, contendo molho de tomate, mussarela, peperoni, cebola e pimentão verde.",
        imagem: "/imgs/pizza-da-casa.webp",
        preco: 25.00,
        id: 2,
    },
    {
        nome: "Frango com Requeijão",
        descricao: "Deliciosa pizza com molho de tomate, frango desfiado, queijo, requeijão e orégano",
        imagem: "/imgs/Frango com Requeijão.jpeg",
        preco: 25.00,
        id: 3,
    },
    {
        nome: "Brócolis",
        descricao: "Deliciosa pizza com molho de tomate, mussarela, brócolis e orégano.",
        imagem: "/imgs/brocolis.jpg",
        preco: 25.00,
        id: 4,
    },
    {
        nome: "Brócolis com Alho",
        descricao: "Deliciosa pizza com molho de tomate, mussarela, alho e orégano.",
        imagem: "/imgs/brocolis e alho.jpeg",
        preco: 25.00,
        id: 5,
    },
    {
        nome: "Margherita",
        descricao: "Deliciosa pizza com molho de tomate, mussarela de búfala, manjericão, queijo parmesão ralado, tomates e azeite.",
        imagem: "/imgs/Margherita.jpg",
        preco: 25.00,
        id: 6,
    },
    {
        nome: "Bacon",
        descricao: "Deliciosa pizza com molho de tomate, mussarela, bacon e orégano.",
        imagem: "/imgs/bacon.jpg",
        preco: 25.00,
        id: 7,
    },
    {
        nome: "Portuguesa",
        descricao: "Deliciosa pizza com calabresa, tomates, mussarela, cebolas e azeitonas pretas.",
        imagem: "/imgs/Portuguesa.jpg",
        preco: 25.00,
        id: 8,
    },
    {
        nome: "Napolitana",
        descricao: "Deliciosa pizza com molho de tomate, mussarela e manjericão.",
        imagem: "/imgs/pizza-napolitana.jpg",
        preco: 25.00,
        id: 9,
    },
    {
        nome: "4 Queijos",
        descricao: "Deliciosa pizza com molho de tomate, mussarela, gorgonzola, requeijão e parmesão.",
        imagem: "/imgs/4 Queijos.webp",
        preco: 25.00,
        id: 10,
    },
    {
        nome: "Tropical",
        descricao: "Deliciosa pizza com mussarela, camarão, bacon e abacaxi.",
        imagem: "/imgs/Tropical.jpg",
        preco: 25.00,
        id: 11,
    },
]

let bebidas = [
    {
        nome: "Coca Cola 2L",
        descricao: "Refrigerante sabor coca de 2L.",
        imagem: "imgs/coca-cola.webp",
        preco: 8.00,
        id: 1,
    },
    {
        nome: "Fanta Laranja 2L",
        descricao: "Refrigerante sabor laranja de 2L.",
        imagem: "imgs/fanta.webp",
        preco: 8.00,
        id: 2,
    },
    {
        nome: "Guaraná 2L",
        descricao: "Refrigerante sabor guaraná de 2L.",
        imagem: "imgs/guarana.webp",
        preco: 8.00,
        id: 3,
    },
]

const MenuCliente = () => {
    return (
        <>
            <MenuNav Atual="menu" />
            <div className="container mb-2 p-1 bg-transparent">
                <div className="row">
                    <h1 className="text-center">Pizzas mais pedidas</h1>
                </div>
                <div className="row">
                    {pizzas.slice(0, 4).map(pizza => (
                        <ProdutoCard
                            nome={pizza.nome}
                            descricao={pizza.descricao}
                            imagem={pizza.imagem}
                            preco={pizza.preco}
                            key={pizza.id}
                        />
                    ))}

                </div>
                <hr />
                <div className="row justify-content-center mt-2">
                    <div className="col-5">
                        <div className="card text-center">
                            <div className="card-header">
                                Crie sua própria pizza
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Do seu jeitinho</h5>
                                <a href="Cliente Criar Pizza.html" className="btn btn-primary">Clique aqui</a>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row mt-2">
                    <h3 className="text-center">Bebidas</h3>
                </div>
                <div className="row">
                    {bebidas.slice(0, 4).map(bebida => (
                        <ProdutoCard
                            nome={bebida.nome}
                            descricao={bebida.descricao}
                            imagem={bebida.imagem}
                            preco={bebida.preco}
                            key={bebida.id}
                        />
                    ))}
                </div>
                <hr />
                <div className="row mt-2">
                    <h3 className="text-center">Outros Sabores</h3>
                </div>
                <div className="row">
                    {pizzas.slice(0, pizzas.length).map(pizza => (
                        <ProdutoCard
                            nome={pizza.nome}
                            descricao={pizza.descricao}
                            imagem={pizza.imagem}
                            preco={pizza.preco}
                            key={pizza.id}
                        />
                    ))}

                </div>
            </div>
        </>
    )
}

export default MenuCliente;