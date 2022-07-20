import { useEffect, useState } from "react";
import { useDispatch, useSelector, store } from "react-redux";
import { Link } from "react-router-dom";
import {
    fazerPedido,
    getFromLocalStorage,
    setCarrinho,
    setEndereco,
} from "../../features/carrinhoSlice";
import styles from "./carrinho.module.scss";
import MenuNav from "./menu-nav";
/* 
Componente: Carrinho
Descrição: Componente que renderiza a página de carrinho
*/
const Carrinho = () => {
    const itens = getFromLocalStorage();

    const dispatch = useDispatch();

    const [itensCarrinho, setItensCarrinho] = useState(itens);

    const [total, setTotal] = useState(
        // Recupera o total do carrinho
        itensCarrinho.reduce((total, item) => {
            return total + item.preco * item.quantidade;
        }, 0)
    );

    const endereco = useSelector((state) => state.endereco);

    // função que recalcula o total do carrinho
    const recalcularTotal = (novoCarrinho) => {
        setTotal(0);
        let total = novoCarrinho.reduce((total, item) => {
            return total + item.preco * item.quantidade;
        }, 0);
        setTotal(total);
    };

    // Manuseio da quantidade de um item
    const mudarQuantidade = (id, quantidade) => {
        let novoCarrinho = JSON.parse(JSON.stringify(itensCarrinho));
        novoCarrinho = novoCarrinho.map((item) => {
            if (item.id === id) {
                if (quantidade > 0) item.quantidade = quantidade;
            }
            return item;
        });
        setItensCarrinho(novoCarrinho);
        setCarrinho(novoCarrinho);
        dispatch(setCarrinho(novoCarrinho));
        recalcularTotal(novoCarrinho);
    };

    // manuseio da remoção de um item
    const remover = (produto) => {
        let novoCarrinho = itensCarrinho.filter((item) => {
            return item.id !== produto.id;
        });

        setItensCarrinho(novoCarrinho);
        setCarrinho(novoCarrinho);

        if (novoCarrinho.length === 0) {
            dispatch(setCarrinho([]));
            setTotal(0);
        } else {
            dispatch(setCarrinho(novoCarrinho));
            recalcularTotal(novoCarrinho);
        }
    };

    // Limpa o carrinho
    const limpar = () => {
        setItensCarrinho([]);
        setTotal(0);
        dispatch(setCarrinho([]));
    };

    // Faz o pedido
    const finalizarPedido = () => {
        if (itensCarrinho.length > 0 && endereco !== "") {
            dispatch(fazerPedido());
        } else {
            console.log("Carrinho vazio");
        }
    };

    // Renderização do componente
    return (
        <>
            <MenuNav Atual="carrinho" />
            <div className="container mt-5 mb-2 p-5">
                <div className="row">
                    <h1 className="text-center">Carrinho 🛒</h1>
                </div>

                {itensCarrinho.length === 0 ? (
                    <div className="row section">
                        <div
                            className="col-12 text-center"
                            style={{ marginBottom: "30px" }}
                        >
                            <h2>Seu carrinho está vazio!</h2>
                            <p>
                                Por que não dá uma olhadinha nos nossos
                                produtos? 👀😋
                            </p>
                            <Link to="/menu">
                                <button className="btn btn-primary">
                                    Voltar para o menu
                                </button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="row">
                            <div className="col-md-12">
                                <table className="table table-striped table-dark">
                                    <thead>
                                        <tr>
                                            <th>Produto</th>
                                            <th
                                                style={{
                                                    textAlign: "center",
                                                }}
                                            >
                                                Preço
                                            </th>
                                            <th
                                                style={{
                                                    textAlign: "center",
                                                }}
                                            >
                                                Quantidade
                                            </th>
                                            <th
                                                style={{
                                                    textAlign: "center",
                                                }}
                                            >
                                                Subtotal
                                            </th>
                                            <th>Ação</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-hover">
                                        {itensCarrinho.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.nome}</td>
                                                <td
                                                    style={{
                                                        textAlign: "center",
                                                        width: "25%",
                                                    }}
                                                >
                                                    R$ {item.preco.toFixed(2)}
                                                </td>
                                                <td
                                                    style={{
                                                        textAlign: "center",
                                                        width: "25%",
                                                    }}
                                                >
                                                    <div className="qtd-selection">
                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() =>
                                                                mudarQuantidade(
                                                                    item.id,
                                                                    item.quantidade -
                                                                        1
                                                                )
                                                            }
                                                            disabled={
                                                                item.quantidade ===
                                                                1
                                                            }
                                                        >
                                                            -
                                                        </button>
                                                        {item.quantidade}
                                                        <button
                                                            className="btn btn-success btn-sm"
                                                            onClick={() =>
                                                                mudarQuantidade(
                                                                    item.id,
                                                                    item.quantidade +
                                                                        1
                                                                )
                                                            }
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </td>
                                                <td
                                                    style={{
                                                        textAlign: "center",
                                                        width: "25%",
                                                    }}
                                                >
                                                    R${" "}
                                                    {(
                                                        item.preco *
                                                        item.quantidade
                                                    ).toFixed(2)}
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() =>
                                                            remover(item)
                                                        }
                                                    >
                                                        Remover
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="row">
                            <div
                                className="col-md-12"
                                style={{
                                    textAlign: "right",
                                    marginBottom: "20px",
                                }}
                            >
                                <h3>
                                    Total: R${" "}
                                    <span className="total-carrinho">
                                        {total.toFixed(2)}
                                    </span>
                                </h3>
                            </div>
                        </div>

                        <div
                            className="row section"
                            style={{
                                marginBottom: "20px",
                                flexDirection: "row",
                            }}
                        >
                            <div className="col-md-12">
                                <strong>Endereço de entrega</strong>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Endereço"
                                    value={endereco}
                                    onChange={(e) =>
                                        dispatch(setEndereco(e.target.value))
                                    }
                                />
                            </div>
                        </div>

                        <div
                            className="row section"
                            style={{
                                marginBottom: "20px",
                                flexDirection: "row",
                            }}
                        >
                            <Link to="/menu" className="btn btn-warning">
                                Voltar
                            </Link>
                            <button
                                className="btn btn-danger mt-2"
                                onClick={limpar}
                                disabled={itens.length === 0}
                            >
                                Limpar Carrinho
                            </button>
                            <button
                                className="btn btn-success mt-2"
                                onClick={finalizarPedido}
                                disabled={itens.length === 0 || endereco === ""}
                            >
                                Finalizar Compra
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default () => {
    return (
        <div className={styles.body}>
            <Carrinho />
        </div>
    );
};
