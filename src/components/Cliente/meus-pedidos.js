import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MenuNav from "./menu-nav";
import styles from "./meus-pedidos.module.scss";
import { fetchPedidos, selectPedidos } from "../../features/pedidos-clienteSlice";

const Pedido = (props) => {
    const data = props.data; // Data do pedido
    const itens = props.itens; // Itens do pedido
    const status = props.status; // Se o pedido foi entregue

    return (
        <>
            <div className="row section">
                <h2 className="titulo">Feito em:{data}</h2>
                <h2 className="titulo">Itens:</h2>
                {itens.map((item) => (
                    <></>
                ))}
                <h2 className="titulo">Status: {status}</h2>
            </div>
        </>
    );
};


/* 
Componente: MeusPedidos
Descrição: Componente que renderiza a página de pedidos do cliente
*/
const MeusPedidos = () => {
    const dispatch = useDispatch();
    const pedidos = useSelector(selectPedidos);
    useEffect(() => {
        dispatch(fetchPedidos());
    }, [pedidos]);
    return (
        <>
            <MenuNav Atual="meus-pedidos" />
            <div className="container mt-2 mb-2 p-0">
                <div className="row">
                    <h1 className="text-center">Meus Pedidos</h1>
                </div>
                <div className="row">
                    {pedidos.length > 0 ?
                        pedidos.map((pedido) => (
                            <Pedido
                                data={pedido.data}
                                itens={pedido.itens}
                                status={pedido.status}
                            />
                        ))
                        : (<h2 className="text-center">Nenhum pedido</h2>)
                    }
                </div>
            </div>
        </>
    );
};

export default MeusPedidos;