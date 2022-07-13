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
    setIdSelecionado,
    setNome,
    setDescricao,
    setIngredientes,
    addIngrediente,
    removeIngrediente,
    selectIdSelecionado,
    selectNome,
    selectDescricao,
    selectIngredientesPizza,
} from "../../features/gerir-pizzaSlice";
import AdminNav from "./admin-nav";
import styles from "./gerir-pizzas.module.scss";
import { getSessionFromLocalStorage } from "../../features/sessionSlice";
/* 
Componente: GerirPizzas
Descrição: Componente que renderiza a página de gerenciamento de pizzas
*/

const Pizza = (props) => {
    // Dispatch do Redux
    const dispatch = useDispatch();

    // Variavies que controlam os ingredientes do banco de dados.
    const pizzasBD = useSelector(selectPizzas);

    // Dados do ingrediente
    const { id, imagem, nome, descricao, ingredientes } = props.data;
    // Controla se a pizza está selecionada
    const [selecionado, setSelecionado] = useState(false);

    // Função que seleciona uma pizza
    const selecionar = () => {
        setSelecionado(!selecionado);
        if (!selecionado) {
            dispatch(
                setIdSelecionado({
                    id: id,
                })
            );
            dispatch(
                setNome({
                    nome: nome,
                })
            );
            dispatch(
                setDescricao({
                    descricao: descricao,
                })
            );
            dispatch(
                setIngredientes({
                    ingredientes: ingredientes,
                })
            );
            document.getElementById("form-pizza").scrollIntoView({
                behavior: "instant",
                block: "center",
            });
            //desselecionar todas as outras pizzas
            pizzasBD.forEach((pizza) => {
                if (pizza.id !== id) {
                    let elem = document.getElementById(`pizza-${pizza.id}`);
                    elem.innerHTML = "Selecionar";
                }
            });
        } else {
            dispatch(
                setIdSelecionado({
                    id: 0,
                })
            );
            dispatch(
                setNome({
                    nome: "",
                })
            );
            dispatch(
                setDescricao({
                    descricao: "",
                })
            );
            dispatch(
                setIngredientes({
                    ingredientes: ingredientes,
                })
            );
        }
    };

    useEffect(() => {
        dispatch(fetchIngredientes());
    }, [dispatch]);

    // Renderização do componente
    return (
        <>
            <div className="pizza">
                <img src={imagem} alt="Pizza" style={{ width: "100px" }} />
                <br />
                <p>{nome}</p>
                <button
                    className="btn btn-primary"
                    onClick={selecionar}
                    id={`pizza-${id}`}
                >
                    {selecionado ? "Desselecionar" : "Selecionar"}
                </button>
            </div>
        </>
    );
};

const GerirPizzas = () => {
    // Dispatch do Redux
    const dispatch = useDispatch();

    // Variavies que controlam os ingredientes do banco de dados.
    const pizzasBD = useSelector(selectPizzas);
    const ingredientesBD = useSelector(selectIngredientes);

    const idSelecionado = useSelector(selectIdSelecionado);
    const nome = useSelector(selectNome);
    const descricao = useSelector(selectDescricao);
    const ingredientes = useSelector(selectIngredientesPizza);
    const [imagem, setImagem] = useState("");

    useEffect(() => {
        dispatch(fetchPizzas());
        dispatch(fetchIngredientes());
    }, [dispatch]);

    useEffect(() => {
        if (idSelecionado !== 0) {
            document.getElementById("imagem-field").hidden = true;
        } else {
            document.getElementById("imagem-field").hidden = false;
        }
    }, [idSelecionado]);

    const handleButton = async (e) => {
        e.preventDefault();
        let pizza = {
            nome: nome,
            descricao: descricao,
            imagem: imagem,
            ingredientes: ingredientes,
            _id: idSelecionado,
        };
        const form = new FormData();
        for (let key in pizza) {
            form.append(key, pizza[key]);
        }
        const token = getSessionFromLocalStorage();

        const request = {
            method: "POST",
            url: "http://localhost:3001/admin/editar-pizza",
            headers: {
                "x-access-token": `Bearer ${token}`,
            },
            data: form,
        };

        const response = await axios(request);
        if (response.status === 200) {
            // reload window
            window.location.reload();
        } else {
            console.log(response.data.error);
        }
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
                            {pizzasBD.map((pizza) => (
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

                                                pizzasBD.map((pizzaOBJ) => {
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
                        <form
                            action="Administrador Gerir Pizzas.html"
                            method="post"
                            id="form-pizza"
                        >
                            {/* Nome*/}
                            <div className="form-group mb-2">
                                <label htmlFor="nome">Nome</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nome"
                                    name="nome"
                                    placeholder="Nome"
                                    autoComplete="off"
                                    onChange={(e) =>
                                        dispatch(
                                            setNome({
                                                nome: e.target.value,
                                            })
                                        )
                                    }
                                    value={nome}
                                />
                            </div>
                            {/* Descrição*/}
                            <div className="form-group mb-2">
                                <label htmlFor="descricao">Descrição</label>
                                <textarea
                                    type="text"
                                    className="form-control"
                                    id="descricao"
                                    name="descricao"
                                    placeholder="Descrição"
                                    autoComplete="off"
                                    onChange={(e) =>
                                        dispatch(
                                            setDescricao({
                                                descricao: e.target.value,
                                            })
                                        )
                                    }
                                    value={descricao}
                                />
                            </div>
                            {/* Imagem */}
                            <div className="form-group mb-2" id="imagem-field">
                                <label htmlFor="imagem">Imagem</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="imagem"
                                    name="imagem"
                                    placeholder="Imagem"
                                    onChange={(e) => {
                                        // setImagem to the fist file uploaded
                                        let [file] = e.target.files;

                                        setImagem(file);
                                    }}
                                />
                            </div>
                            {/* Ingredientes*/}
                            <div className="scrollmenu">
                                {ingredientesBD.map((ingrediente) => (
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
                            <h3>{"R$: " + "10"}</h3>
                        </div>
                    </div>
                    <div className="row section">
                        {/* Botoes de Confirmar ou cancelar e voltar para o menu-admin */}
                        <div className="col-md-12">
                            <button
                                className="btn btn-lg btn-success"
                                onClick={handleButton}
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
