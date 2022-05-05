import MenuNav from './menu-nav';
import React from 'react';

const MenuCliente = () => {
    return (
        <>
            <MenuNav Atual='menu' />
            <div className="container mb-2 p-1 bg-transparent">
                <div className="row">
                    <h1 className="text-center">Pizzas mais pedidas</h1>
                </div>
                <div className="row">

                </div>
                <hr />
                <div className="row mt-2">
                    <h1 className="text-center">Crie sua própria pizza</h1>
                </div>
                <div className="row">

                </div>
                <hr />
                <div className="row mt-2">
                    <h3 className="text-center">Bebidas</h3>
                </div>
                <div className="row">

                </div>
                <hr />
                <div className="row mt-2">
                    <h3 className="text-center">Outros Sabores</h3>
                </div>
                <div className="row">

                </div>
            </div>
        </>
    )
}

export default MenuCliente;