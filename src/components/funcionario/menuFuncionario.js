import { useSelector, useDispatch } from "react-redux";
import { React, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import FuncionarioNav from "./funcionarioNav";

import {
    fetchPedidosFeitos,
    selectPedidosConcluidos,
    selectPedidosEmAndamento,
    selectPedidosFeitos,
} from "../../features/pedidos-funcionarioSlice";

const PedidoCard = (props) => {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{props.email}</h5>
                <p className="card-text">{props.dataHora}</p>
                <p className="card-text">{props.endereco}</p>
                <p className="card-text">{props.status}</p>
            </div>
        </div>
    );
};

/* 
Componente: MenuFuncionario
Descrição: Componente que renderiza a página principal do Funcionário
*/
const MenuFuncionario = () => {
    //const dispatch = useDispatch();
    //const pedidosFeitos = useSelector(selectPedidosFeitos);
    //const pedidosEmAndamento = useSelector(selectPedidosEmAndamento);
    //const pedidosConcluidos = useSelector(selectPedidosConcluidos);
    //dispatch(fetchPedidosFeitos());
    let pedidosFeitos = [
        {
            email: "bernardocosta@gmail.com",
            dataHora: "2022-01-01",
            endereco: "Av. Maracanã, 123",
            status: "Feito",
        },
    ];
    return (
        <>
            <FuncionarioNav Atual="menu" />
            <h2>Pedidos</h2>
            <div className="container">
                <div className="row bg-white">
                    <div className="col-md-4">
                        <h5>Pedidos Feitos</h5>
                        <p>Visualize todos os pedidos feitos</p>

                        <div>
                            {pedidosFeitos.length > 0 ? (
                                pedidosFeitos.map((pedido) => (
                                    <PedidoCard
                                        email={pedido.email}
                                        dataHora={pedido.dataHora}
                                        endereco={pedido.endereco}
                                        status={pedido.status}
                                    />
                                ))
                            ) : (
                                <p className="text-center">
                                    Nenhum pedido pendente!
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="col-md-4">
                        <Link to="/funcionario/pedidos/em-andamento">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Pedidos em Andamento
                                    </h5>
                                    <p className="card-text">
                                        Visualize todos os pedidos em andamento
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to="/funcionario/pedidos/concluidos">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Pedidos Concluídos
                                    </h5>
                                    <p className="card-text">
                                        Visualize todos os pedidos concluídos
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MenuFuncionario;
