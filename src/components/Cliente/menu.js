import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { useSelector, useDispatch } from "react-redux";
import { React, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ProdutoCard from "../geral/produto-card";
import MenuNav from "./menu-nav";
import styles from "./menu.module.scss";
import {
    selectPizzas,
    selectProdutos,
    getPizzas,
    getProdutos,
} from "../../features/clienteDatabaseSlice";
/* 
Componente: MenuCliente
Descrição: Componente que renderiza a página principal do Cliente
*/

const Decoracao = (props) => {
    let emojis = props.emojis;
    let quant = props.quant;
    const selectRandomEmoji = () => {
        let index = Math.floor(Math.random() * emojis.length);
        return emojis[index];
    };
    return (
        <div className={styles.decoracao}>
            {Array.from({ length: quant }, (_, i) => {
                return (
                    <h1
                        key={i}
                        style={{
                            transform: `rotate(${
                                Math.random() * (360 - 0) + 0
                            }deg)`,
                            transform: `translate(${
                                Math.random() * (100 - 0) + 0
                            }%, ${Math.random() * (100 - 0) + 0}%)`,
                            textShadow: `0 0 10px black`,
                            fontSize: `${Math.random() * 10 + 5}rem`,
                        }}
                    >
                        {selectRandomEmoji()}
                    </h1>
                );
            })}
        </div>
    );
};

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
    const [produtos, setProdutos] = useState([]);
    useState(() => {
        let url = "http://localhost:3001/usuario/produtos";
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setProdutos(data);
            });
    }, []);
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
    const [pizzas, setPizzas] = useState([]);
    useState(() => {
        let url = "http://localhost:3001/usuario/pizzas";
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setPizzas(data);
            });
    }, []);
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
    const [pizzas, setPizzas] = useState([]);
    useState(() => {
        let url = "http://localhost:3001/usuario/pizzas";
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setPizzas(data);
            });
    }, []);
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
    const ref = useRef();
    return (
        <div className={styles.body}>
            <Parallax pages={2.5} ref={ref}>
                <ParallaxLayer offset={0} speed={0.5}>
                    <Decoracao
                        emojis={[
                            "🍕",
                            "🍕",
                            "🍕",
                            "🍕",
                            "🍕",
                            "🍕",
                            "🍕",
                            "😋",
                            "🧀",
                            "🍅",
                            "🤘",
                            "🥤",
                            "🍾",
                            "🥓",
                            "🐷",
                            "🧄",
                            "🧅",
                            "🥩",
                            "🐥",
                            "༼ つ ◕_◕ ༽つ🍰🍔🍕",
                            "😍",
                            "🤌🏼",
                            "🍄",
                            "👩🏻‍🍳",
                        ]}
                        quant={50}
                    />
                </ParallaxLayer>
                <ParallaxLayer offset={0} speed={2}>
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
                </ParallaxLayer>
            </Parallax>
        </div>
    );
};
