import { React, useEffect, useState } from "react";

/* 
Componente: AdminNav
Descrição: Componente que renderiza o menu de navegação do administrador
*/
const AdminNav = (props) => {
    const atual = props.Atual; /* Página atual */
    const atualTexto = "🧑‍💻";
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
                break;
            case "gerir-usuarios":
                title += " - Usuários";
                break;
            default:
                break;
        }
        document.title = title;
    }, [atual]);

    /* Renderização do componente */
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
            <a className="navbar-brand">Pizzaria ON - Administrador 🔑</a>
            <button className="navbar-toggler" type="button" onClick={toggle}>
                <span className="navbar-toggler-icon">🔐</span>
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
                    <a className="btn btn-primary " href="/menu-admin">
                        Menu Administrador
                        {atual === "menu" ? (
                            <span className="badge badge-secondary">
                                {atualTexto}
                            </span>
                        ) : null}
                    </a>

                    <a className="btn btn-primary " href="/gerir-ingredientes">
                        Gerir Ingredientes
                        {atual === "ingredientes" ? (
                            <span className="badge badge-secondary">
                                {atualTexto}
                            </span>
                        ) : null}
                    </a>

                    <a className="btn btn-primary " href="/gerir-pizzas">
                        Gerir Pizzas
                        {atual === "pizzas" ? (
                            <span className="badge badge-secondary">
                                {atualTexto}
                            </span>
                        ) : null}
                    </a>

                    <a className="btn btn-primary " href="/gerir-produtos">
                        Gerir Produtos
                        {atual === "gerir-produtos" ? (
                            <span className="badge badge-secondary">
                                {atualTexto}
                            </span>
                        ) : null}
                    </a>

                    <a className="btn btn-primary " href="/gerir-usuarios">
                        Gerir Usuários
                        {atual === "gerir-usuarios" ? (
                            <span className="badge badge-secondary">
                                {atualTexto}
                            </span>
                        ) : null}
                    </a>

                    <a className="btn btn-danger " href="/login">
                        {" "}
                        Sair 👋{" "}
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default AdminNav;
