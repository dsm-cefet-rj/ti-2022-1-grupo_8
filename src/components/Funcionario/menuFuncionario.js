import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchPedidosConcluidos,
    fetchPedidosEmAndamento,
    fetchPedidosFeitos,
    selectPedidosConcluidos,
    selectPedidosEmAndamento,
    selectPedidosFeitos,
} from "../../features/pedidos-funcionarioSlice";
import { PedidoCard } from "../geral/pedido-card";
import FuncionarioNav from "./funcionarioNav";
import style from "./menuFuncionario.module.scss";

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
        <div className={style.body}>
            <FuncionarioNav Atual="menu" />
            <h2 className="text-center">Pedidos</h2>
            <div className="container">
                <div className="row" style={{ padding: "20px" }}>
                    <div className="col-md-4">
                        <Header titulo="Pendentes" cor="danger"></Header>
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
                            <div className="card">
                                <div className="card-body">
                                    <p className="text-center">
                                        Nenhum pedido concluído!
                                    </p>
                                </div>
                            </div>
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
                                    key={pedido.id}
                                    context={"menu-funcionario"}
                                />
                            ))
                        ) : (
                            <div className="card">
                                <div className="card-body">
                                    <p className="text-center">
                                        Nenhum pedido em andamento!
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="col-md-4">
                        <Header titulo="Prontos" cor="success"></Header>
                        {pedidosConcluidos.length > 0 ? (
                            // mostra 4 ultimos pedidos concluidos
                            pedidosConcluidos
                                .slice(
                                    pedidosConcluidos.length - 4,
                                    pedidosConcluidos.length
                                )
                                .map((pedido) => (
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
                            <div className="card">
                                <div className="card-body">
                                    <p className="text-center">
                                        Nenhum pedido concluído!
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuFuncionario;
