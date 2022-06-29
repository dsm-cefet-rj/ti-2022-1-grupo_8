import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { adicionarAoCarrinho as mandaPCarrinho } from "../../features/carrinhoSlice";
import {
    fetchIngredientes,
    selectIngredientes,
} from "../../features/clienteDatabaseSlice";
import { selectMetades } from "../../features/ingredientes-metadeSlice";
import Metade from "../geral/metade-pizza";
import styles from "./criar-pizza.module.scss";
import MenuNav from "./menu-nav";

/* 
Componente: CriarPizza
Descrição:  Componente que renderiza a página de criação de pizza
*/
const CriarPizza = () => {
    // Dispatch do Redux
    const dispatch = useDispatch();
    // Variavies que controlam os ingredientes do banco de dados.
    const ingredientesBD = useSelector(selectIngredientes);

    // Variáveis que controlam estados do componente.
    const [tamanho, setTamanho] = useState("");
    const [precoTotal, setPrecoTotal] = useState(0);
    const [erro, setErro] = useState("");
    const [metadeCount, setMetadeCount] = useState(1);
    const ingredientes = useSelector(selectMetades);

    const maxMetades = 4;

    // Função que adiciona uma metade
    const handleAddMetade = () => {
        if (metadeCount >= maxMetades) return;
        setMetadeCount(metadeCount + 1);
        document.getElementById(`SCROLLMENU${metadeCount - 1}`).scrollIntoView({
            behavior: "smooth",
        });
    };

    const handleRemoveMetade = () => {
        if (metadeCount <= 1) return;
        setMetadeCount(metadeCount - 1);
        document.getElementById(`SCROLLMENU${metadeCount - 1}`).scrollIntoView({
            behavior: "smooth",
        });
    };

    // Função que gera o nome da pizza
    const getNomePizzaFromIngredientes = (ingredientes, tamanho) => {
        let nome = "Pizza " + tamanho;

        // Achatar metades, remover duplicados, e remover molho da lista
        const flatIngredientes = [...new Set(ingredientes.flat())].filter(
            (id) => id !== 1
        );

        const prefixos = ["de", "com", "e"];

        for (let i = 0; i < 3; i++) {
            if (flatIngredientes.length <= 0) break;
            const idIngrediente = sortear(flatIngredientes);
            const nomeIngrediente = getNomeIngredienteFromId(idIngrediente);
            const prefixo = prefixos[Math.min(i, prefixos.length - 1)];

            nome += " " + prefixo + " " + nomeIngrediente;
        }
        return nome;
    };

    // que pega no nome do ingrediente do id passado
    const getNomeIngredienteFromId = (id) => {
        let ingrediente = ingredientesBD.find(
            (ingrediente) => ingrediente.id === id
        );
        return ingrediente.nome;
    };

    // Função que sorteia um ingrediente
    const sortear = (arr) => {
        const item = arr[Math.floor(Math.random() * arr.length)];
        arr.splice(arr.indexOf(item), 1);
        return item;
    };

    // função que adiciona a pizza customizada ao carrinho
    const adicionarAoCarrinho = () => {
        if (erro !== "") {
            document.getElementById(`erro_message`).scrollIntoView({
                behavior: "auto",
                block: "center",
            });
            document.getElementById(`erro_message`).animate(
                {
                    color: "yellow",
                    textShadow: "50px 50px 50px red",
                },
                1000
            );
            return;
        }
        if (tamanho === "") {
            setErro("Selecione um tamanho");
            document.getElementById(`erro_message`).scrollIntoView({
                behavior: "auto",
                block: "center",
            });
        } else {
            const generate_id = () => {
                // Generate a id based on the tamanho and ingredientes
                return crypto.randomUUID();
            };
            atualizarPreco();
            // Gerar objeto da pizza customizada
            let pizza = {
                id: generate_id(),
                nome: getNomePizzaFromIngredientes(ingredientes, tamanho),
                preco: precoTotal,
                quantidade: 1,
                tamanho: tamanho,
                Metades: ingredientes,
                descricao: "Ingredientes: " + ingredientes.flat().join(", "),
            };
            // Adicionar a pizza customizada ao carrinho
            dispatch(mandaPCarrinho(pizza));
            // Redirecionar para a página de carrinho
            window.location.replace("/carrinho");
        }
    };

    const atualizarPreco = () => {
        let preco = 0;
        switch (tamanho) {
            case "Pequena":
                preco += 10;
                break;
            case "Media":
                preco += 15;
                break;
            case "Grande":
                preco += 20;
                break;
            case "Familia":
                preco += 25;
                break;
            default:
                break;
        }

        ingredientes.flat().forEach((id) => {
            let ingredienteObj = ingredientesBD.find((i) => {
                return i.id === id;
            });
            preco += ingredienteObj.preco;
        });

        setPrecoTotal(preco);
    };

    const handleTamanhoRadio = (e) => {
        let valor = e.target.value;
        setTamanho(valor);
        setErro("");
        document.getElementById("INGREDIENTES").scrollIntoView({
            behavior: "smooth",
        });
    };

    const [ingredientesCarregados, setIngredientesCarregados] = useState(false);

    useEffect(() => {
        if (!ingredientesCarregados) {
            dispatch(fetchIngredientes());
            setIngredientesCarregados(true);
        }

        if (erro) {
            setErro("");
        }
        if (tamanho === "") {
            setErro("Selecione um tamanho");
        } else {
            atualizarPreco();
        }
    }, [tamanho, ingredientes, erro, ingredientesBD, dispatch]);

    // Renderiza a página de criação de pizza.
    return (
        <>
            <MenuNav Atual="criar-pizza" />
            <form>
                <div className="container">
                    <div className="row">
                        <h1 className="text-center">Monte sua pizza 🍕</h1>
                    </div>
                    <div className="row">
                        <h5
                            className="text-center"
                            id="erro_message"
                            style={{
                                color: "red",
                            }}
                        >
                            {erro}
                        </h5>
                    </div>
                    <div className="row section">
                        <p>
                            <b>Tamanho</b>
                        </p>
                        <div>
                            <div className="form-check form-switch">
                                <div
                                    className="tamanho p-2"
                                    onChange={handleTamanhoRadio}
                                    style={{
                                        width: "50%",
                                        fontSize: "1.25rem",
                                    }}
                                >
                                    <div className="col mb-1">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            value="Pequena"
                                            id="Pequena"
                                            name="tamanho"
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="tamanho1"
                                        >
                                            {"Pequena 🤏 15cm"}
                                        </label>
                                    </div>
                                    <div className="col mb-1">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            value="Media"
                                            id="Media"
                                            name="tamanho"
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="tamanho2"
                                        >
                                            {"Media 🫄🏻 20cm"}
                                        </label>
                                    </div>
                                    <div className="col mb-1">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            value="Grande"
                                            id="Grande"
                                            name="tamanho"
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="tamanho3"
                                        >
                                            {"Grande 📏 25cm"}
                                        </label>
                                    </div>
                                    <div className="col mb-1">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            value="Familia"
                                            id="Familia"
                                            name="tamanho"
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="tamanho4"
                                        >
                                            {"Família 😱 40cm"}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{ textAlign: "center" }}>
                        <h3 id="INGREDIENTES">Ingredientes</h3>
                        <h4
                            style={{
                                color: "white",

                                textShadow: "1px 1px 4px black",
                            }}
                        >
                            Escolha até 7 em cada metade
                        </h4>
                    </div>
                    {[...Array(metadeCount).keys()].map((index) => (
                        <Metade max_ingredientes={7} key={index} id={index} />
                    ))}

                    <div className="row section">
                        <div className="col-sm-12" style={{ display: "flex" }}>
                            {metadeCount > 1 && (
                                <button
                                    type="button"
                                    style={{ width: "100%" }}
                                    className="btn btn-danger"
                                    data-toggle="modal"
                                    data-target="#exampleModal"
                                    onClick={handleRemoveMetade}
                                >
                                    Remover Metade
                                </button>
                            )}
                            {metadeCount < maxMetades && (
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    style={{ width: "100%" }}
                                    data-toggle="modal"
                                    data-target="#exampleModal"
                                    onClick={handleAddMetade}
                                >
                                    Adicionar Metade
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div
                        className="col-md-12"
                        style={{
                            textAlign: "right",
                            marginBottom: "20px",
                        }}
                    >
                        <h3>Preço total:</h3>
                        <h3>
                            {erro === ""
                                ? "R$: " + precoTotal.toFixed(2)
                                : "Tamanho não selecionado"}
                        </h3>
                    </div>
                </div>
            </form>
            <div
                className="row section"
                style={{
                    textAlign: "center",
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "80%",
                    marginBottom: "1rem",
                }}
            >
                <button
                    className="btn btn-primary mb-3"
                    onClick={adicionarAoCarrinho}
                >
                    Adicionar ao carrinho
                </button>

                <Link to="/menu" className="btn btn-danger">
                    Cancelar
                </Link>
            </div>
        </>
    );
};

/* Adeus github copilot
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⢟⡫⢭⣥⢒⡖⢦⡲⢬⢭⣙⣛⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⣛⣛⣛⣛⡛⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⢏⡕⢮⠶⣙⠧⣎⢳⡚⣥⢛⡎⢧⢫⡜⣳⢲⣌⡻⢿⣿⠿⢟⡫⣱⢲⠼⣙⠶⣱⡚⣴⢋⡷⣒⢮⡙⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⢫⡜⢮⡜⢧⡫⣝⢺⡜⣣⡝⣎⢧⡽⢭⠶⣹⢬⡳⢎⡵⣳⠀⢚⢧⠳⣭⡚⣭⣙⢮⡱⣙⠦⣏⠶⣙⠮⣝⢦⡹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢏⡴⣓⢮⡓⢾⡱⡳⡭⢧⡛⠅⠛⣘⢃⡚⡙⠚⡁⠳⠹⣹⠶⣩⠟⡄⢫⢳⡥⣛⡴⣋⠶⣍⢧⣛⣬⢳⠭⣞⣜⡣⢗⡸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢣⡚⣴⢋⡶⣹⢣⢟⠱⡉⣤⠲⣭⢛⣬⠳⣭⡙⢯⡹⡝⡶⢤⣉⡑⠫⢧⠘⢧⠺⠱⠧⠫⠝⠮⠣⠗⠮⠭⠛⠖⠮⠝⡹⠆⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢱⢲⠙⣦⠛⣴⢫⡝⠀⣶⠙⡖⢻⡌⣷⣬⢳⢲⢹⢣⢳⡝⣼⢣⡏⣼⠓⣦⡄⠒⣶⠒⣶⢣⠛⡜⢣⡝⢲⣭⢹⠒⣶⠒⡖⢲⣬⡍⠛⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢃⠾⡸⣝⢬⡓⢧⡚⡵⣛⠬⣏⢵⢣⣛⡴⣋⢮⣛⠮⡝⠮⠵⠓⠮⠹⠅⠛⠦⠳⠄⠃⢟⡼⢮⣙⢧⢯⡹⢶⣩⠯⣝⠮⣝⡵⢫⢶⣙⣳⠲⣍⠻⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠇⣏⡳⡝⣜⡲⢭⣣⠽⡱⣍⡳⢎⣧⠻⣬⠳⠙⣈⣤⠒⠖⠲⢉⡛⣘⡉⢋⠫⠳⠝⠞⢲⢆⡌⠣⠏⠞⠎⣑⡡⢤⠥⠤⠲⠤⠲⠤⠦⠤⠤⢍⣌⣉⣘⠻⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⡿⢟⡩⡕⢸⢥⡳⣙⠦⣝⡲⢥⣏⡳⣭⢓⡯⠒⠛⣠⡔⠏⢊⡠⢖⡮⣝⣣⠝⡶⣩⢏⡳⡝⣎⢶⣒⢦⣉⠠⠒⢊⡓⣡⢡⢖⡲⡖⡶⣭⠳⡖⢶⠲⡖⡶⡤⣌⣈⠓⠎⣿⣿
⣿⣿⣿⣿⣿⣿⢋⠶⣙⣞⠀⣏⠶⡳⣍⢞⡲⢭⡳⢎⠵⠣⠖⠴⠫⠝⣀⡤⣞⡱⢏⡳⡞⡼⣜⣫⠵⠋⠾⢑⣛⣘⣂⣭⣬⣬⣵⡚⡹⣜⢧⠛⠮⠕⢋⣑⣊⡥⠍⠁⠉⠼⢤⣵⣬⣥⣉⡓⠬⢻
⣿⣿⣿⣿⡿⢡⢏⠾⣱⠎⠸⣬⢓⢷⡸⢎⡵⢣⢯⡁⠲⠖⠶⡲⣖⢻⣬⢳⠎⠽⢉⣓⣙⣡⡤⠖⢊⠉⠉⠉⠉⠛⢿⣿⣿⣿⣿⣷⣨⣤⣶⣾⣿⣿⣿⡟⠁⠀⣤⡀⠀⠀⠀⠉⢻⣿⣿⣿⣷⡼
⣿⣿⣿⡟⣡⠟⣬⢛⣬⢳⣚⡴⢫⢖⡹⢎⡼⣙⠮⣝⢳⣚⠶⣰⢤⡐⢶⣶⣾⣿⣿⣿⣿⠋⠀⠀⠛⠃⠀⢀⣀⠀⠀⠹⣿⣿⣿⢣⣿⣿⣿⣿⣿⣿⡟⠀⠀⠀⠀⠀⢠⣴⡄⠀⠀⢻⣿⣿⡿⢃
⣿⣿⡿⢡⡳⡹⢎⡳⢬⠳⡜⣜⡣⢏⡼⣍⠶⣍⠾⣌⠷⣬⢫⠵⡎⠹⣖⡬⡛⠿⣿⣿⣿⠀⠀⠀⢠⡄⠀⠘⠛⠀⠀⠀⠙⣋⣠⠘⠻⠿⠿⠿⠿⣿⡇⠀⠀⠘⠃⠀⠀⠉⠀⠀⢀⣘⡩⠕⣸⣿
⣿⣿⢱⢣⡳⣍⡳⣍⡳⢭⣙⠦⣝⢣⢞⡬⣓⢎⡳⢎⡳⢬⡣⢟⡜⡧⣄⣁⡛⠝⠦⡬⢭⠤⡤⢤⡄⡤⢤⠤⣤⠲⣜⠭⠛⠖⡡⣜⢫⡝⣫⡝⣏⢖⡲⢲⡔⣲⠲⣜⢣⢯⡹⣭⠳⢊⣴⣿⣿⣿
⣿⢃⢮⢳⡱⢣⡳⣜⡱⢫⣜⡹⢬⡓⢮⠖⣭⡚⡵⢫⣜⢣⡝⢮⡹⣜⡱⢞⣜⣣⠶⡰⢦⢤⡤⡤⣤⢤⡤⣤⢤⠤⠠⣖⠺⡴⣓⠮⣇⢯⢵⣚⡼⢪⡵⢳⣚⣥⠻⣜⡽⢲⠝⣂⣵⣿⣿⣿⣿⣿
⡏⡼⣊⢧⡝⣣⢳⡌⢷⡩⢖⡭⣣⢝⣣⠻⡴⡹⣜⢣⢎⡳⣜⢣⡳⢬⠳⣍⠶⣡⢟⡱⣏⡞⣼⡱⢧⠞⠑⣊⣡⢲⡹⡜⣭⠳⣍⢾⡡⣌⠚⠼⠜⡧⣝⠳⢮⠜⠻⠘⡈⣥⣾⣿⣿⣿⣿⣿⣿⣿
⡇⡳⢭⠶⣙⢖⡣⣝⡲⢭⠳⣜⡱⡺⣔⠻⣔⡳⣍⢮⢣⣓⢎⠧⡝⢮⡹⢬⠳⣍⠮⡵⢮⠑⢊⡡⣤⢲⡛⢶⣡⠷⡹⣜⠲⡝⣜⡲⡹⡜⢯⢖⠦⡄⣒⢲⡒⣎⡳⣝⡳⣬⠹⣿⣿⣿⣿⣿⣿⣿
⡇⡳⣜⠲⡝⣜⡣⣝⢣⠞⡦⣝⢣⢧⡹⢲⡍⣧⢹⡜⢮⣙⠞⡴⢳⢬⡓⢮⢖⡹⢆⡳⢎⡖⢮⡳⢭⢎⡗⢮⣙⠦⢧⣹⠲⣕⢫⢇⡧⢳⡜⡼⢲⠵⣋⢮⢳⡙⣧⡙⢧⣫⠖⡝⣿⣿⣿⣿⣿⣿
⢰⡹⢼⡹⡜⣥⠳⣎⡝⢮⡕⣎⠳⣎⠵⣓⠞⡴⣓⢎⡳⢎⡝⣎⢧⣣⢏⡳⢎⣳⠹⣜⠳⣎⢳⡙⣎⡳⣜⢣⠮⣝⡲⢥⣛⢬⡓⡮⣜⠳⣜⡱⢏⡞⣱⣋⠶⣙⠦⣝⢣⢎⡻⢵⡌⢿⣿⣿⣿⣿
⢰⣙⠮⡵⣙⢦⡛⡴⡹⢦⡹⣜⡹⢬⠳⣍⠾⡱⢭⢎⣗⣫⢞⡼⢣⡞⢮⡵⢫⣖⢻⢬⡳⢎⡧⣝⠲⣕⢮⡙⡞⡴⣙⠮⣜⡲⣍⢳⡜⡹⢆⡻⡜⡼⡱⢎⡝⢮⡹⢬⣣⢏⡼⣓⢞⢸⣿⣿⣿⣿
⢰⡩⣞⡱⣭⠲⣍⡳⣙⡖⡳⢬⠳⣍⡳⢎⡳⢭⢏⣞⡲⠃⢋⡈⢡⢉⣁⡈⢓⡘⠋⠶⢹⡙⡶⢭⣛⡼⡲⣝⡹⣜⣣⢻⣔⡳⢎⠷⣸⢍⡳⢵⡙⠶⣍⣳⢚⡧⣝⡳⣬⣛⡼⠭⠚⣀⠻⣿⣿⣿
⠠⣳⢜⡱⢎⡳⢥⡓⢧⣚⢭⢳⡙⢶⣩⢳⣙⠮⣏⠖⢁⡜⢢⢉⢆⠣⣄⠓⢦⡘⣌⠲⢄⡒⢤⠠⡄⢡⢉⡘⢃⠹⠌⠳⠎⠵⠫⠏⢧⢫⡝⡮⣝⢻⢬⠧⠛⠼⠊⠕⢃⡈⢄⢢⡑⠦⠁⣿⣿⣿
⡇⡳⢎⣝⡣⡝⢮⣙⠶⣩⢎⠧⣝⡲⢥⡳⡜⢯⡜⠀⡖⢌⠦⣉⢀⡁⣈⢈⣀⠐⣀⠓⠈⠲⠌⡱⢌⡃⠖⡌⢆⠣⣌⠱⣂⠦⣑⢢⢂⢆⡰⢠⢄⠢⣄⠒⡌⢦⠩⠜⢢⠩⠜⠢⠜⣠⣾⣿⣿⣿
⡇⣝⣚⠦⣝⠼⣣⢎⡳⢵⣊⠟⣴⣩⠳⣭⠙⠧⣜⡀⠜⠌⠲⠄⠣⠜⠤⢣⡘⠜⡤⣉⠎⣅⠒⡤⢠⠄⡤⢈⠌⡁⢂⠓⠀⠓⠀⠃⠎⠰⠈⠅⠊⠱⠀⠋⠘⢀⠋⣈⢁⠡⠌⡄⣿⣿⣿⣿⣿⣿
⣷⢘⠮⡝⣎⢳⡱⢎⡳⢣⣎⠻⣔⢣⣛⡼⣂⠱⣙⢞⠶⣲⠖⣞⡲⢞⡲⢆⡦⢥⣄⣁⣘⣀⠋⠔⠃⡚⡔⡩⢒⠥⢃⢎⡱⠩⡜⠱⡌⢣⠍⡜⣡⠣⡙⣌⠓⣌⠲⣁⠎⢥⠋⢄⣾⣿⣿⣿⣿⣿
⣿⣷⡸⡹⡜⡧⣝⠮⣕⣫⢜⣣⠝⣎⠶⡱⣏⠖⣌⡊⠛⢖⡻⣌⠷⣩⠞⣭⢚⡵⣊⢞⡲⣍⡻⣜⡳⣔⠦⡴⢤⠦⣤⢤⡤⢥⠬⡥⣌⠥⡬⣄⣁⢒⡑⣀⣋⡀⢓⣈⣈⣤⣶⣿⣿⣿⣿⣿⣿⣿
⡟⠛⠁⠠⣉⠑⠮⣛⡼⢲⡭⢖⡻⢬⣓⡳⣜⠻⣌⠷⡹⢎⡵⣊⢗⣣⠻⣔⢫⢖⡹⢎⡵⢎⡵⢎⡵⢎⡽⣜⢣⣛⡴⢣⠞⣭⢳⡱⢎⣳⢣⡗⢮⡳⢭⠓⣨⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⡇⠀⠠⠀⠀⠉⠲⠤⣌⡅⡋⠭⠳⢋⡶⣹⡜⣳⠭⣞⠵⣋⢶⣙⠮⡖⡽⢬⡳⢎⡳⢭⣚⠵⣎⡳⣜⣣⠞⣬⠳⣜⡼⣍⢻⡴⣣⠯⣝⡖⠯⠜⢃⣩⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⡇⠀⠠⠀⠃⢀⠀⠀⠀⠛⠣⢧⡤⣤⣀⣀⠛⠃⠿⠘⠟⡻⣜⠻⡼⣛⢧⢟⡸⣟⢣⡟⣸⢧⣘⢧⡸⣄⢿⡘⡿⣄⢧⡜⣧⠼⣃⠿⣘⣘⣤⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⡇⠀⠁⡐⠈⠀⡀⠂⠠⠀⡀⠀⠁⠁⠚⠨⠟⢹⠶⣙⡖⣲⠴⡤⣌⡍⣬⣈⣡⣈⣁⣉⣁⣈⣉⣈⣁⣉⣈⣉⣠⣉⡌⡬⡄⠂⠀⠘⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⡇⠀⠁⡀⠄⠁⡀⠄⠁⠠⠀⠂⠐⠀⠄⢀⠀⡀⠀⠀⢀⠀⠉⠁⠁⠈⠁⠊⠑⠊⠃⠙⠊⠑⠃⠋⠘⠃⠓⠊⠁⠈⠀⠀⠀⢀⠀⠂⢀⠈⠛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⡇⠀⠁⡀⠄⠂⠀⠄⠈⡀⠄⠁⡐⠈⠀⠄⠀⠄⠈⡀⠂⢀⠂⢀⠂⠐⠀⠄⠠⠀⠄⠀⠄⢀⠠⠀⡀⠄⢀⠠⠀⠂⡀⠁⡈⠀⠠⠈⢀⠀⠂⠀⠉⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⡇⠀⠁⡀⠄⠠⠁⢀⠂⠀⠄⠂⠀⠄⠁⠠⠈⢀⠐⠀⡐⠀⡀⠂⠀⠌⠀⡐⠀⡐⠀⡈⠀⠄⢀⠐⠀⡀⠂⠀⠄⠁⡀⠐⠀⡈⢀⠐⠀⠠⠈⢀⠁⠀⠙⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⡇⠀⠁⠀⠄⠐⠀⠂⠀⠌⠀⠠⠁⠠⠈⠀⠐⠀⠀⠂⠀⠐⠀⠠⠁⠀⠂⠀⠐⠀⠠⠀⠂⠀⠂⠀⠂⠀⠄⠁⠀⠂⠀⠄⠁⠀⠄⠠⠈⠀⠐⠀⠠⠁⠀⠸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿*/

export default () => {
    return (
        <div className={styles.body}>
            <CriarPizza />
        </div>
    );
};
