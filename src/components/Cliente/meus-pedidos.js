import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuNav from "./menu-nav";
import styles from "./meus-pedidos.module.scss";
import {
    fetchPedidos,
    selectPedidos,
} from "../../features/pedidos-clienteSlice";

import { converterData } from "../geral/util";

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

const Pedido = (props) => {
    const idPedido = props.id; // ID do pedido
    const data = props.data; // Data do pedido
    const itens = props.itens; // Itens do pedido
    const status = props.status; // Se o pedido foi entregue

    return (
        <>
            <div className="card" style={{ width: "18rem" }}>
                <div className="card-header text-center">
                    <h5 className="card-title" style={{ fontSize: "1.15rem" }}>
                        Pedido #{idPedido}
                    </h5>
                    <p style={{ marginBottom: 0 }}>{converterData(data)}</p>
                </div>
                <div
                    className="card-body"
                    style={{
                        fontFamily: "BenchNine",
                        fontSize: "1.25rem",
                        lineHeight: "1.1",
                        padding: "0.75rem 0.5rem",
                    }}
                >
                    <ul className="list-group list-group-flush">
                        {itens.map((item, index) => (
                            <li key={index} className="list-group-item">
                                <div style={{ float: "left" }}>
                                    <strong>{item.quantidade}x </strong>
                                    {item.nome}
                                </div>
                                <div style={{ float: "right" }}>
                                    <strong>
                                        R${" "}
                                        {(item.preco * item.quantidade).toFixed(
                                            2
                                        )}
                                    </strong>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="card-footer">
                    <p
                        style={{
                            display: "inline-block",
                            float: "right",
                            marginBottom: 5,
                        }}
                    >
                        Total:{" "}
                        <strong>
                            R$
                            {itens
                                .reduce((acc, item) => {
                                    return acc + item.preco * item.quantidade;
                                }, 0)
                                .toFixed(2)}
                        </strong>
                    </p>

                    <div
                        className={
                            "badge rounded-pill bg-" + getCorStatus(status)
                        }
                    >
                        {getNomeStatus(status)}
                    </div>
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
        <div className={styles.body}>
            <MenuNav Atual="meus-pedidos" />
            <div className="container mt-2 mb-2 p-0">
                <div className="row">
                    <h1 className="text-center">Meus Pedidos</h1>
                </div>
                <div className="row">
                    {pedidos.length > 0 ? (
                        /* Reverse pedidos array */
                        pedidos.map((pedido, index) => (
                            <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                                <Pedido
                                    key={
                                        pedido.id +
                                        pedido.data +
                                        pedido.status +
                                        pedido.dataHora +
                                        index
                                    }
                                    id={pedido.id}
                                    data={pedido.dataHora}
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
        </div>
    );
};

export default MeusPedidos;
