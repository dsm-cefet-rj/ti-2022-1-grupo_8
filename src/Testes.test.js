/*
jest-dom adds custom jest matchers for asserting on DOM nodes.
allows you to do things like:
expect(element).toHaveTextContent(/react/i)
learn more: https://github.com/testing-library/jest-dom

Tentar escrever uns tests ai
Exemplos:
https://github.com/testing-library/react-testing-library#basic-example
*/

import "@testing-library/jest-dom";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { render, fireEvent, screen } from "@testing-library/react";

//Redux
import { Provider } from "react-redux";
import store from "./features/store";

//Componentes
import GerirIngredientes from "./components/Admin/gerir-ingredientes";
import GerirPizzas from "./components/Admin/gerir-pizzas";
import GerirProdutos from "./components/Admin/gerir-produtos";
import MenuAdmin from "./components/Admin/menu-admin";
import Carrinho from "./components/Cliente/carrinho";
import CriarPizza from "./components/Cliente/criar-pizza";
import CriarUsuario from "./components/Cliente/criar-usuario";
import MenuCliente from "./components/Cliente/menu.js";
import Login from "./login";
import App from "./App";

const renderWithRouter = ( ui, { route = '/', history = createMemoryHistory({ initialEntries: [route] }),} = {}) =>{
    return {
      ...render(<Router history={history}>{ui}</Router>),
      // adding `history` to the returned utilities to allow us
      // to reference it in our tests (just try to avoid using
      // this to test implementation details).
      history,
    }
  }


// Testes básicos de Renderização
/*
  ✕ renderiza a pagina '/' sem erros (63 ms)
  ✕ renderiza a pagina '/criar-usuario' sem erros (19 ms)
  ✕ renderiza a pagina '/carrinho' sem erros (14 ms)
  ✕ renderiza a pagina '/criar-pizza' sem erros (54 ms)
  ✕ renderiza a pagina '/menu' sem erros (50 ms)
*/

it("renderiza a pagina '/' sem erros", () => {
    const { getByText } = render(
        <App/>
    );
    expect(getByText(/login/i)).toBeInTheDocument();
});

it("renderiza a pagina '/criar-usuario' sem erros", () => {
    render( <App/> );
    fireEvent.click(screen.getByText(/Criar conta/i));
    expect(screen.getByText('Cadastro ✍')).toBeInTheDocument();
});

it("renderiza a pagina '/carrinho' sem erros", () => {
    // TODO
    expect(true);
});

it("renderiza a pagina '/criar-pizza' sem erros", () => {
    // TODO
    expect(true);
});

it("renderiza a pagina '/menu' sem erros", () => {
    // TODO
    expect(true);
});

it("renderiza a pagina '/menu-admin' sem erros", () => {
    render(<Provider store={store}> <MenuAdmin /> </Provider>);
    expect(true);
});

it("renderiza a pagina '/gerir-pizzas' sem erros", () => {
    render(<Provider store={store}> <GerirPizzas /> </Provider>);
    expect(screen.getByText('Gerenciar Pizzas 🍕')).toBeInTheDocument();
});

it("renderiza a pagina '/gerir-ingredientes' sem erros", () => {
    render(<Provider store={store}> <GerirIngredientes /> </Provider>);
    expect(screen.getByText('Ingredientes Cadastrados')).toBeInTheDocument();
});

it("renderiza a pagina '/gerir-produtos' sem erros", () => {
    render(<Provider store={store}> <GerirProdutos /> </Provider>);
    expect(screen.getByText('Gerenciar Produtos 🍾')).toBeInTheDocument();
});

// Teste de 