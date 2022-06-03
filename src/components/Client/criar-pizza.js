import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import MenuNav from "./menu-nav";
import { ingredientes as ingredientesBD } from "../store";
import { useDispatch } from "react-redux";
import { setQuantidadeDeQueijo, setQuantidadeDeMolho, } from "../../features/criar-pizzaSlice";
import { adicionarAoCarrinho } from "../../features/carrinhoSlice";
import { createBrowserHistory } from "history";
import Metade from "../geral/metade-pizza";

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
    const [erro, setErro] = useState('');
    
    const ingredientes = [[], [], [], []];

    // função que adiciona a pizza customizada ao carrinho
    const adicionarAoCarrinho = () => {
        if (tamanho === "") {
            setErro("Selecione um tamanho");
        } else {
            // Gerar objeto da pizza customizada
            let pizza = {
                tamanho: tamanho,
                id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                ingredientes: ingredientes,
                preco: precoTotal
            };
            // Adicionar a pizza customizada ao carrinho
            dispatch(adicionarAoCarrinho(pizza));

            // Redirecionar para a página de carrinho
            createBrowserHistory().push("/carrinho");
        }
    }

    const handleTamanhoRadio = (e) => {
        let valor = e.target.value;
        setTamanho(valor);
        setErro("");
        document.getElementById("INGREDIENTES").scrollIntoView({ behavior: "smooth" });
    }

    const handleChangeIngredientes = (metade, ingredientes) => {
        ingredientes[metade] = ingredientes;
    }

    useEffect(() => {
        if (erro) {
            setErro('');
        }
        if (tamanho === '') {
            setErro('Selecione um tamanho');
        } else {
            let preco = 0;
            switch (tamanho) {
                case 'Pequena':
                    preco += 10;
                    break;
                case 'Media':
                    preco += 15;
                    break;
                case 'Grande':
                    preco += 20;
                    break;
                case 'Familia':
                    preco += 25;
                    break;
                default:
                    break;
            }
            for (let i = 0; i < ingredientes.length; i++) {

            }
            setPrecoTotal(preco);
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
                        <h5 className="text-center" style={{
                            "color": "red",
                            "textShadow": "0px 0px 10px black"
                        }}>{erro}</h5>
                    </div>
                    <div className="row section">
                        <p><b>Tamanho</b></p>
                        <div>
                            <div class="form-check form-switch">
                                <div className="tamanho p-2" onChange={handleTamanhoRadio}
                                    style={{
                                        "width": "50%",
                                        "font-size": "1.25rem"
                                    }}>
                                    <div className="col mb-1">
                                        <input className="form-check-input" type="radio" value="Pequena" id="Pequena" name="tamanho" />
                                        <label className="form-check-label" htmlFor="tamanho1" >Pequena 🤏 15cm
                                        </label>
                                    </div>
                                    <div className="col mb-1">
                                        <input className="form-check-input" type="radio" value="Media" id="Media" name="tamanho" />
                                        <label className="form-check-label" htmlFor="tamanho2" >Media 🫄🏻 20cm
                                        </label>
                                    </div>
                                    <div className="col mb-1">
                                        <input className="form-check-input" type="radio" value="Grande" id="Grande" name="tamanho" />
                                        <label className="form-check-label" htmlFor="tamanho3" >Grande 📏  25cm
                                        </label>
                                    </div>
                                    <div className="col mb-1">
                                        <input className="form-check-input" type="radio" value="Familia" id="Familia" name="tamanho" />
                                        <label className="form-check-label" htmlFor="tamanho4" >Família 😱 40cm
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{ "textAlign": "center", }} >
                        <h3
                            id="INGREDIENTES"
                        >Ingredientes</h3>
                        <h4
                            style={{
                                "color": "white",

                                "textShadow": "1px 1px 4px black"
                            }}
                        >Escolha até 7 em cada metade</h4>
                    </div>
                    {
                        [...Array(4).keys()].map(index => 
                            <Metade max_ingredientes={5} key={index} id={index} active={true} ingredientes={ingredientes[index]} onIngredientesChange={(ingredientes) => handleChangeIngredientes(index, ingredientes)} />
                        )
                    }
                </div>
                <hr />
                <div className="row">
                    <div className="col-md-12" style={{ "textAlign": "right", "marginBottom": "20px" }}>
                        <h3>Preço total:</h3>
                        <h3>
                            {erro === '' ? "R$: " + precoTotal.toFixed(2) : "Tamanho não selecionado"}
                        </h3>
                    </div>
                </div>
            </form>
            <div className="row" style={{ "textAlign": "center", }}>

                <Link to="/menu" style={{ "margin": " 0 5px" }} className="btn btn-lg btn-danger mb-5">Cancelar</Link>

                <button className="btn btn-lg btn-primary mb-5" onClick={() => adicionarAoCarrinho()}>Adicionar ao carrinho</button>
            </div>
        </>
    );
}

export default CriarPizza;
