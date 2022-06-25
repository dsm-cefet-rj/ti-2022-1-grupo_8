import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GerirIngredientes from "./components/Admin/gerir-ingredientes";
import GerirPizzas from "./components/Admin/gerir-pizzas";
import GerirProdutos from "./components/Admin/gerir-produtos";
import GerirUsuarios from "./components/Admin/gerir-usuarios";
import MenuAdmin from "./components/Admin/menu-admin";
import Carrinho from "./components/Cliente/carrinho";
import CriarPizza from "./components/Cliente/criar-pizza";
import CriarUsuario from "./components/Cliente/criar-usuario";
import MenuCliente from "./components/Cliente/menu.js";
import MeusPedidos from "./components/Cliente/meus-pedidos";
import MenuFuncionario from "./components/funcionario/menuFuncionario";
import NotFound from "./components/geral/not-found";
import {
    getSessionFromLocalStorage,
    selectToken,
    setToken,
} from "./features/sessionSlice";
import LoginForm from "./login";

/*
Componente: App
Descrição: Componente que renderiza a página principal
*/
function App() {
    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const [userType, setUserType] = useState("");
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        dispatch(setToken(getSessionFromLocalStorage()));
        // get user type from token
        if (token) {
            const tokenData = JSON.parse(atob(token.split(".")[1]));
            setUserType(tokenData.type);
            setLoaded(false);
        }
        if (!loaded) {
            switch (
                userType // redirect based on user type
            ) {
                case "user":
                    window.location.href = "/menu";
                    break;
                case "admin":
                    window.location.href = "/menu-admin";
                    break;
                case "funcionario":
                    window.location.href = "/menu-funcionario";
                    break;
                default:
                    break; // No redirect
            }
            setLoaded(true);
        }
    }, [dispatch, token, userType]);

    return (
        <>
            <Router>
                <Routes>
                    {/* <----------------------->404<-----------------------> */}
                    <Route path="*" element={<NotFound />} />
                    {/* <----------------------->Login<-----------------------> */}
                    <Route path="/" element={<LoginForm />} />
                    {/* <----------------------->Criar Conta<-----------------------> */}
                    <Route path="/criar-usuario" element={<CriarUsuario />} />

                    {/* <----------------------->Usuário<-----------------------> */}
                    {userType === "user" && (
                        <>
                            <Route path="/carrinho" element={<Carrinho />} />
                            <Route
                                path="/criar-pizza"
                                element={<CriarPizza />}
                            />
                            <Route path="/menu" element={<MenuCliente />} />
                            <Route
                                path="/meus-pedidos"
                                element={<MeusPedidos />}
                            />
                        </>
                    )}

                    {/* <----------------------->ADMIN<-----------------------> */}
                    {userType === "admin" && (
                        <>
                            <Route path="/menu-admin" element={<MenuAdmin />} />
                            <Route
                                path="/gerir-pizzas"
                                element={<GerirPizzas />}
                            />
                            <Route
                                path="/gerir-ingredientes"
                                element={<GerirIngredientes />}
                            />
                            <Route
                                path="/gerir-produtos"
                                element={<GerirProdutos />}
                            />
                            <Route
                                path="/gerir-usuarios"
                                element={<GerirUsuarios />}
                            />
                        </>
                    )}
                    {/* <----------------------->Funcionário<-----------------------> */}
                    {userType === "funcionario" && (
                        <>
                            <Route
                                path="/menu-funcionario"
                                element={<MenuFuncionario />}
                            />
                        </>
                    )}
                </Routes>
            </Router>
        </>
    );
}

export default App;
