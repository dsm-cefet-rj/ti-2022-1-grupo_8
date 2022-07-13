import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchPizzas,
    selectPizzas,
    selectIngredientes,
    fetchIngredientes,
} from "../../features/clienteDatabaseSlice";
import {
    removeIngrediente,
    addIngrediente,
    selectGerirPizza,
} from "../../features/gerir-pizzaSlice";
import AdminNav from "./admin-nav";
import styles from "./gerir-pizzas.module.scss";
import { getSessionFromLocalStorage } from "../../features/sessionSlice";
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

    const [idSelecinado, setIdSelecionado] = useState("");

    const [preco, setPreco] = useState(0);
    const [editando, setEditando] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let form_data = new FormData();
        form_data.append("nome", nome);
        form_data.append("descricao", descricao);
        form_data.append("imagem", imagem);
        form_data.append("id", idSelecinado);

        const form = new FormData();
        for (const key in pizza) {
            form.append(key, pizza[key]);
        }

        const token = getSessionFromLocalStorage();
        const request = {
            method: "POST",
            url: "http://localhost:3001/admin/editar-pizza",
            headers: {
                "Content-Type": "multipart/form-data",
                "x-access-token": `Bearer ${token}`,
            },
            data: form_data,
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                console.log(percentCompleted);
            },
        };

        axios(request)
            .then((response) => {
                if (response.status === 200) {
                    dispatch(fetchIngredientes());
                    console.log("Pizza editada com sucesso!");
                } else console.log("Erro ao editar pizza!");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleCheckbox = (e) => {
        const id = e.target.id;
        const payload = {
            id: id,
        };
        if (e.target.checked) {
            dispatch(addIngrediente(payload));
        } else {
            dispatch(removeIngrediente(payload));
        }
    };

    useEffect(() => {
        dispatch(fetchPizzas());
        dispatch(fetchIngredientes());
    }, [dispatch]);

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
                                        <h5 className="card-title">
                                            {pizza.nome}
                                        </h5>
                                        <button
                                            className="btn btn-lg btn-primary btn-success"
                                            id={`pizza-${pizza.id}`}
                                            onClick={() => {
                                                setEditando(true);
                                                setNome(pizza.nome);
                                                setDescricao(pizza.descricao);
                                                setIdSelecionado(pizza.id);

                                                let elem =
                                                    document.getElementById(
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
                                                    if (
                                                        pizzaOBJ.id !== pizza.id
                                                    ) {
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
                                                        elem.innerHTML =
                                                            "Editar";
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
                                    onChange={(e) =>
                                        setDescricao(e.target.value)
                                    }
                                />
                            </div>
                            {/* Imagem */}
                            <div className="form-group mb-2">
                                <label htmlFor="imagem">Imagem</label>
                                <input
                                    id="imagem"
                                    className="form-control"
                                    type="file"
                                    onChange={(e) => {
                                        const [file] = e.target.files;
                                        setImagem(file);
                                    }}
                                />
                            </div>
                            {/* Ingredientes*/}
                            <div className="scrollmenu">
                                {ingredientes.map((ingrediente) => (
                                    <div
                                        className="ingrediente"
                                        key={ingrediente.id}
                                    >
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
                                onClick={handleSubmit}
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

const page = () => {
    return (
        <div className={styles.body}>
            <GerirPizzas />
        </div>
    );
};

export default page;
