import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCarrinho } from "../../features/carrinhoSlice";
/* 
Componente: MenuNav
Descrição: Componente que renderiza o menu de navegação para os clientes
*/
const MenuNav = (props) => {
    const atual = props.Atual; // Página atual
    const atualTexto = "😋";
    const carrinho = useSelector(selectCarrinho);
    const [collapse, setCollapse] = useState(false); // estado que controla o collapse do menu

    const toggle = () => setCollapse(!collapse); // função que altera o estado do collapse

    // set screen title
    useEffect(() => {
        let title = "";
        switch (atual) {
            case "menu":
                title = "Pizzaria ON - Menu";
                break;
            case "carrinho":
                title = "Pizzaria ON - Carrinho";
                break;
            case "criar-pizza":
                title = "Pizzaria ON - Criar Pizza";
                break;
            default:
                title = "Pizzaria ON";
                break;
        }
        document.title = title;
    }, [atual, carrinho]);

    /* Renderização do componente */
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
            <a
                className="navbar-brand"
                style={{
                    fontSize: "1.5rem",
                    marginLeft: "1rem",
                }}
            >
                Pizzaria ON
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
                    <a className="btn btn-primary " href="/criar-pizza">
                        Criar Pizza
                        {atual === "criar-pizza" ? (
                            <span className="badge badge-secondary">
                                {atualTexto}
                            </span>
                        ) : null}
                    </a>
                    <a className="btn btn-primary " href="/carrinho">
                        Carrinho
                        {atual === "carrinho" ? (
                            <span className="badge badge-secondary">
                                {atualTexto}
                            </span>
                        ) : null}
                        {carrinho.length > 0 ? (
                            <span
                                className="badge"
                                style={{
                                    backgroundColor: "white",
                                    color: "black",
                                    marginLeft: "0.5rem",
                                }}
                            >
                                {carrinho.length}{" "}
                                {carrinho.length !== 1 ? "itens" : "item"} no
                                carrinho{" "}
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

export default MenuNav;
