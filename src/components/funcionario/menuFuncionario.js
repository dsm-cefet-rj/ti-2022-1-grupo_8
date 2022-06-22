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
    return "2022-04-05";
};

const PedidoCard = (props) => {
    const idPedido = props.id;
    const email = props.email;
    const data = props.dataHora;
    const endereco = props.endereco;
    const itens = props.itens;
    const status = props.status;

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
                                    <strong>{item.quantidade}x </strong>
                                    {item.nome}
                                </li>
                            ))}
                        </ul>
                    </div>
                </ul>
                <div className="card-footer">
                    <button className="btn btn-primary float-end">
                        Avançar &#62;
                    </button>
                </div>
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

    //const pedidosFeitos = useSelector(selectPedidosFeitos);
    //const pedidosEmAndamento = useSelector(selectPedidosEmAndamento);
    //const pedidosConcluidos = useSelector(selectPedidosConcluidos);

    //const pedidosFeitos = useSelector(
    //    (state) => state.pedidosFuncionario.pedidosFeitos
    //);
    //const pedidosEmAndamento = useSelector(
    //    (state) => state.pedidosFuncionario.pedidosEmAndamento
    //);
    //const pedidosConcluidos = useSelector(
    //    (state) => state.pedidosFuncionario.pedidosConcluidos
    //);
    //
    //const pedidosFeitosRef = useRef(pedidosFeitos);
    //const pedidosEmAndamentoRef = useRef(pedidosEmAndamento);
    //const pedidosConcluidosRef = useRef(pedidosConcluidos);
    //
    //useEffect(() => {
    //    pedidosFeitosRef.current = pedidosFeitos;
    //    pedidosEmAndamentoRef.current = pedidosEmAndamento;
    //    pedidosConcluidosRef.current = pedidosConcluidos;
    //}, [pedidosFeitos, pedidosEmAndamento, pedidosConcluidos]);

    const pedidosFeitos = [
        {
            id: 4,
            email: "bernardocosta@gmail.com",
            dataHora: 1655929109,
            endereco: "Av. Maracanã, 123",
            carrinho: [
                {
                    id: 1,
                    nome: "Pizza Grande de Frango com Requeijão",
                    quantidade: 2,
                },
                {
                    id: 2,
                    nome: "Refrigerante",
                    quantidade: 5,
                },
                {
                    id: 5,
                    nome: "Pudim de leite",
                    quantidade: 2,
                },
            ],
        },
    ];

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
                    </div>

                    <div className="col-md-4">
                        <Header titulo="Concluídos" cor="success"></Header>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MenuFuncionario;
