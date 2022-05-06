import MenuNav from './menu-nav';
import React from 'react';
import ProdutoCard from '../geral/produto-card';
import { pizzas as PizzaBD, bebidas as BebidaBD } from '../store';

/* 
Componente: MenuCliente
Descrição: Componente que renderiza a página principal do Cliente
*/
const MenuCliente = () => {
    let pizzas = PizzaBD;
    let bebidas = BebidaBD;

    pizzas.sort((a, b) => {
        return b.quant_comprada - a.quant_comprada;
    });

    bebidas.sort((a, b) => {
        return b.quant_comprada - a.quant_comprada;
    });
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
                            tipo="pizza"
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
                                <a href="/criar-pizza" className="btn btn-primary">Clique aqui</a>
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
                            tipo="bebida"
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
                            tipo="pizza"
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default MenuCliente;