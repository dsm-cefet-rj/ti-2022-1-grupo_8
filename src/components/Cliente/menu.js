import { React, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    fetchPizzas,
    fetchProdutos,
    selectPizzas,
    selectProdutos,
} from "../../features/clienteDatabaseSlice";
import ProdutoCard from "../geral/produto-card";
import MenuNav from "./menu-nav";
import styles from "./menu.module.scss";
/* 
Componente: MenuCliente
Descrição: Componente que renderiza a página principal do Cliente
*/

const SecaoCriarPizza = () => {
    return (
        <div className="row justify-content-center mt-2">
            <div className="col-md-4">
                <div className="card text-center">
                    <div className="card-header">Crie sua própria pizza</div>
                    <div className="card-body">
                        <h5 className="card-title">Do seu jeitinho</h5>
                        <Link to="/criar-pizza" className="btn btn-primary">
                            Clique aqui
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ListaProdutos = () => {
    const produtos = useSelector(selectProdutos);
    return (
        <>
            <div className="row mt-2">
                <h3 className="text-center">Bebidas e Outros Produtos</h3>
            </div>
            <div
                style={{
                    overflow: "auto",
                    display: "flex",
                    flexWrap: "nowrap",
                }}
            >
                {produtos.map((produto) => (
                    <div
                        style={{
                            margin: "1rem",
                        }}
                        key={produto.id}
                    >
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
};

const ListaPizzasMaisPedidas = () => {
    const pizzas = useSelector(selectPizzas);
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
};

const TodasAsPizzas = () => {
    const pizzas = useSelector(selectPizzas);
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
};

export default () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPizzas());
        dispatch(fetchProdutos());
    }, []);

    const ref = useRef();
    return (
        <div className={styles.body}>
            <MenuNav Atual="menu" />
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
            <div className="container mb-2 p-1 bg-transparent">
                <TodasAsPizzas />
            </div>
            <hr />
        </div>
    );
};
