import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuNav from "./menu-nav";
import styles from "./meus-pedidos.module.scss";
import {
    fetchPedidos,
    selectPedidos,
} from "../../features/pedidos-clienteSlice";

const getCorStatus = (status) => {
    switch (status) {
        case "Feito":
            return "danger";
        case "Em andamento":
            return "warning";
        case "Cancelado":
            return "danger";
        case "Concluído":
            return "success";
        default:
            return "secondary";
    }
};

const getNomeStatus = (status) => {
    switch (status) {
        case "Feito":
            return "Pendente";
        case "Em andamento":
            return "Preparando";
        case "Concluído":
            return "Pronto";
        default:
            return status;
    }
};

const converterData = (data) => {
    const dataConvertida = new Date(data);
    return dataConvertida.toLocaleString().slice(0, -3);
};

const Pedido = (props) => {
    const idPedido = props.id; // ID do pedido
    const data = props.data; // Data do pedido
    const itens = props.itens; // Itens do pedido
    const status = props.status; // Se o pedido foi entregue

    return (
        <>
            <div className="card" style={{ width: "18rem" }}>
                <div className="card-header text-center">
                    <h5 className="card-title">Pedido #{idPedido}</h5>
                    <p style={{ marginBottom: 0 }}>{converterData(data)}</p>
                </div>
                <div className="card-body">
                    <ul className="list-group list-group-flush">
                        {itens.map((item, index) => (
                            <li key={index} className="list-group-item">
                                <strong>{item.quantidade}x </strong>
                                {item.nome}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="card-footer">
                    <p
                        className={
                            "card-text text-center text-" + getCorStatus(status)
                        }
                    >
                        <strong>Status:</strong> {status}
                    </p>
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
                                    data={pedido.dataHora}
                                    itens={pedido.carrinho}
                                    status={getNomeStatus(pedido.status)}
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
