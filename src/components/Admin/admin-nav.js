import React from 'react';

const AdminNav = (props) => {
    let atual = props.Atual;
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-2">
            <a className="navbar-brand" href="#">Administrador</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="/menu-admin">Menu Administrador
                            {
                                atual === "menu" ? (<span className="sr-only">(Atual)</span>) : null
                            }
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/gerir-ingredientes">Gerir Ingredientes
                            {
                                atual === "ingredientes" ? (<span className="sr-only">(Atual)</span>) : null
                            }
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/gerir-pizzas">Gerir Pizzas
                            {
                                atual === "pizzas" ? (<span className="sr-only">(Atual)</span>) : null
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

export default AdminNav;