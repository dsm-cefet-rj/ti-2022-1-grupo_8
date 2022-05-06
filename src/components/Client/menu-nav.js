import React, { useState } from 'react';

const MenuNav = (props) => {
    const atual = props.Atual;
    
    const [collapse, setCollapse] = useState(false);

    const toggle = () => setCollapse(!collapse);

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
                                atual === "menu" ? (<span className="sr-only">(Atual)</span>) : null
                            }
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/carrinho">Carrinho
                            {
                                atual === "carrinho" ? (<span className="sr-only">(Atual)</span>) : null
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