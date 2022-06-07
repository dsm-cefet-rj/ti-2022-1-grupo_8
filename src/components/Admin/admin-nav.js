import { React, useState, useEffect } from "react";

/* 
Componente: AdminNav
Descrição: Componente que renderiza o menu de navegação do administrador
*/
const AdminNav = (props) => {
    let atual = props.Atual; /* Página atual */
    /* Renderização do componente */

    const [collapse, setCollapse] = useState(false); // estado que controla o collapse do menu

    const toggle = () => setCollapse(!collapse); // função que altera o estado do collapse

    // set screen title
    useEffect(() => {
        let title = "Adminitrador - Pizzaria ON ";
        switch (atual) {
            case "menu":
                title += " - Menu";
                break;
            case "ingredientes":
                title += " - Ingredientes";
                break;
            case "pizzas":
                title += " - Pizzas";
                break;
            case "produtos":
                title += " - Produtos";
            default:
                break;
        }
        document.title = title;
    }, [atual]);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-2">
            <a className="navbar-brand">Administrador 🔑</a>
            <button className="navbar-toggler" type="button" onClick={toggle}>
                <span className="navbar-toggler-icon"></span>
            </button>
            <div
                className={`collapse navbar-collapse ${collapse ? "show" : ""}`}
                id="navbarNav"
            >
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="/menu-admin">
                            Menu Administrador
                            {
                                atual === "menu" ? (
                                    <span className="sr-only">(🧑‍💻)</span>
                                ) : null /* Se a página atual for a página de menu, renderiza um span com a classe sr-only */
                            }
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/gerir-ingredientes">
                            Gerir Ingredientes
                            {
                                atual === "ingredientes" ? (
                                    <span className="sr-only">(👩‍💻)</span>
                                ) : null /* Se a página atual for a página de ingredientes, renderiza um span com a classe sr-only */
                            }
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/gerir-pizzas">
                            Gerir Pizzas
                            {
                                atual === "pizzas" ? (
                                    <span className="sr-only">(🧑‍💻)</span>
                                ) : null /* Se a página atual for a página de pizzas, renderiza um span com a classe sr-only */
                            }
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/gerir-produtos">
                            Gerir Produtos
                            {
                                atual === "gerir-produtos" ? (
                                    <span className="sr-only">(👩‍💻)</span>
                                ) : null /* Se a página atual for a página de pizzas, renderiza um span com a classe sr-only */
                            }
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/">
                            Sair 👋
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default AdminNav;
