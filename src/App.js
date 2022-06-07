import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import GerirIngredientes from "./components/Admin/gerir-ingredientes";
import GerirPizzas from "./components/Admin/gerir-pizzas";
import GerirProdutos from "./components/Admin/gerir-produtos";
import MenuAdmin from "./components/Admin/menu-admin";
import Carrinho from "./components/Cliente/carrinho";
import CriarPizza from "./components/Cliente/criar-pizza";
import CriarUsuario from "./components/Cliente/criar-usuario";
import MenuCliente from "./components/Cliente/menu.js";
import store from "./features/store";
import Login from "./login";
/*
Componente: App
Descrição: Componente que renderiza a página principal
*/
function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/criar-usuario" element={<CriarUsuario />} />
                    <Route path="/carrinho" element={<Carrinho />} />
                    <Route path="/criar-pizza" element={<CriarPizza />} />
                    <Route path="/menu" element={<MenuCliente />} />

                    <Route path="/menu-admin" element={<MenuAdmin />} />
                    <Route path="/gerir-pizzas" element={<GerirPizzas />} />
                    <Route
                        path="/gerir-ingredientes"
                        element={<GerirIngredientes />}
                    />
                    <Route path="/gerir-produtos" element={<GerirProdutos />} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
