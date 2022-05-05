import './App.css';
import { Route, Routes} from 'react-router-dom';
import React from 'react';
import Login from './login';
import { Provider } from "react-redux";
import { BrowserRouter, Route, Link } from "react-router-dom";
import MenuCliente from './components/Client/menu.js';
import Carrinho from './components/Client/carrinho';
import CriarPizza from './components/Client/criar-pizza';
import CriarUsuario from './components/Client/criar-usuario';
import MenuAdmin from './components/Admin/menu-admin';
import GerirPizzas from './components/Admin/gerir-pizzas';
import GerirIngredientes from './components/Admin/gerir-ingredientes';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/criar-usuario" element={<CriarUsuario />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/criar-pizza" element={<CriarPizza />} />
            <Route path="/menu" element={<MenuCliente />} />

            <Route path="/menu-admin" element={<MenuAdmin />} />
            <Route path="/gerir-pizzas" element={<GerirPizzas />} />
            <Route path="/gerir-ingredientes" element={<GerirIngredientes />} />

        </Routes >
    );
}

export default App;
