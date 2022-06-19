import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GerirIngredientes from "./components/Admin/gerir-ingredientes";
import GerirPizzas from "./components/Admin/gerir-pizzas";
import GerirProdutos from "./components/Admin/gerir-produtos";
import MenuAdmin from "./components/Admin/menu-admin";
import Carrinho from "./components/Cliente/carrinho";
import CriarPizza from "./components/Cliente/criar-pizza";
import CriarUsuario from "./components/Cliente/criar-usuario";
import MenuCliente from "./components/Cliente/menu.js";
import MenuFuncionario from "./components/funcionario/menuFuncionario";
import NotFound from "./components/geral/not-found";
import { fetchSession, selectSession } from "./features/sessionSlice";
import LoginForm from "./login";

/*
Componente: App
Descrição: Componente que renderiza a página principal
*/
function App() {
    const dispatch = useDispatch();
    const session = useSelector(selectSession);
    useEffect(() => {
        dispatch(fetchSession());
        console.log(session);
    }
        , [dispatch, session]);

    return (
        <>

            <Router>
                <Routes>
                    {/* <----------------------->404<-----------------------> */}
                    <Route path="*" element={<NotFound />} />
                    {/* <----------------------->Login<-----------------------> */}
                    <Route path="/" element={<LoginForm />} />
                    {/* <----------------------->Criar Conta<-----------------------> */}
                    <Route
                        path="/criar-usuario"
                        element={<CriarUsuario />}
                    />
                    {/* <----------------------->Usuário<-----------------------> */}
                    <Route path="/carrinho" element={<Carrinho />} />
                    <Route path="/criar-pizza" element={<CriarPizza />} />
                    <Route path="/menu" element={<MenuCliente />} />
                    {/* <----------------------->ADMIN<-----------------------> */}
                    <Route path="/menu-admin" element={<MenuAdmin />} />
                    <Route path="/gerir-pizzas" element={<GerirPizzas />} />
                    <Route
                        path="/gerir-ingredientes"
                        element={<GerirIngredientes />}
                    />
                    <Route
                        path="/gerir-produtos"
                        element={<GerirProdutos />}
                    />
                    {/* <----------------------->Funcionário<-----------------------> */}
                    <Route
                        path="/menu-funcionario"
                        element={<MenuFuncionario />}
                    />
                </Routes>
            </Router>
        </>
    );
}

export default App;
