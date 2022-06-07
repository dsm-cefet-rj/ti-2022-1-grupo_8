import "./App.css";
import React from "react";
import Login from "./login";
import { Route, Routes } from "react-router-dom";
import MenuCliente from "./components/Cliente/menu.js";
import Carrinho from "./components/Cliente/carrinho";
import CriarPizza from "./components/Cliente/criar-pizza";
import CriarUsuario from "./components/Cliente/criar-usuario";
import MenuAdmin from "./components/Admin/menu-admin";
import GerirPizzas from "./components/Admin/gerir-pizzas";
import GerirIngredientes from "./components/Admin/gerir-ingredientes";
import GerirProdutos from "./components/Admin/gerir-produtos";
/*
Componente: App
Descrição: Componente que renderiza a página principal
*/
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
            <Route path="/gerir-produtos" element={<GerirProdutos />} />
        </Routes>
    );
}

export default App;
