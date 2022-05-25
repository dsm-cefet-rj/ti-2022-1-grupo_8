import MenuNav from './menu-nav';
import { React } from 'react';
import { Link } from 'react-router-dom';
import ProdutoCard from '../geral/produto-card';
import { pizzas as PizzaBD, bebidas as BebidaBD } from '../store';

/* 
Componente: MenuCliente
Descrição: Componente que renderiza a página principal do Cliente
*/
const MenuCliente = () => {
    // Pegando os produtos do banco de dados
    let pizzas = PizzaBD;
    // Pegando os produtos do banco de dados
    let bebidas = BebidaBD;

    // Ordena os produtos obtidos do "banco de dados"
    pizzas.sort((a, b) => {
        return b.quant_comprada - a.quant_comprada;
    });

    // Ordena os bebidas obtida do "banco de dados"
    bebidas.sort((a, b) => {
        return b.quant_comprada - a.quant_comprada;
    });


    // Renderiza o menu
    return (
        <>
            <MenuNav Atual="menu" />
            <div className="container mb-2 p-1 bg-transparent">
                <div className="row">
                    <h1 className="text-center">Mais pedidas</h1>
                </div>
                <div className="row">
                    {pizzas.slice(0, 4).map(pizza => (
                        <ProdutoCard
                            nome={pizza.nome}
                            descricao={pizza.descricao}
                            imagem={pizza.imagem}
                            key={pizza.id}
                            data={pizza}
                            tipo="pizza"
                        />
                    ))}
                </div>
                <hr />
                <div className="row justify-content-center mt-2">
                    <div className="col-md-4">
                        <div className="card text-center">
                            <div className="card-header">
                                Crie sua própria pizza
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Do seu jeitinho</h5>
                                <Link to="/criar-pizza" className="btn btn-primary">Clique aqui</Link>
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
                            data={bebida}
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
                            data={pizza}
                            tipo="pizza"
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default MenuCliente;