import MenuNav from "./menu-nav";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCarrinho, selectCarrinho } from "../../features/carrinhoSlice";
import { useState } from "react";

const Carrinho = () => {
    // get form redux
    const itens = selectCarrinho(useSelector(state => state));

    const dispatch = useDispatch();

    const [itensCarrinho, setItensCarrinho] = useState(itens);

    const [total, setTotal] = useState(0);

    const mudarQuantidade = (id, quantidade) => {
        const novoItens = itensCarrinho.map(item => {
            if (item.id === id) {
                item.quantidade = quantidade;
            }
            return item;
        }
        );
        setItensCarrinho(novoItens);
        setTotal(0);
        novoItens.map(item => {
            setTotal(total + (item.preco * item.quantidade));
        }
        );
        dispatch(setCarrinho(novoItens));
        setItensCarrinho(novoItens);
    };

    const remover = (produto) => {
        setItensCarrinho(itensCarrinho.filter(item => item.id !== produto.id));
        setTotal(total - produto.preco);
        dispatch(setCarrinho(itensCarrinho));
    };

    const limpar = () => {
        setItensCarrinho([]);
        setTotal(0);
        dispatch(setCarrinho([]));
    };

    return (
        <>
            <MenuNav Atual="carrinho" />
            <div className="container mt-5 mb-2 p-5">
                <div className="row">
                    <h1 className="text-center">Carrinho</h1>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Produto</th>
                                    <th>Preço</th>
                                    <th>Quantidade</th>
                                    <th>Subtotal</th>
                                    <th>Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {itensCarrinho.map(item => (
                                    <tr key={item.Produto}>
                                        <td>{item.Produto}</td>
                                        <td>{item.Preço}</td>
                                        <td>{item.Quantidade}</td>
                                        <td>
                                            <button className="btn btn-success" onClick={() => mudarQuantidade(item.id, item.quantidade + 1)}>+</button>
                                            {item.Preço * item.Quantidade}
                                            <button className="btn btn-danger" onClick={() => mudarQuantidade(item.id, item.quantidade - 1)}>-</button>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger"
                                                onClick={() => remover(item)}>Remover</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-12">
                        <h3>Total:
                            {
                                itensCarrinho.reduce((total, item) => {
                                    return total + (item.Preço * item.Quantidade);
                                }, 0)
                            }
                        </h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm mb-4" style={{ 'textAlign': 'center', }}>
                        <button href="#" className="btn btn-success  btn-lg">Finalizar Compra</button>
                    </div>
                    <div className="col-sm mb-4" style={{ 'textAlign': 'center', }}>
                        <button href="#" className="btn btn-danger  btn-lg" onClick={limpar}>Limpar Carrinho</button>
                    </div>
                    <div className="col-sm mb-4" style={{ 'textAlign': 'center', }}>
                        <a href="Cliente Menu.html" className="btn btn-warning  btn-lg">Voltar</a>
                    </div>
                </div>
            </div>

        </>

    )
}

export default Carrinho;