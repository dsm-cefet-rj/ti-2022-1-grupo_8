import React, { useState } from 'react';

/* 
Componente: MenuNav
Descrição: Componente que renderiza o menu de navegação para os clientes
*/
const MenuNav = (props) => {
    const atual = props.Atual; // Página atual

    const [collapse, setCollapse] = useState(false); // estado que controla o collapse do menu

    const toggle = () => setCollapse(!collapse); // função que altera o estado do collapse

    // Renderização do componente
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-2">
            <a className="navbar-brand" href="#">Pizzaria</a>
            <button className="navbar-toggler" type="button" onClick={toggle}>
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`collapse navbar-collapse ${collapse ? 'show' : ''}`} id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="/menu">Menu
                            {
                                atual === "menu" ? (<span className="sr-only">(Atual)</span>) : null /* Se a página atual for a página de menu, renderiza um span com a classe sr-only */
                            }
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/carrinho">Carrinho
                            {
                                atual === "carrinho" ? (<span className="sr-only">(Atual)</span>) : null /* Se a página atual for a página de carrinho, renderiza um span com a classe sr-only */
                            }
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/">Sair</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default MenuNav;