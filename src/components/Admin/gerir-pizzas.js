import AdminNav from "./admin-nav";
import { pizzas as pizzaBD } from "../store";
import Metade from "../geral/metade-pizza";
import React from "react";
import { useState } from "react";


/* 
Componente: GerirPizzas
Descrição: Componente que renderiza a página de gerenciamento de pizzas
*/
const GerirPizzas = () => {
    const pizzas = pizzaBD.sort((a, b) => {
        return b.quant_comprada - a.quant_comprada;
    });

    const [queijo, setQueijo] = useState(1);
    const [molho, setMolho] = useState(1);
    const [tamanho, setTamanho] = useState("");
    const [erro, setErro] = useState('');

    // função que manipula o evento slide de queijo
    const handleQuantidadeQueijo = (valor) => {
        setQueijo(valor);
    }

    // função que manipula o evento slide de molho
    const handleQuantidadeMolho = (valor) => {
        setMolho(valor);
    }

    // função que manipula o radio button de tamanho
    const handleTamanho = (valor) => {
        setTamanho(valor);
    }

    return (
        <>
            <AdminNav Atual="pizzas" />
            <div className="container mb-2 p-1 bg-transparent">
                <div className="row">
                    <h1>Gerenciar Pizzas</h1>
                    <div className="row section mb-3">
                    
                            <h4>Adicionar Nova ou Editar Pizza</h4>
                    
                    </div>
                    <h3><b>Pizzas Cadastradas</b></h3>
                </div>

                

                <div className="row section">
                    <div className="scrollmenu">
                        {pizzas.map(pizza => (
                            <div style={{
                                "width": "18rem",
                                "margin": "0.5rem",
                                "border": "1px solid #ccc",
                                "borderRadius": "0.25rem",
                                "padding": "1rem",
                                "display": "flex",
                                "flexDirection": "column",
                                "justifyContent": "space-between",
                                "alignItems": "center",
                            }} key={pizza.id}>
                                <img className="card-img-top" src={pizza.imagem} alt={pizza.nome} style={{
                                    "width": "12rem",
                                    "height": "12rem",
                                    "objectFit": "cover",
                                }} />
                                <div className="card-body">
                                    <h5 className="card-title">{pizza.nome}</h5>
                                    <button className="btn btn-lg btn-primary btn-success">Alterar</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <form>
                    
                    <div className="row section">
                        <div className="form-group">
                            <label htmlFor="exampleFormControlSelect1">Nome</label>
                            <input type="text" className="form-control" id="nomePizza" placeholder="Nome da pizza" />
                            <label htmlFor="imagem">Imagem</label>
                            <input type="file" className="form-control" id="imagem" name="imagem" placeholder="Imagem" />
                        </div>
                    </div>
                    <div className="row">
                    <hr/>
                        <h3>Ingredientes</h3>
                        <p>Escolha até 5 em cada metade</p>
                    </div>
                    <Metade key="1" id={1} active={true} />
                    <hr/>
                    <div style={{ "textAlign": "center", }} >
                        <button className="btn btn-primary">Criar</button>
                        <a href="/menu-admin" style={{ "margin": " 0 5px" }} className="btn btn-outline-danger">Cancelar</a>
                    </div>
                </form>
            </div >

        </>
    );
}

export default GerirPizzas;