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
    const [ingredientes, setIngredientes] = useState([]);

    // função que manipula o radio button de tamanho
    const handleTamanho = (valor) => {
        console.log(valor);
        setTamanho(valor);
    }

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
                        <div className="col">
                            <p><b>Tamanho</b></p>
                            <div className="scrollmenu">
                                <div className="tamanho">
                                    <div className="col">
                                        <input className="form-check-input" type="radio" value="Pequena" onChange={() => { handleTamanho("Pequena"); }} id="Pequena" name="tamanho" />
                                        <label className="form-check-label" htmlFor="tamanho1" >Pequena</label>
                                    </div>
                                    <div className="col">
                                        <input className="form-check-input" type="radio" value="Media" onChange={() => { handleTamanho("Media"); }} id="Media" name="tamanho" />
                                        <label className="form-check-label" htmlFor="tamanho2" >Media</label>
                                    </div>
                                    <div className="col">
                                        <input className="form-check-input" type="radio" value="Grande" onChange={() => { handleTamanho("Grande"); }} id="Grande" name="tamanho" />
                                        <label className="form-check-label" htmlFor="tamanho3" >Grande</label>
                                    </div>
                                    <div className="col">
                                        <input className="form-check-input" type="radio" value="Familia" onChange={() => { handleTamanho("Familia"); }} id="Familia" name="tamanho" />
                                        <label className="form-check-label" htmlFor="tamanho4" >Família</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <h5>Ingredientes</h5>
                        <p>Escolha até 5 em cada metade</p>
                    </div>
                    <Metade max_ingredientes={5} key="1" id={1} active={true} />
                </div>
                <hr />
                <div className="row section">
                    <p><b>Preço total:</b></p>
                    <p>
                        {erro === '' ? "R$: "+ precoTotal.toFixed(2) : "Tamanho não selecionado"}
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