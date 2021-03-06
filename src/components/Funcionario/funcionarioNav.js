import { React, useState } from "react";
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
                        justifyContent: "right",
                        alignItems: "center",
                        width: "100%",
                        padding: "0 15% 0 2rem",
                    }}
                >
                    <a className="btn btn-danger" href="/">
                        Sair 👋
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default FuncionarioNav;
