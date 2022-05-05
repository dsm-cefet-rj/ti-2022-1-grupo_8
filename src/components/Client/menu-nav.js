import React from 'react';

const MenuNav = (props) => {
    let atual = props.Atual;
    console.log(atual);
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-2">
            <a className="navbar-brand" href="#">Pizzaria</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
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
                </ul>
            </div>
        </nav>
    )
}

export default MenuNav;