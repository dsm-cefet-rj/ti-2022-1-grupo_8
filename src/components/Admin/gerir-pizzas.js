import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPizzas, selectPizzas, selectIngredientes, fetchIngredientes } from "../../features/clienteDatabaseSlice";
import { setMetades, selectGerirPizza } from "../../features/gerir-pizzaSlice";
import Metade from "../geral/metade-pizza";
import AdminNav from "./admin-nav";
import styles from "./gerir-pizzas.module.scss";
/* 
Componente: GerirPizzas
Descrição: Componente que renderiza a página de gerenciamento de pizzas
*/
const GerirPizzas = () => {
    const dispatch = useDispatch();

    const pizzas = useSelector(selectPizzas);
    const ingredientes = useSelector(selectIngredientes);

    const [erro, setErro] = useState("");

    // Variáveis que controlam o nome da pizza
    const [nome, setNome] = useState("");
    // Variáveis que controlam o arquivo de imagem da pizza.
    const [imagem, setImagem] = useState("");
    // Variáveis que controlam a descrição da pizza.
    const [descricao, setDescricao] = useState("");
    // Variáveis que controlam os ingredientes selecionados.
    const ingrediente = useSelector(selectGerirPizza).ingrediente; // ingredientes

    const [preco, setPreco] = useState(0);
    const [editando, setEditando] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();
        //Atualiza as pizzas carregadas
        dispatch(fetchPizzas());
    };

    const handleCheckbox = (e) => {

    };

    useEffect(() => {
        dispatch(fetchPizzas());
        dispatch(fetchIngredientes());
    }, []);

    return (
        <>
            <AdminNav Atual="pizzas" />
            <div className={styles.body}>
                <h1> Gerenciar Pizzas </h1>
                <div className="container">
                    <div className="row m-1 section">
                        {/*Area de seleção de pizza existente*/}
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
                                            borderRadius: "0.25rem",
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
                                                setDescricao(pizza.descricao);

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

                                                pizzas.map((pizzaOBJ) => {
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
                    {/*Formulário de cadastro e alteração de pizza de pizza*/}
                    <div className="row m-1 section">
                        <form>
                            {/* Nome*/}
                            <div className="form-group mb-2">
                                <label htmlFor="nome">Nome</label>
                                <input
                                    id="nome"
                                    className="form-control"
                                    type="text"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                />
                            </div>
                            {/* Descrição*/}
                            <div className="form-group mb-2">
                                <label htmlFor="descricao">Descrição</label>
                                <textarea
                                    id="descricao"
                                    className="form-control"
                                    type="text"
                                    value={descricao}
                                    onChange={(e) => setDescricao(e.target.value)}
                                />
                            </div>
                            {/* Ingredientes*/}
                            <div className="scrollmenu">
                                {ingredientes.map((ingrediente) => (
                                    <div className="ingrediente" key={ingrediente.id}>
                                        <p
                                            className="form-check-label"
                                            htmlFor={ingrediente.id.toString()}
                                        >
                                            {ingrediente.nome}
                                        </p>
                                        <img
                                            src={ingrediente.imagem}
                                            alt="Pizza"
                                            style={{
                                                width: "100px",
                                                borderRadius: "10px",
                                            }}
                                        />
                                        <br />
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            style={{
                                                width: "40px",
                                                height: "40px",
                                            }}
                                            value={ingrediente.id.toString()}
                                            id={ingrediente.id.toString()}
                                            onChange={handleCheckbox}
                                        />
                                        <p>R$ {ingrediente.preco.toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                        </form>
                    </div>
                    <div className="row">
                        <div
                            className="col-md-12"
                            style={{
                                textAlign: "right",
                                marginBottom: "20px",
                            }}
                        >
                            <h3>Preço total:</h3>
                            <h3>{"R$: " + preco.toFixed(2)}</h3>
                        </div>
                    </div>
                    <div className="row section">
                        {/* Botoes de Confirmar ou cancelar e voltar para o menu-admin */}
                        <div className="col-md-12">
                            <button
                                className="btn btn-lg btn-success"
                                onClick={() => { }}
                            >
                                Confirmar
                            </button>

                            <button
                                className="btn btn-lg btn-warning"
                                onClick={() => {
                                    window.location.href = "/menu-admin";
                                }}
                            >
                                Voltar
                            </button>
                        </div>
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
