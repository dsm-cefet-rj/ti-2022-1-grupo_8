import { React, useEffect, useState } from "react";
import { selectCarrinho } from "../../features/carrinhoSlice";
import { useSelector } from "react-redux";
import styled from "./funcionarioNav.module.scss";

/* 
Componente: FuncionárioNav
Descrição: Componente que renderiza o menu de navegação para os funcionários
*/

const FuncionarioNav = (props) => {
    const atual = props.Atual; // Página atual
    const atualTexto = "🚚";

    const [collapse, setCollapse] = useState(false); // estado que controla o collapse do menu

    const toggle = () => setCollapse(!collapse); // função que altera o estado do collapse

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
            <a
                className="navbar-brand"
                style={{
                    fontSize: "1.5rem",
                    marginLeft: "1rem",
                }}
            >
                Pizzaria ON - Funcionário 💼
            </a>
            <button className="navbar-toggler" type="button" onClick={toggle}>
                <span className="navbar-toggler-icon">🍕</span>
            </button>

            <div
                className={`collapse navbar-collapse ${collapse ? "show" : ""}`}
                id="navbarNav"
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                        width: "100%",
                        padding: "0 2rem 0 2rem",
                    }}
                >
                    <a className="btn btn-primary " href="/menu">
                        Menu 📑
                        {atual === "menu" ? (
                            <span className="badge badge-secondary">
                                {atualTexto}
                            </span>
                        ) : null}
                    </a>
                    <a className="btn btn-danger " href="/">
                        Sair 👋
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default FuncionarioNav;
