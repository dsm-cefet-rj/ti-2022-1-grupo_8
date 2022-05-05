import './App.css';
import { Route, Routes} from 'react-router-dom';
import React from 'react';
import Login from './login';
import MenuCliente from './components/Client/menu.js';
import Carrinho from './components/Client/carrinho';
import CriarPizza from './components/Client/criar-pizza';
import CriarUsuario from './components/Client/criar-usuario';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/criar-usuario" element={<CriarUsuario />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/criar-pizza" element={<CriarPizza />} />
            <Route path="/menu" element={<MenuCliente />} />
        </Routes >
    );
}

export default App;
