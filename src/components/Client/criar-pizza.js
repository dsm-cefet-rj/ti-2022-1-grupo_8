import React from "react";
import { useState } from "react";
import MenuNav from "./menu-nav";
import { ingredientes } from "../store";

const Metade = () => {
    return (<>
        <div className="row section">
            <div className="col">
                <p><b>Metade 1</b></p>
                <div className="scrollmenu">
                    {ingredientes.map(ingrediente => (
                        <div className="ingrediente">
                            <img src={ingrediente.imagem} alt="Pizza" style={{ "width": "100px", }} />
                            <br />
                            <input className="form-check-input" type="checkbox" value="" id="ingrediente1" />
                            <label className="form-check-label" for="ingrediente1">
                                {ingrediente.nome}
                            </label>
                            <p>R$ {ingrediente.preco}</p>
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
        <hr />
    </>);
}


const CriarPizza = () => {
    const [ingredientes, setIngredientes] = useState([]);
    const [precoTotal, setPrecoTotal] = useState(0);

    const handleChange = (e) => {
        if (e.target.checked) {
            setIngredientes([...ingredientes, e.target.value]);
        } else {
            setIngredientes(ingredientes.filter(ingrediente => ingrediente !== e.target.value));
        }
    }

    const handlePrecoTotal = () => {
        let total = 0;
        ingredientes.map(ingrediente => {
            total += ingrediente.preco;
        }
        )
        setPrecoTotal(total);
    }

    return (
        <>
            <MenuNav />
            <form>
                <div className="container">
                    <div className="row">
                        <h1 className="text-center">Monte sua pizza</h1>
                    </div>
                    <div className="row section">
                        <section style={{ "margin": "50px auto", "width": "80%", }}>
                            <label for="qtdQueijo" className="form-label">Quantidade de queijo</label>
                            <input type="range" className="form-range" min="0" step=".1" max="2" id="qtdQueijoRange" />

                            <label for="qtdMolho" className="form-label">Quantidade de molho</label>
                            <input type="range" className="form-range" min="0" step=".1" max="2" id="qtdMolhoRange" />
                        </section>
                    </div>
                    <div className="row section">
                        <div className="col">
                            <p><b>Tamanho</b></p>
                            <div className="scrollmenu">
                                <div className="tamanho">
                                    <input className="form-check-input" type="radio" value="" id="tamanho1" name="tamanho" />
                                    <label className="form-check-label" for="tamanho1">
                                        Pequena
                                    </label>
                                    <br />
                                    <input className="form-check-input" type="radio" value="" id="tamanho2" name="tamanho" />
                                    <label className="form-check-label" for="tamanho2">
                                        Media
                                    </label>
                                    <br />
                                    <input className="form-check-input" type="radio" value="" id="tamanho3" name="tamanho" />
                                    <label className="form-check-label" for="tamanho3">
                                        Grande
                                    </label>
                                    <br />
                                    <input className="form-check-input" type="radio" value="" id="tamanho4" name="tamanho" />
                                    <label className="form-check-label" for="tamanho4">
                                        Familia
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <h5>Ingredientes</h5>
                        <p>Escolha até 5 em cada metade</p>
                    </div>
                    <Metade />
                    <div className="row section">
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                            Adicionar Nova Metade </button>
                    </div>
                </div>
                <hr />
                <div className="row section">
                    <p><b>Preço total:</b></p>
                    <p>R$
                        {precoTotal.toFixed(2)}
                    </p>
                </div>
                <hr />
                <div style={{ "text-align": "center", }}>
                    <a href="Cliente Menu.html"><button className="btn btn-outline-danger"
                        style={{ "margin": " 0 5px" }}>Cancelar</button></a>
                    <a href="Cliente Carrinho.html"><button className="btn btn-primary">Adicionar ao carrinho</button></a>
                </div>
            </form>
        </>
    );
}

export default CriarPizza;