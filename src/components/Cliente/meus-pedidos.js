import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuNav from "./menu-nav";
import styles from "./meus-pedidos.module.scss";
import {
    fetchPedidos,
    selectPedidos,
} from "../../features/pedidos-clienteSlice";

const Pedido = (props) => {
    const idPedido = props.id;
    const data = props.data; // Data do pedido
    const itens = props.itens; // Itens do pedido
    const status = props.status; // Se o pedido foi entregue

    return (
        <>
            <div className="card" style={{ width: "18rem" }}>
                <div className="card-header">
                    <h5 className="card-title text-center">
                        Pedido #{idPedido}
                    </h5>
                </div>
                <div className="card-body">
                    <p className="card-text">
                        <strong>Data:</strong> {data}
                    </p>
                    <p className="card-text">
                        <strong>Status:</strong> {status}
                    </p>
                    <p>
                        <strong>Itens:</strong>
                    </p>
                    <ul className="list-group list-group-flush">
                        {itens.map((item, index) => (
                            <li key={index} className="list-group-item">
                                <strong>{item.quantidade}x </strong>
                                {item.nome}
                            </li>
                        ))}
                    </ul>
                </div>
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

    // Carrega os pedidos do cliente ao carregar o componente
    useEffect(() => {
        dispatch(fetchPedidos());
    }, [dispatch]);

    const pedidos = useSelector(selectPedidos);

    return (
        <>
            <MenuNav Atual="meus-pedidos" />
            <div className="container mt-2 mb-2 p-0">
                <div className="row">
                    <h1 className="text-center">Meus Pedidos</h1>
                </div>
                <div className="row">
                    {pedidos.length > 0 ? (
                        pedidos.map((pedido, index) => (
                            <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                                <Pedido
                                    key={index}
                                    id={pedido.id}
                                    data={pedido.data}
                                    itens={pedido.carrinho}
                                    status={pedido.status}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-white">
                            <h2>Poxa, nenhum pedido! 😱</h2>
                            <h5>
                                Por que não <a href="/menu">fazer um agora</a>?
                                😋
                            </h5>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default MeusPedidos;
