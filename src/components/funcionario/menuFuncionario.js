import { useSelector, useDispatch } from "react-redux";
import { React, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import FuncionarioNav from "./funcionarioNav";

import {
    fetchPedidosFeitos,
    fetchPedidosEmAndamento,
    fetchPedidosConcluidos,
    selectPedidosConcluidos,
    selectPedidosEmAndamento,
    selectPedidosFeitos,
} from "../../features/pedidos-funcionarioSlice";

const converterData = (data) => {
    if (!data) return "Sem Data";
    // Converte de unix timestamp para data
    let dataFormatada = new Date(data);
    let dia = dataFormatada.getDate();
    let mes = dataFormatada.getMonth() + 1;
    let ano = dataFormatada.getFullYear();
    let hora = dataFormatada.getHours();
    let minuto = dataFormatada.getMinutes();

    hora = hora < 10 ? "0" + hora : hora; // Adiciona zero à esquerda
    minuto = minuto < 10 ? "0" + minuto : minuto; // Adiciona zero à esquerda
    // Formata a data
    return `${dia}/${mes}/${ano} ${hora}:${minuto}`;
};

const PedidoCard = (props) => {
    const idPedido = props.id;
    const email = props.email;
    const data = props.data;
    const endereco = props.endereco;
    const itens = props.itens;
    const status = props.status;

    const avançarPedido = () => {
        let funções = {
            Feitos: () => {},
            "Em andamento": () => {},
            Concluídos: () => {},
        };
        funções[status]();
    };

    return (
        <>
            <div className="card" style={{ width: "18rem" }}>
                <div className="card-header text-center">
                    <h5 className="card-title">Pedido #{idPedido}</h5>
                    <p style={{ marginBottom: 0 }}>{converterData(data)}</p>
                </div>
                <div className="card-body">
                    <p className="card-text">
                        <strong>E-mail:</strong> {email}
                    </p>
                    <p className="card-text">
                        <strong>Endereço:</strong> {endereco}
                    </p>
                </div>
                <ul className="list-group list-group-flush">
                    <div className="card-body">
                        <ul className="list-group list-group-flush">
                            {itens.map((item, index) => (
                                <li key={index} className="list-group-item">
                                    <strong key={index}>
                                        {item.quantidade}x{" "}
                                    </strong>
                                    {item.nome}
                                </li>
                            ))}
                        </ul>
                    </div>
                </ul>
                {"Concluído" === status ? (
                    <div className="card-footer">{"Concluído"}</div>
                ) : (
                    <div className="card-footer">
                        <button className="btn btn-primary float-end">
                            {"Avançar >"}
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

const Header = (props) => {
    let corClasse = "text-" + props.cor + " border-" + props.cor;
    return (
        <div className={"card text-center " + corClasse}>
            <div className="card-body">
                <h4 className="card-title">{props.titulo}</h4>
                <p className="card-text">{props.descricao}</p>
            </div>
        </div>
    );
};

/* 
Componente: MenuFuncionario
Descrição: Componente que renderiza a página principal do Funcionário
*/
const MenuFuncionario = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPedidosFeitos());
        dispatch(fetchPedidosEmAndamento());
        dispatch(fetchPedidosConcluidos());
    }, [dispatch]);

    const pedidosFeitos = useSelector(selectPedidosFeitos);
    const pedidosEmAndamento = useSelector(selectPedidosEmAndamento);
    const pedidosConcluidos = useSelector(selectPedidosConcluidos);

    const pedidosFeitosRef = useRef(pedidosFeitos);
    const pedidosEmAndamentoRef = useRef(pedidosEmAndamento);
    const pedidosConcluidosRef = useRef(pedidosConcluidos);

    useEffect(() => {
        pedidosFeitosRef.current = pedidosFeitos;
        pedidosEmAndamentoRef.current = pedidosEmAndamento;
        pedidosConcluidosRef.current = pedidosConcluidos;
    }, [pedidosFeitos, pedidosEmAndamento, pedidosConcluidos]);

    return (
        <>
            <FuncionarioNav Atual="menu" />
            <h2 className="text-center">Pedidos</h2>
            <div className="container">
                <div className="row" style={{ padding: "20px" }}>
                    <div className="col-md-4">
                        <Header titulo="Feitos" cor="danger"></Header>
                        {pedidosFeitos.length > 0 ? (
                            pedidosFeitos.map((pedido) => (
                                <PedidoCard
                                    id={pedido.id}
                                    email={pedido.email}
                                    data={pedido.dataHora}
                                    endereco={pedido.endereco}
                                    itens={pedido.carrinho}
                                    status={pedido.status}
                                />
                            ))
                        ) : (
                            <p className="text-center">
                                Nenhum pedido pendente!
                            </p>
                        )}
                    </div>

                    <div className="col-md-4">
                        <Header titulo="Em andamento" cor="warning"></Header>
                        {pedidosEmAndamento.length > 0 ? (
                            pedidosEmAndamento.map((pedido) => (
                                <PedidoCard
                                    id={pedido.id}
                                    email={pedido.email}
                                    data={pedido.dataHora}
                                    endereco={pedido.endereco}
                                    itens={pedido.carrinho}
                                    status={pedido.status}
                                />
                            ))
                        ) : (
                            <p className="text-center">
                                Nenhum pedido em andamento!
                            </p>
                        )}
                    </div>

                    <div className="col-md-4">
                        <Header titulo="Concluídos" cor="success"></Header>
                        {pedidosConcluidos.length > 0 ? (
                            pedidosConcluidos.map((pedido) => (
                                <PedidoCard
                                    id={pedido.id}
                                    email={pedido.email}
                                    data={pedido.dataHora}
                                    endereco={pedido.endereco}
                                    itens={pedido.carrinho}
                                    status={pedido.status}
                                />
                            ))
                        ) : (
                            <p className="text-center">
                                Nenhum pedido em concluídos!
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MenuFuncionario;
