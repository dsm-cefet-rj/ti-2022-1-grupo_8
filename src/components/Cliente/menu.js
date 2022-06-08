import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { React, useRef } from "react";
import { Link } from "react-router-dom";
import ProdutoCard from "../geral/produto-card";
import { bebidas as BebidaBD, getPizzasUsuario } from "../store";
import MenuNav from "./menu-nav";
import styles from "./menu.module.scss";
/* 
Componente: MenuCliente
Descrição: Componente que renderiza a página principal do Cliente
*/
const ListaPizzasMaisPedidas = () => {
    // Pegando os produtos do banco de dados
    let pizzas = getPizzasUsuario();
    // Ordena os produtos obtidos do "banco de dados"
    pizzas.sort((a, b) => {
        return b.quant_comprada - a.quant_comprada;
    });
    return (
        <>
            <div className="row">
                <h1 className="text-center">Mais pedidas 😋</h1>
            </div>
            <div className={styles.horizontalScroll}>
                <div className="row">
                    {pizzas.slice(0, 4).map((pizza) => (
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
            </div>
        </>
    );
}

const SecaoCriarPizza = () => {
    return (
        <div className="row justify-content-center mt-2">
            <div className="col-md-4">
                <div className="card text-center">
                    <div className="card-header">
                        Crie sua própria pizza
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Do seu jeitinho</h5>
                        <Link
                            to="/criar-pizza"
                            className="btn btn-primary"
                        >
                            Clique aqui
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

const ListaProdutos = () => {
    // Pegando os produtos do banco de dados
    let produtos = BebidaBD;
    // Ordena os bebidas obtida do "banco de dados"
    produtos.sort((a, b) => {
        return b.quant_comprada > a.quant_comprada;
    });
    return (
        <>
            <div className="row mt-2">
                <h3 className="text-center">Bebidas e Outros Produtos</h3>
            </div>
            <div
                style={{
                    overflow: "auto",
                    whiteSpace: "nowrap",
                    display: "flex",
                    flexWrap: "nowrap",

                }}>
                {produtos.map((produto) => (
                    <div
                        style={{
                            margin: "1rem",
                        }}
                        key={produto.id}>

                        <ProdutoCard
                            nome={produto.nome}
                            descricao={produto.descricao}
                            imagem={produto.imagem}
                            preco={produto.preco}
                            key={produto.id}
                            data={produto}
                            tipo="produto"
                        />
                    </div>
                ))}
            </div>
        </>
    );
}

const TodasAsPizzas = () => {
    // Pegando os produtos do banco de dados
    let pizzas = getPizzasUsuario();
    // Ordena os produtos obtidos do "banco de dados"
    pizzas.sort((a, b) => {
        return b.quant_comprada - a.quant_comprada;
    });
    return (
        <>
            <div className="row mt-2">
                <h3 className="text-center">Todos os Sabores 🤔</h3>
            </div>
            <div className="row">
                {pizzas.slice(0, pizzas.length).map((pizza) => (
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
        </>
    );
}


export default () => {
    const ref = useRef();
    return (
        <div className={styles.body}>
            <Parallax pages={3} ref={ref}>
                <MenuNav Atual="menu" />
                <ParallaxLayer offset={0} speed={2}>
                    <div className="container mb-2 p-1 bg-transparent">
                        <ListaPizzasMaisPedidas />
                    </div>
                    <hr />
                    <div className="container mb-2 p-1 bg-transparent">
                        <SecaoCriarPizza />
                    </div>
                    <div className="container mb-2 p-1 bg-transparent">
                        <ListaProdutos />
                    </div>
                    <hr />
                </ParallaxLayer>
                <ParallaxLayer offset={1} speed={2}>
                    <div className="container mb-2 p-1 bg-transparent">
                        <TodasAsPizzas />
                    </div>
                    <hr />
                </ParallaxLayer>
            </Parallax>
        </div>
    );
};
