import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import MenuNav from "./menu-nav";
import { ingredientes as ingredientesBD } from "../store";
import { useDispatch } from "react-redux";
import { setQuantidadeDeQueijo, setQuantidadeDeMolho, } from "../../features/criar-pizzaSlice";
import { setCarrinho } from "../../features/carrinhoSlice";
import { createBrowserHistory } from "history";
import  Metade  from "../geral/metade-pizza";

/* 
Componente: CriarPizza
Descrição:  Componente que renderiza a página de criação de pizza
*/
const CriarPizza = () => {
    // Dispatch do Redux
    const dispatch = useDispatch();

    // Variáveis que controlam estados do componente.
    const [queijo, setQueijo] = useState(1);
    const [molho, setMolho] = useState(1);
    const [tamanho, setTamanho] = useState("");
    const [precoTotal, setPrecoTotal] = useState(0);
    const [erro, setErro] = useState('');

    // função que manipula o evento slide de queijo
    const handleQuantidadeQueijo = (valor) => {
        setQueijo(valor);
        dispatch(setQuantidadeDeQueijo(valor));
        handlePrecoTotal();
    }

    // função que manipula o evento slide de molho
    const handleQuantidadeMolho = (valor) => {
        setMolho(valor);
        dispatch(setQuantidadeDeMolho(valor));
        handlePrecoTotal();
    }

    // função que manipula o radio button de tamanho
    const handleTamanho = (valor) => {
        setTamanho(valor);
        handlePrecoTotal();
    }

    // função que manipula o valor total da pizza
    const handlePrecoTotal = () => {
        if (erro) {
            setErro('');
        }
        if (tamanho === '') {
            setErro('Selecione um tamanho');
        } else {
            let preco = 0;
            if (queijo > 0) {
                preco += queijo * 0.5;
            }
            if (molho > 0) {
                preco += molho * 0.5;
            }
            switch (tamanho) {
                case 'Pequena':
                    preco += 10;
                    break;
                case 'Média':
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
            setPrecoTotal(preco);
        }
    }

    // função que adiciona a pizza customizada ao carrinho
    const adicionarAoCarrinho = () => {
        if (tamanho === "") {
            setErro("Selecione um tamanho");
        } else {
            // pegar ingredientes de todas as metades
            let metades = [];
            for (let i = 1; i <= 4; i++) {
                metades.push(document.getElementById(i.toString()).children[1].children);
            }
            // criar array de ingredientes
            let ingredientes = [];
            for (let i = 0; i < metades.length; i++) {
                for (let j = 0; j < metades[i].length; j++) {
                    if (metades[i][j].children[0].checked) {
                        ingredientes.push(metades[i][j].children[0].value);
                    }
                }
            }
            // Gerar objeto da pizza customizada
            let pizza = {
                tamanho: tamanho,
                queijo: queijo,
                molho: molho,
                id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                ingredientes: ingredientes,
                preco: precoTotal
            };
            // Adicionar a pizza customizada ao carrinho
            console.log(pizza);
            //dispatch(setCarrinho(pizza));
            // Redirecionar para a página de carrinho
            //createBrowserHistory().push("/carrinho");
            alert("Pizza adicionada ao carrinho");
        }
    }

    // Renderiza a página de criação de pizza.
    return (
        <>
            <MenuNav Atual="criar-pizza" />
            <form>
                <div className="container">
                    <div className="row">
                        <h1 className="text-center">Monte sua pizza</h1>
                    </div>
                    <div className="row">
                        <h5 className="text-center" style={{ "color": "red" }}>{erro}</h5>
                    </div>
                    <div className="row section">
                        <section style={{ "margin": "50px auto", "width": "80%", }}>
                            <label htmlFor="qtdQueijo" className="form-label">Quantidade de queijo</label>
                            <input
                                type="range"
                                className="form-range"
                                min="0"
                                step=".1"
                                max="2"
                                value={queijo}
                                onChange={(e) => { handleQuantidadeQueijo(e.target.value); }}
                                id="qtdQueijoRange" />
                            <label htmlFor="qtdMolho" className="form-label">Quantidade de molho</label>
                            <input
                                type="range"
                                className="form-range"
                                min="0"
                                step=".1"
                                max="2"
                                value={molho}
                                onChange={(e) => { handleQuantidadeMolho(e.target.value); }}
                                id="qtdMolhoRange" />
                        </section>
                    </div>
                    <div className="row section">
                        <div className="col">
                            <p><b>Tamanho</b></p>
                            <div className="scrollmenu">
                                <div className="tamanho">
                                    <div className="col">
                                        <input className="form-check-input" type="radio" value="" id="Pequena" name="tamanho" />
                                        <label className="form-check-label" htmlFor="tamanho1" onChange={() => { handleTamanho("Pequena"); }}>Pequena</label>
                                    </div>
                                    <div className="col">
                                        <input className="form-check-input" type="radio" value="" id="Media" name="tamanho" />
                                        <label className="form-check-label" htmlFor="tamanho2" onChange={() => { handleTamanho("Media"); }}>Media</label>
                                    </div>
                                    <div className="col">
                                        <input className="form-check-input" type="radio" value="" id="Grande" name="tamanho" />
                                        <label className="form-check-label" htmlFor="tamanho3" onChange={() => { handleTamanho("Grande"); }}>Grande</label>
                                    </div>
                                    <div className="col">
                                        <input className="form-check-input" type="radio" value="" id="Familia" name="tamanho" />
                                        <label className="form-check-label" htmlFor="tamanho4" onChange={() => { handleTamanho("Familia"); }}>Família</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <h5>Ingredientes</h5>
                        <p>Escolha até 5 em cada metade</p>
                    </div>
                    <Metade key="1" id={1} active={true} />
                </div>
                <hr />
                <div className="row section">
                    <p><b>Preço total:</b></p>
                    <p>R$
                        {precoTotal.toFixed(2)}
                    </p>
                </div>
                <hr />
            </form>
            <div style={{ "textAlign": "center", }}>
                <Link to="/menu" style={{ "margin": " 0 5px" }} className="btn btn-outline-danger">Cancelar</Link>
                <button className="btn btn-primary" onClick={() => adicionarAoCarrinho()}>Adicionar ao carrinho</button>
            </div>
        </>
    );
}

export default CriarPizza;