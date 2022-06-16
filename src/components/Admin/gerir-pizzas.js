import React, { useEffect, useState } from "react";
import Metade from "../geral/metade-pizza";
import AdminNav from "./admin-nav";
import styles from "./gerir-pizzas.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {selectPizzas,fetchPizzas} from "../../features/clienteDatabaseSlice";
/* 
Componente: GerirPizzas
Descrição: Componente que renderiza a página de gerenciamento de pizzas
*/
const GerirPizzas = () => {
    const dispatch = useDispatch();

    const pizzasDB = useSelector(selectPizzas);
    const pizzas = pizzasDB;

    const [erro, setErro] = useState("");
    const [nome, setNome] = useState("");
    const [imagem, setImagem] = useState("");
    const [preco, setPreco] = useState(0);
    const [editando, setEditando] = useState(false);
    const [metades, setMetades] = useState(0);

    const handleNome = (e) => {
        setNome(e.target.value);
        // carregar ingredientes
        let ingredientes = [];
        for (let i = 0; i < metades; i++) {
            ingredientes.push([]);
        }
    };
    const handleImagem = (e) => {
        setImagem(e.target.files[0]);
    };

    const handleButton = (e) => {
        e.preventDefault();
        if (nome === "") {
            setErro("Preencha o nome da pizza");
            return;
        }
        if (imagem === "") {
            setErro("Preencha a imagem da pizza");
            return;
        }

        let pizza = {
            nome: nome,
            imagem: imagem,
            metades: metades,
        };
    };

    useEffect(() => {
        dispatch(fetchPizzas());
    }, []);

    return (
        <>
            <AdminNav Atual="pizzas" />
            <div className="container mb-2 p-1 bg-transparent">
                <div className="row">
                    <h1>Gerenciar Pizzas 🍕</h1>
                    <div className="row section mb-3">
                        <h4>Adicionar Nova ou Editar Pizza</h4>
                    </div>
                    <h3>
                        <b>Pizzas Cadastradas 🍕</b>
                    </h3>
                </div>
                <div className="row section mb-1">
                    <div className="scrollmenu">
                        {pizzas.map((pizza) => (
                            <div
                                style={{
                                    width: "18rem",
                                    margin: "0.5rem",
                                    border: "1px solid #ccc",
                                    borderRadius: "0.25rem",
                                    padding: "1rem",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                                key={pizza.id}
                            >
                                <img
                                    className="card-img-top"
                                    src={pizza.imagem}
                                    alt={pizza.nome}
                                    style={{
                                        width: "12rem",
                                        height: "12rem",
                                        objectFit: "cover",
                                    }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{pizza.nome}</h5>
                                    <button
                                        className="btn btn-lg btn-primary btn-success"
                                        id={`pizza-${pizza.id}`}
                                        onClick={() => {
                                            setEditando(true);
                                            setNome(pizza.nome);

                                            let elem = document.getElementById(
                                                `pizza-${pizza.id}`
                                            );
                                            if (
                                                elem.classList.contains(
                                                    "btn-success"
                                                )
                                            ) {
                                                elem.classList.remove(
                                                    "btn-success"
                                                );
                                                elem.classList.add(
                                                    "btn-danger"
                                                );
                                                elem.innerHTML = "Remover";
                                            } else {
                                                elem.classList.remove(
                                                    "btn-danger"
                                                );
                                                elem.classList.add(
                                                    "btn-success"
                                                );
                                                elem.innerHTML = "Editar";
                                            }

                                            pizzasDB.map((pizzaOBJ) => {
                                                if (pizzaOBJ.id !== pizza.id) {
                                                    let elem =
                                                        document.getElementById(
                                                            `pizza-${pizzaOBJ.id}`
                                                        );
                                                    elem.classList.remove(
                                                        "btn-danger"
                                                    );
                                                    elem.classList.add(
                                                        "btn-success"
                                                    );
                                                    elem.innerHTML = "Editar";
                                                }
                                            });
                                        }}
                                    >
                                        Alterar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <form onSubmit={handleButton}>
                    <div className="row">
                        <h5
                            className="text-center"
                            style={{
                                color: "red",
                                textShadow: "0px 0px 10px black",
                            }}
                        >
                            {erro}
                        </h5>
                    </div>
                    <div className="row section">
                        <div className="form-group">
                            <div id="Imagem">
                                <label htmlFor="nomePizza">Nome</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nomePizza"
                                    placeholder="Nome da pizza"
                                    value={nome}
                                    onChange={handleNome}
                                    enabled={(!editando).toString()}
                                />
                            </div>
                            <div id="Imagem">
                                <label htmlFor="imagem">Imagem</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="imagem"
                                    name="imagem"
                                    placeholder="Imagem"
                                    onChange={handleImagem}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <hr />
                        <h3>Ingredientes</h3>
                    </div>
                    <Metade key="1" id={1} active={true} />
                    <hr />
                    <div className="row">
                        <div
                            className="col-md-12"
                            style={{
                                textAlign: "right",
                                marginBottom: "20px",
                            }}
                        >
                            <h3>
                                Preço Total: R${" "}
                                <span className="total-carrinho">
                                    {preco.toFixed(2)}
                                </span>
                            </h3>
                        </div>
                    </div>
                </form>
                <div className="row section">
                    <div style={{ textAlign: "center" }}>
                        <button
                            className="btn btn-outline-success btn-lg"
                            id="botao-acao"
                        >
                            {editando ? "Salvar 💿" : "Adicionar ✅"}
                        </button>
                        <a
                            href="/menu-admin"
                            style={{
                                margin: " 0 5px",
                            }}
                            className="btn btn-outline-danger btn-lg"
                        >
                            {editando ? "Deletar 🗑️" : "Cancelar ❌"}
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default () => {
    return (
        <div className={styles.body}>
            <GerirPizzas />
        </div>
    );
};
