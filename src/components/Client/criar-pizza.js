import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import MenuNav from "./menu-nav";
import { ingredientes as ingredientesBD } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { adicionarAoCarrinho } from "../../features/carrinhoSlice";
import { createBrowserHistory } from "history";
import Metade from "../geral/metade-pizza";
import { selectMetades } from "../../features/ingredientes-metadeSlice";
import { ingredientes as ingredientesDB } from "../store";

/* 
Componente: CriarPizza
Descrição:  Componente que renderiza a página de criação de pizza
*/
const CriarPizza = () => {
    // Dispatch do Redux
    const dispatch = useDispatch();

    // Variáveis que controlam estados do componente.
    const [tamanho, setTamanho] = useState("");
    const [precoTotal, setPrecoTotal] = useState(0);
    const [erro, setErro] = useState("");
    const ingredientes = useSelector(selectMetades);

    // função que adiciona a pizza customizada ao carrinho
    const adicionarPizzaAoCarrinho = () => {
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
                let ingredientes_string = (
                    ingredientes.flat().join("") + tamanho
                )
                    .split("")
                    .reduce((soma, elemento) => {
                        return soma + elemento.charCodeAt(0);
                    }); // No clue what this is, at this point its all made up
                return Math.abs(ingredientes_string);
            };
            atualizarPreco();
            // Gerar objeto da pizza customizada
            let pizza = {
                id: generate_id(),
                nome: "Pizza Customizada" + tamanho,
                preco: precoTotal,
                quantidade: 1,
                tamanho: tamanho,
                Metades: ingredientes,
                descricao: "Ingredientes: " + ingredientes.flat().join(", "),
            };
            // Adicionar a pizza customizada ao carrinho
            dispatch(adicionarAoCarrinho(pizza));
            // Redirecionar para a página de carrinho
            createBrowserHistory().push("/carrinho");
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

        ingredientes.flat().forEach((ingrediente) => {
            preco += ingredientesDB.find((i) => i.nome === ingrediente).preco;
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

    useEffect(() => {
        if (erro) {
            setErro("");
        }
        if (tamanho === "") {
            setErro("Selecione um tamanho");
        } else {
            atualizarPreco();
        }
    }, [tamanho]);

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
                                textShadow: "0px 0px 10px black",
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
                    <Metade max_ingredientes={7} key="1" id={1} active={true} />
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
            <div className="row" style={{ textAlign: "center" }}>
                <Link
                    to="/menu"
                    style={{ margin: " 0 5px" }}
                    className="btn btn-lg btn-danger mb-5"
                >
                    Cancelar
                </Link>

                <button
                    className="btn btn-lg btn-primary mb-5"
                    onClick={adicionarPizzaAoCarrinho}
                >
                    Adicionar ao carrinho
                </button>
            </div>
        </>
    );
};

export default CriarPizza;
