import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux';
import MenuCliente from './components/Client/menu';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
            <Router>
                <Routes>
                    <Route  path="/" component={App} />
                    <Route  path="/carrinho" component={App} />
                    <Route  path="/criar-pizza" component={App} />
                    <Route  path="/menu" component={MenuCliente} />
                </Routes>
            </Router>
    </React.StrictMode>
);